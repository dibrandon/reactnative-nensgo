import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMemo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { useAuthSession } from "@/features/account/hooks/useAuthSession";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";
import { AppButton } from "@/shared/ui/AppButton";
import { AppText } from "@/shared/ui/AppText";
import { BrandLockup } from "@/shared/ui/BrandLockup";
import { InfoPill } from "@/shared/ui/InfoPill";
import { ScreenContainer } from "@/shared/ui/ScreenContainer";
import { SurfaceCard } from "@/shared/ui/SurfaceCard";

function StatusRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statusRow}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={nensGoColors.primaryStrong}
        />
      </View>
      <View style={styles.statusCopy}>
        <AppText variant="meta">{label}</AppText>
        <AppText variant="bodyStrong">{value}</AppText>
      </View>
    </View>
  );
}

export function AccountStatusScreen() {
  const {
    accessState,
    authError,
    appUser,
    isLoading,
    isSigningIn,
    pendingVerificationEmail,
    profileError,
    signInWithPassword,
    signOut,
    signUpWithPassword,
    resendVerificationEmail,
    user,
    verificationMessage,
  } = useAuthSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const heroLabel = useMemo(() => {
    if (accessState === "ready") {
      return "Sesion real";
    }

    if (accessState === "verification_pending") {
      return "Verificacion pendiente";
    }

    if (accessState === "profile_missing") {
      return "Sesion sin perfil";
    }

    if (accessState === "loading") {
      return "Cargando";
    }

    if (accessState === "error") {
      return "Error real";
    }

    return "Auth baseline";
  }, [accessState]);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      return;
    }

    if (mode === "signin") {
      await signInWithPassword({
        email,
        password,
      });
      return;
    }

    await signUpWithPassword({
      email,
      password,
    });
  }

  return (
    <ScreenContainer>
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
          <InfoPill label={heroLabel} tone="primary" />
        </View>

        <AppText variant="eyebrow">Cuenta</AppText>
        <AppText variant="hero">
          {accessState === "ready"
            ? "Sesion activa en la app"
            : accessState === "verification_pending"
              ? "Confirma tu cuenta"
              : accessState === "profile_missing"
                ? "Sesion activa, perfil pendiente"
                : accessState === "loading"
                  ? "Preparando el estado real"
                  : accessState === "error"
                    ? "Auth conectada con incidencia"
                    : "Acceso real listo para conectar"}
        </AppText>
        <AppText variant="body">
          {accessState === "ready"
            ? "La app ya detecta una sesion real. Esta slice cubre restore, estado vivo y cierre de sesion, pero no onboarding completo."
            : accessState === "verification_pending"
              ? "La baseline ya conecta auth real con email y password. La verificacion de email sigue siendo obligatoria antes de esperar una cuenta lista."
              : accessState === "profile_missing"
                ? "La sesion existe, pero no encontramos un perfil app listo. Esta slice no completa provisioning ni onboarding."
                : accessState === "loading"
                  ? "Estamos leyendo la sesion persistida y el estado real de la cuenta."
                  : accessState === "error"
                    ? "La app ya usa auth real, pero hay un error honesto que debemos resolver antes de considerarla lista."
                    : "La baseline elegida para movil es email/password con sesion persistente. Google, onboarding y provisioning siguen fuera."}
        </AppText>
      </SurfaceCard>

      <SurfaceCard tone="muted" style={styles.sectionCard}>
        <AppText variant="eyebrow">Estado real</AppText>
        <AppText variant="section">Auth runtime</AppText>

        <View style={styles.sectionList}>
          <StatusRow
            icon="email-lock-outline"
            label="Path elegido"
            value="Email y password como baseline de sesion movil. Google sigue fuera de esta slice."
          />
          <StatusRow
            icon="refresh-auto"
            label="Restore"
            value="La sesion se bootstrappea desde almacenamiento persistente cuando existe."
          />
          <StatusRow
            icon="logout"
            label="Sign-out"
            value="Cerrar sesion limpia el estado visible y deja la cuenta otra vez en modo anonimo."
          />
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <AppText variant="eyebrow">Acceso</AppText>
        <AppText variant="section">Cuenta en movil</AppText>

        {accessState === "anonymous" || accessState === "error" ? (
          <>
            <View style={styles.modeRow}>
              <AppButton
                label="Entrar"
                variant={mode === "signin" ? "primary" : "secondary"}
                onPress={() => {
                  setMode("signin");
                }}
              />
              <AppButton
                label="Crear cuenta"
                variant={mode === "signup" ? "primary" : "secondary"}
                onPress={() => {
                  setMode("signup");
                }}
              />
            </View>

            <View style={styles.formField}>
              <AppText variant="metaStrong">Email</AppText>
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="familia@nensgo.com"
                placeholderTextColor={nensGoColors.tabInactive}
                style={styles.input}
              />
            </View>

            <View style={styles.formField}>
              <AppText variant="metaStrong">Password</AppText>
              <TextInput
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                placeholder="Tu password"
                placeholderTextColor={nensGoColors.tabInactive}
                style={styles.input}
              />
            </View>

            <AppButton
              label={mode === "signin" ? "Entrar con email" : "Crear cuenta"}
              icon={mode === "signin" ? "login" : "account-plus-outline"}
              onPress={() => {
                void handleSubmit();
              }}
              disabled={isSigningIn || isLoading || !email.trim() || !password}
            />
          </>
        ) : null}

        {accessState === "loading" ? (
          <View style={styles.stateBlock}>
            <StatusRow
              icon="progress-clock"
              label="Bootstrap"
              value="Leyendo sesion y perfil real desde Supabase."
            />
          </View>
        ) : null}

        {accessState === "verification_pending" ? (
          <>
            <StatusRow
              icon="email-check-outline"
              label="Email pendiente"
              value={
                pendingVerificationEmail ||
                user?.email ||
                "Cuenta creada, pero aun sin verificacion confirmada."
              }
            />
            <AppButton
              label="Reenviar verificacion"
              variant="secondary"
              icon="email-sync-outline"
              onPress={() => {
                void resendVerificationEmail(
                  pendingVerificationEmail || user?.email || email,
                );
              }}
            />
          </>
        ) : null}

        {accessState === "profile_missing" ? (
          <View style={styles.stateBlock}>
            <StatusRow
              icon="account-alert-outline"
              label="Perfil app"
              value="La sesion existe, pero no hay un user_profile listo para esta cuenta. Onboarding y ensure_my_profile siguen fuera."
            />
            <StatusRow
              icon="email-outline"
              label="Cuenta activa"
              value={user?.email || "Sesion autenticada"}
            />
            <AppButton
              label="Cerrar sesion"
              variant="secondary"
              icon="logout"
              onPress={() => {
                void signOut();
              }}
            />
          </View>
        ) : null}

        {accessState === "ready" ? (
          <View style={styles.stateBlock}>
            <StatusRow
              icon="account-check-outline"
              label="Cuenta activa"
              value={appUser?.fullName || user?.email || "Sesion autenticada"}
            />
            <StatusRow
              icon="email-outline"
              label="Email"
              value={appUser?.email || user?.email || "Sin email visible"}
            />
            <StatusRow
              icon="city-variant-outline"
              label="Ciudad"
              value={appUser?.cityName || "Ciudad no visible"}
            />
            <AppButton
              label="Cerrar sesion"
              variant="secondary"
              icon="logout"
              onPress={() => {
                void signOut();
              }}
            />
          </View>
        ) : null}

        {authError || profileError || verificationMessage ? (
          <View style={styles.messageBlock}>
            {verificationMessage ? (
              <AppText variant="metaStrong" style={styles.messageInfo}>
                {verificationMessage}
              </AppText>
            ) : null}
            {authError ? (
              <AppText variant="metaStrong" style={styles.messageError}>
                {authError}
              </AppText>
            ) : null}
            {profileError ? (
              <AppText variant="metaStrong" style={styles.messageError}>
                {profileError}
              </AppText>
            ) : null}
          </View>
        ) : null}
      </SurfaceCard>

      <SurfaceCard tone="muted" style={styles.sectionCard}>
        <AppText variant="eyebrow">Bloqueos y fuera de alcance</AppText>
        <AppText variant="section">Lo que aun no cierra</AppText>

        <View style={styles.sectionList}>
          <StatusRow
            icon="google"
            label="Google OAuth"
            value="No entra en esta baseline. El path elegido aqui es email/password."
          />
          <StatusRow
            icon="account-edit-outline"
            label="Onboarding"
            value="No completamos provisioning ni city/profile completion en esta fase."
          />
          <StatusRow
            icon="heart-outline"
            label="Favoritos"
            value="Siguen fuera del cierre de esta slice. La persistencia remota llega despues de estabilizar auth."
          />
          <StatusRow
            icon="message-text-outline"
            label="Contacto"
            value="El detalle ya consulta activity_contact_options, pero el backend actual solo expone 0 contactos activos y aun no permite cerrar los casos 1 y varias."
          />
        </View>
      </SurfaceCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    gap: nensGoSpacing.md,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: nensGoSpacing.md,
  },
  sectionCard: {
    gap: nensGoSpacing.md,
  },
  sectionList: {
    gap: nensGoSpacing.md,
  },
  modeRow: {
    flexDirection: "row",
    gap: nensGoSpacing.sm,
  },
  formField: {
    gap: nensGoSpacing.xs,
  },
  input: {
    minHeight: 52,
    borderRadius: nensGoRadii.lg,
    backgroundColor: nensGoColors.surfaceMuted,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    paddingHorizontal: nensGoSpacing.md,
    color: nensGoColors.text,
    fontSize: 15,
  },
  stateBlock: {
    gap: nensGoSpacing.md,
  },
  messageBlock: {
    gap: nensGoSpacing.xs,
    borderRadius: nensGoRadii.md,
    backgroundColor: nensGoColors.surfaceMuted,
    padding: nensGoSpacing.md,
  },
  messageInfo: {
    color: nensGoColors.primaryStrong,
  },
  messageError: {
    color: nensGoColors.coral,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: nensGoSpacing.sm,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: nensGoRadii.pill,
    backgroundColor: nensGoColors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  statusCopy: {
    flex: 1,
    gap: 2,
  },
});
