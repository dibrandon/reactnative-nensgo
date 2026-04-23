import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { router, usePathname } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ensureAppUserProfile,
  getDefaultOnboardingForm,
  hasRequiredAppUserProfile,
  isAuthUserEmailVerified,
  readAppUser,
  type AppUserProfileInput,
  type DefaultOnboardingForm,
} from "@/features/account/data/appUserService";
import type { AppUser } from "@/features/account/models/AppUser";
import type { ProtectedIntent } from "@/features/account/models/ProtectedIntent";
import {
  getSupabaseClient,
  getSupabaseClientError,
} from "@/shared/lib/supabase/supabaseClient";

WebBrowser.maybeCompleteAuthSession();

const PENDING_INTENT_STORAGE_KEY = "nensgo.native.pending_protected_intent";

type AuthAccessState =
  | "loading"
  | "anonymous"
  | "verification_pending"
  | "onboarding_required"
  | "ready"
  | "error";

type AuthSessionContextValue = {
  accessState: AuthAccessState;
  authError: string | null;
  appUser: AppUser | null;
  defaultOnboardingForm: DefaultOnboardingForm;
  isCompletingOnboarding: boolean;
  isLoading: boolean;
  isSigningIn: boolean;
  pendingIntent: ProtectedIntent | null;
  pendingVerificationEmail: string;
  profileError: string | null;
  resolvedIntent: ProtectedIntent | null;
  session: Session | null;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithPassword: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  signUpWithPassword: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ error: Error | null }>;
  resendVerificationEmail: (
    email: string,
  ) => Promise<{ error: Error | null }>;
  refreshAppUser: () => Promise<{ data: AppUser | null; error: Error | null }>;
  completeOnboarding: (
    profileInput: AppUserProfileInput,
  ) => Promise<{ data: AppUser | null; error: Error | null }>;
  startProtectedAction: (
    intent: ProtectedIntent,
  ) => Promise<{ data: ProtectedIntent | null; error: Error | null }>;
  consumeResolvedIntent: () => void;
  user: User | null;
  verificationMessage: string;
};

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

function getDefaultAuthError() {
  return (
    getSupabaseClientError() ||
    "No pudimos conectar la autenticacion con la configuracion actual."
  );
}

function isVerificationError(error: { message?: string | null; code?: string | null }) {
  const errorText = [error.message, error.code]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    errorText.includes("email not confirmed") ||
    errorText.includes("email_not_confirmed")
  );
}

function normalizeProtectedIntent(
  intent?: ProtectedIntent | null,
): ProtectedIntent | null {
  if (!intent?.type) {
    return null;
  }

  if (intent.type === "toggle_favorite") {
    const activityId = String(intent.activityId ?? "").trim();

    if (!activityId) {
      return null;
    }

    return {
      type: "toggle_favorite",
      activityId,
      returnTo:
        typeof intent.returnTo === "string" && intent.returnTo.trim()
          ? intent.returnTo.trim()
          : undefined,
    };
  }

  return {
    type: intent.type,
    returnTo:
      typeof intent.returnTo === "string" && intent.returnTo.trim()
        ? intent.returnTo.trim()
        : undefined,
  };
}

async function readStoredProtectedIntent() {
  try {
    if (Platform.OS === "web") {
      if (typeof window === "undefined") {
        return null;
      }

      const storedIntent = window.localStorage.getItem(PENDING_INTENT_STORAGE_KEY);

      return storedIntent
        ? normalizeProtectedIntent(JSON.parse(storedIntent) as ProtectedIntent)
        : null;
    }

    const storedIntent = await AsyncStorage.getItem(PENDING_INTENT_STORAGE_KEY);

    return storedIntent
      ? normalizeProtectedIntent(JSON.parse(storedIntent) as ProtectedIntent)
      : null;
  } catch {
    return null;
  }
}

