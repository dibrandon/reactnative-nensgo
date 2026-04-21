import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  isAuthUserEmailVerified,
  readAppUser,
} from "@/features/account/data/appUserService";
import type { AppUser } from "@/features/account/models/AppUser";
import {
  getSupabaseClient,
  getSupabaseClientError,
} from "@/shared/lib/supabase/supabaseClient";

type AuthAccessState =
  | "loading"
  | "anonymous"
  | "verification_pending"
  | "profile_missing"
  | "ready"
  | "error";

type AuthSessionContextValue = {
  accessState: AuthAccessState;
  authError: string | null;
  appUser: AppUser | null;
  isLoading: boolean;
  isSigningIn: boolean;
  pendingVerificationEmail: string;
  profileError: string | null;
  session: Session | null;
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

function buildAccessState({
  authError,
  appUser,
  isLoading,
  isProfileLoading,
  pendingVerificationEmail,
  profileError,
  session,
  user,
}: {
  authError: string | null;
  appUser: AppUser | null;
  isLoading: boolean;
  isProfileLoading: boolean;
  pendingVerificationEmail: string;
  profileError: string | null;
  session: Session | null;
  user: User | null;
}): AuthAccessState {
  if (isLoading) {
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

  return appUser ? "ready" : "profile_missing";
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    const resolvedSupabaseClient = getSupabaseClient();

    if (!resolvedSupabaseClient) {
      setAuthError(getDefaultAuthError());
      setIsLoading(false);
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

      setIsLoading(false);
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
      setIsLoading(false);

      if (nextSession?.user && isAuthUserEmailVerified(nextSession.user)) {
        setPendingVerificationEmail("");
        setVerificationMessage("");
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

    const authUserId = user.id;

    async function loadAppUser() {
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

  async function signInWithPassword(credentials: {
    email: string;
    password: string;
  }) {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setAuthError(error.message);
      return { error };
    }

    setIsSigningIn(true);
    setAuthError(null);
    setVerificationMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email.trim(),
      password: credentials.password,
    });

    setIsSigningIn(false);

    if (error) {
      if (
        error.message.toLowerCase().includes("email not confirmed") ||
        error.message.toLowerCase().includes("email_not_confirmed")
      ) {
        setPendingVerificationEmail(credentials.email.trim());
      }

      setAuthError(
        error.message || "No pudimos iniciar sesion con email y password.",
      );
      return {
        error: new Error(
          error.message || "No pudimos iniciar sesion con email y password.",
        ),
      };
    }

    return { error: null };
  }

  async function signUpWithPassword(credentials: {
    email: string;
    password: string;
  }) {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setAuthError(error.message);
      return { error };
    }

    setIsSigningIn(true);
    setAuthError(null);
    setVerificationMessage("");

    const { error } = await supabase.auth.signUp({
      email: credentials.email.trim(),
      password: credentials.password,
    });

    setIsSigningIn(false);

    if (error) {
      setAuthError(
        error.message || "No pudimos crear la cuenta con email y password.",
      );
      return {
        error: new Error(
          error.message || "No pudimos crear la cuenta con email y password.",
        ),
      };
    }

    setPendingVerificationEmail(credentials.email.trim());
    setVerificationMessage(
      "Te enviamos un email de verificacion. Confirma la cuenta antes de esperar una sesion lista.",
    );

    return { error: null };
  }

  async function resendVerificationEmail(email: string) {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setAuthError(error.message);
      return { error };
    }

    setAuthError(null);
    setVerificationMessage("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
    });

    if (error) {
      setAuthError(
        error.message || "No pudimos reenviar el email de verificacion.",
      );
      return {
        error: new Error(
          error.message || "No pudimos reenviar el email de verificacion.",
        ),
      };
    }

    setPendingVerificationEmail(email.trim());
    setVerificationMessage(
      "Te reenviamos el email de verificacion. Revisa tu bandeja de entrada.",
    );

    return { error: null };
  }

  async function signOut() {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = new Error(getDefaultAuthError());
      setAuthError(error.message);
      return { error };
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError(
        error.message ||
          "No pudimos cerrar la sesion. Prueba de nuevo en unos segundos.",
      );
      return {
        error: new Error(
          error.message ||
            "No pudimos cerrar la sesion. Prueba de nuevo en unos segundos.",
        ),
      };
    }

    setSession(null);
    setUser(null);
    setAppUser(null);
    setAuthError(null);
    setProfileError(null);
    setIsProfileLoading(false);
    setPendingVerificationEmail("");
    setVerificationMessage("");

    return { error: null };
  }

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      accessState: buildAccessState({
        authError,
        appUser,
        isLoading,
        isProfileLoading,
        pendingVerificationEmail,
        profileError,
        session,
        user,
      }),
      authError,
      appUser,
      isLoading,
      isProfileLoading,
      isSigningIn,
      pendingVerificationEmail,
      profileError,
      session,
      signInWithPassword,
      signOut,
      signUpWithPassword,
      resendVerificationEmail,
      user,
      verificationMessage,
    }),
    [
      authError,
      appUser,
      isLoading,
      isSigningIn,
      pendingVerificationEmail,
      profileError,
      session,
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