async function writeStoredProtectedIntent(intent?: ProtectedIntent | null) {
  const normalizedIntent = normalizeProtectedIntent(intent);

  try {
    if (Platform.OS === "web") {
      if (typeof window === "undefined") {
        return;
      }

      if (!normalizedIntent) {
        window.localStorage.removeItem(PENDING_INTENT_STORAGE_KEY);
        return;
      }

      window.localStorage.setItem(
        PENDING_INTENT_STORAGE_KEY,
        JSON.stringify(normalizedIntent),
      );
      return;
    }

    if (!normalizedIntent) {
      await AsyncStorage.removeItem(PENDING_INTENT_STORAGE_KEY);
      return;
    }

    await AsyncStorage.setItem(
      PENDING_INTENT_STORAGE_KEY,
      JSON.stringify(normalizedIntent),
    );
  } catch {
    return;
  }
}

function getOAuthRedirectUrl() {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.origin}/account`;
  }

  return Linking.createURL("/account");
}

function parseOAuthCallbackUrl(callbackUrl: string) {
  const [baseWithQuery, hashPart = ""] = callbackUrl.split("#");
  const [, queryPart = ""] = baseWithQuery.split("?");

  return {
    query: new URLSearchParams(queryPart),
    hash: new URLSearchParams(hashPart),
  };
}

async function resolveOAuthSessionFromUrl(callbackUrl: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      error: new Error(getDefaultAuthError()),
    };
  }

  const { query, hash } = parseOAuthCallbackUrl(callbackUrl);
  const authCode = query.get("code") || hash.get("code");

  if (authCode) {
    const { error } = await supabase.auth.exchangeCodeForSession(authCode);

    return {
      error: error
        ? new Error(
            error.message ||
              "No pudimos completar la sesion devuelta por Google.",
          )
        : null,
    };
  }

  const accessToken = hash.get("access_token") || query.get("access_token");
  const refreshToken = hash.get("refresh_token") || query.get("refresh_token");

  if (!accessToken || !refreshToken) {
    return {
      error: new Error(
        "Google no devolvio una sesion valida para completar el acceso.",
      ),
    };
  }

  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return {
    error: error
      ? new Error(
          error.message ||
            "No pudimos guardar la sesion devuelta por Google en el dispositivo.",
        )
      : null,
  };
}

function buildAccessState({
  authError,
  appUser,
  isAuthLoading,
  isProfileLoading,
  pendingVerificationEmail,
  profileError,
  session,
  user,
}: {
  authError: string | null;
  appUser: AppUser | null;
  isAuthLoading: boolean;
  isProfileLoading: boolean;
  pendingVerificationEmail: string;
  profileError: string | null;
  session: Session | null;
  user: User | null;
}): AuthAccessState {
  if (isAuthLoading) {
    return "loading";
  }

  if (authError && !session?.user) {
    return "error";
  }

  if (!session?.user) {
    return pendingVerificationEmail ? "verification_pending" : "anonymous";
  }

  if (!isAuthUserEmailVerified(user ?? undefined)) {
    return "verification_pending";
  }

  if (isProfileLoading) {
    return "loading";
  }

  if (profileError) {
    return "error";
  }

  return hasRequiredAppUserProfile(appUser) ? "ready" : "onboarding_required";
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isCompletingOnboarding, setIsCompletingOnboarding] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [pendingIntent, setPendingIntent] = useState<ProtectedIntent | null>(null);
  const [resolvedIntent, setResolvedIntent] = useState<ProtectedIntent | null>(null);

  const defaultOnboardingForm = useMemo(
    () => getDefaultOnboardingForm(user, appUser),
    [appUser, user],
  );

  const persistPendingIntent = useCallback((nextIntent?: ProtectedIntent | null) => {
    const normalizedIntent = normalizeProtectedIntent(nextIntent);

    setPendingIntent(normalizedIntent);
    void writeStoredProtectedIntent(normalizedIntent);

    return normalizedIntent;
  }, []);

  const clearPendingIntent = useCallback(() => {
    setPendingIntent(null);
    void writeStoredProtectedIntent(null);
  }, []);

  const executeProtectedIntent = useCallback(
    (nextIntent?: ProtectedIntent | null) => {
      const normalizedIntent = normalizeProtectedIntent(nextIntent);

      if (!normalizedIntent) {
        clearPendingIntent();
        setResolvedIntent(null);
        return;
      }

      clearPendingIntent();

      if (normalizedIntent.type === "toggle_favorite") {
        setResolvedIntent(normalizedIntent);

        const targetRoute = normalizedIntent.returnTo || "/explore";

        if (pathname !== targetRoute) {
          router.navigate(targetRoute as never);
        }

        return;
      }

      setResolvedIntent(null);

      const targetRoute =
        normalizedIntent.type === "open_favorites" ? "/favorites" : "/account";

      if (pathname !== targetRoute) {
        router.navigate(targetRoute as never);
      }
    },
    [clearPendingIntent, pathname],
  );

  useEffect(() => {
    let cancelled = false;

    async function hydratePendingIntent() {
      const nextIntent = await readStoredProtectedIntent();

      if (!cancelled) {
        setPendingIntent(nextIntent);
      }
    }

    void hydratePendingIntent();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const resolvedSupabaseClient = getSupabaseClient();

    if (!resolvedSupabaseClient) {
      setAuthError(getDefaultAuthError());
      setIsAuthLoading(false);
      return;
    }

    const supabaseClient = resolvedSupabaseClient;

    async function bootstrapSession() {
      const { data, error } = await supabaseClient.auth.getSession();

      if (cancelled) {
        return;
      }

      if (error) {
        setAuthError(
          error.message ||
            "No pudimos recuperar la sesion actual de autenticacion.",
        );
        setSession(null);
        setUser(null);
      } else {
        setAuthError(null);
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
      }

      setIsAuthLoading(false);
    }

    void bootstrapSession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, nextSession) => {
      if (cancelled) {
        return;
      }

      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      setAuthError(null);
      setProfileError(null);
      setIsAuthLoading(false);

      if (!nextSession?.user) {
        setAppUser(null);
      }

      if (nextSession?.user && isAuthUserEmailVerified(nextSession.user)) {
        setPendingVerificationEmail("");
        setVerificationMessage("");
      } else if (nextSession?.user?.email) {
        setPendingVerificationEmail(nextSession.user.email);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!user?.id || !isAuthUserEmailVerified(user)) {
      setAppUser(null);
      setProfileError(null);
      setIsProfileLoading(false);
      return;
    }

    async function loadAppUser() {
      const authUser = user;

      if (!authUser?.id) {
        setAppUser(null);
        setIsProfileLoading(false);
        return;
      }

      const authUserId = authUser.id;
      setIsProfileLoading(true);

      try {
        const nextAppUser = await readAppUser(authUserId);

        if (!cancelled) {
          setAppUser(nextAppUser);
          setProfileError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setAppUser(null);
          setProfileError(
            error instanceof Error
              ? error.message
              : "No pudimos cargar el perfil de la cuenta.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsProfileLoading(false);
        }
      }
    }

    void loadAppUser();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    const accessState = buildAccessState({
      authError,
      appUser,
      isAuthLoading,
      isProfileLoading,
      pendingVerificationEmail,
      profileError,
      session,
      user,
    });

    if (pendingIntent && accessState === "ready") {
      executeProtectedIntent(pendingIntent);
      return;
    }

    if (
      pendingIntent &&
      accessState !== "ready" &&
      pathname !== "/account"
    ) {
      router.push("/account");
    }
  }, [
    appUser,
    authError,
    executeProtectedIntent,
    isAuthLoading,
    isProfileLoading,
    pathname,
    pendingIntent,
    pendingVerificationEmail,
    profileError,
    session,
    user,
  ]);

  const refreshAppUser = useCallback(async () => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setProfileError(error.message);
      return { data: null, error };
    }

    setAuthError(null);
    setProfileError(null);

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      const resolvedError = new Error(
        error.message || "No pudimos refrescar la cuenta autenticada.",
      );

      setProfileError(resolvedError.message);
      return { data: null, error: resolvedError };
    }

    setUser(data.user ?? null);
    setSession((currentSession) =>
      currentSession && data.user
        ? {
            ...currentSession,
            user: data.user,
          }
        : currentSession,
    );

    if (!data.user) {
      setAppUser(null);
      return { data: null, error: null };
    }

    if (!isAuthUserEmailVerified(data.user)) {
      setAppUser(null);
      setPendingVerificationEmail(data.user.email ?? pendingVerificationEmail);
      return { data: null, error: null };
    }

    try {
      setIsProfileLoading(true);
      const nextAppUser = await readAppUser(data.user);
      setAppUser(nextAppUser);
      setProfileError(null);
      return { data: nextAppUser, error: null };
    } catch (readError) {
      const resolvedError =
        readError instanceof Error
          ? readError
          : new Error("No pudimos refrescar el perfil del usuario.");

      setAppUser(null);
      setProfileError(resolvedError.message);
      return { data: null, error: resolvedError };
    } finally {
      setIsProfileLoading(false);
    }
  }, [pendingVerificationEmail]);

  const signInWithGoogle = useCallback(async () => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setAuthError(error.message);
      return { error };
    }

    setIsSigningIn(true);
    setAuthError(null);
    setVerificationMessage("");

    try {
      const redirectTo = getOAuthRedirectUrl();

      if (Platform.OS === "web") {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
          },
        });

        if (error) {
          const resolvedError = new Error(
            error.message ||
              "No pudimos iniciar el acceso con Google en este momento.",
          );

          setAuthError(resolvedError.message);
          return { error: resolvedError };
        }

        return { error: null };
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error || !data?.url) {
        const resolvedError = new Error(
          error?.message ||
            "No pudimos preparar el acceso con Google para movil.",
        );

        setAuthError(resolvedError.message);
        return { error: resolvedError };
      }

      const authSessionResult = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectTo,
      );

      if (authSessionResult.type !== "success" || !("url" in authSessionResult)) {
        const resolvedError = new Error(
          authSessionResult.type === "cancel"
            ? "Se cancelo el acceso con Google antes de completarse."
            : "No pudimos completar el acceso con Google en el dispositivo.",
        );

        setAuthError(resolvedError.message);
        return { error: resolvedError };
      }

      const oauthResponse = await resolveOAuthSessionFromUrl(authSessionResult.url);

      if (oauthResponse.error) {
        setAuthError(oauthResponse.error.message);
        return { error: oauthResponse.error };
      }

      return { error: null };
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signInWithPassword = useCallback(
    async (credentials: { email: string; password: string }) => {
      const supabase = getSupabaseClient();

      if (!supabase) {
        const error = new Error(getDefaultAuthError());
        setAuthError(error.message);
        return { error };
      }

      setIsSigningIn(true);
      setAuthError(null);
      setVerificationMessage("");

      const normalizedEmail = credentials.email.trim();
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: credentials.password,
      });

      setIsSigningIn(false);

      if (error) {
        if (isVerificationError(error)) {
          setPendingVerificationEmail(normalizedEmail);
        }

        const resolvedError = new Error(
          error.message || "No pudimos iniciar sesion con email y password.",
        );
        setAuthError(resolvedError.message);
        return { error: resolvedError };
      }

      return { error: null };
    },
    [],
  );

  const signUpWithPassword = useCallback(
    async (credentials: { email: string; password: string }) => {
      const supabase = getSupabaseClient();

      if (!supabase) {
        const error = new Error(getDefaultAuthError());
        setAuthError(error.message);
        return { error };
      }

      setIsSigningIn(true);
      setAuthError(null);
      setVerificationMessage("");

      const normalizedEmail = credentials.email.trim();
      const { error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: credentials.password,
        options: {
          emailRedirectTo: getOAuthRedirectUrl(),
        },
      });

      setIsSigningIn(false);

      if (error) {
        const resolvedError = new Error(
          error.message || "No pudimos crear la cuenta con email y password.",
        );
        setAuthError(resolvedError.message);
        return { error: resolvedError };
      }

      setPendingVerificationEmail(normalizedEmail);
      setVerificationMessage(
        "Te enviamos un email de verificacion. Confirma la cuenta antes de continuar.",
      );

      return { error: null };
    },
    [],
  );

  const resendVerificationEmail = useCallback(async (email: string) => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setAuthError(error.message);
      return { error };
    }

    const normalizedEmail = email.trim();

    setAuthError(null);
    setVerificationMessage("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: normalizedEmail,
      options: {
        emailRedirectTo: getOAuthRedirectUrl(),
      },
    });

    if (error) {
      const resolvedError = new Error(
        error.message || "No pudimos reenviar el email de verificacion.",
      );
      setAuthError(resolvedError.message);
      return { error: resolvedError };
    }

    setPendingVerificationEmail(normalizedEmail);
    setVerificationMessage(
      "Te reenviamos el email de verificacion. Revisa tu bandeja de entrada.",
    );

    return { error: null };
  }, []);

  const completeOnboarding = useCallback(
    async (profileInput: AppUserProfileInput) => {
      setIsCompletingOnboarding(true);
      setProfileError(null);

      try {
        const nextAppUser = await ensureAppUserProfile(profileInput);
        setAppUser(nextAppUser);
        return { data: nextAppUser, error: null };
      } catch (error) {
        const resolvedError =
          error instanceof Error
            ? error
            : new Error("No pudimos completar el perfil del usuario.");
        setProfileError(resolvedError.message);
        return { data: null, error: resolvedError };
      } finally {
        setIsCompletingOnboarding(false);
      }
    },
    [],
  );

  const startProtectedAction = useCallback(
    async (intent: ProtectedIntent) => {
      const normalizedIntent = persistPendingIntent(intent);

      if (!normalizedIntent) {
        return {
          data: null,
          error: new Error("La accion protegida no es valida."),
        };
      }

      const accessState = buildAccessState({
        authError,
        appUser,
        isAuthLoading,
        isProfileLoading,
        pendingVerificationEmail,
        profileError,
        session,
        user,
      });

      if (accessState === "ready") {
        executeProtectedIntent(normalizedIntent);
        return {
          data: normalizedIntent,
          error: null,
        };
      }

      if (pathname !== "/account") {
        router.push("/account");
      }

      return {
        data: null,
        error: null,
      };
    },
    [
      appUser,
      authError,
      executeProtectedIntent,
      isAuthLoading,
      isProfileLoading,
      pathname,
      pendingVerificationEmail,
      persistPendingIntent,
      profileError,
      session,
      user,
    ],
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setAuthError(error.message);
      return { error };
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      const resolvedError = new Error(
        error.message ||
          "No pudimos cerrar la sesion. Prueba de nuevo en unos segundos.",
      );
      setAuthError(resolvedError.message);
      return { error: resolvedError };
    }

    setSession(null);
    setUser(null);
    setAppUser(null);
    setAuthError(null);
    setProfileError(null);
    setIsProfileLoading(false);
    setPendingVerificationEmail("");
    setVerificationMessage("");
    setResolvedIntent(null);
    clearPendingIntent();
    router.replace("/explore");

    return { error: null };
  }, [clearPendingIntent]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      accessState: buildAccessState({
        authError,
        appUser,
        isAuthLoading,
        isProfileLoading,
        pendingVerificationEmail,
        profileError,
        session,
        user,
      }),
      authError,
      appUser,
      defaultOnboardingForm,
      isCompletingOnboarding,
      isLoading: isAuthLoading || isProfileLoading,
      isSigningIn,
      pendingIntent,
      pendingVerificationEmail,
      profileError,
      resolvedIntent,
      session,
      signInWithGoogle,
      signInWithPassword,
      signOut,
      signUpWithPassword,
      resendVerificationEmail,
      refreshAppUser,
      completeOnboarding,
      startProtectedAction,
      consumeResolvedIntent: () => {
        setResolvedIntent(null);
      },
      user,
      verificationMessage,
    }),
    [
      appUser,
      authError,
      completeOnboarding,
      defaultOnboardingForm,
      isAuthLoading,
      isCompletingOnboarding,
      isProfileLoading,
      isSigningIn,
      pendingIntent,
      pendingVerificationEmail,
      profileError,
      refreshAppUser,
      resendVerificationEmail,
      resolvedIntent,
      session,
      signInWithGoogle,
      signInWithPassword,
      signOut,
      signUpWithPassword,
      startProtectedAction,
      user,
      verificationMessage,
    ],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error(
      "useAuthSession must be used within AuthSessionProvider.",
    );
  }

  return context;
}
