import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { listCatalogCityChoices } from "@/features/account/data/catalogCityChoicesService";
import type { CatalogCityChoice } from "@/features/account/models/CatalogCityChoice";
import { useAuthSession } from "@/features/account/hooks/useAuthSession";
import { useRemoteFavorites } from "@/features/favorites/hooks/useRemoteFavorites";
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

function ChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.choiceChip,
        selected && styles.choiceChipSelected,
        pressed && styles.choiceChipPressed,
      ]}
    >
      <AppText
        variant="metaStrong"
        style={selected ? styles.choiceChipLabelSelected : styles.choiceChipLabel}
      >
        {label}
      </AppText>
      {selected ? (
        <MaterialCommunityIcons
          name="check-circle"
          size={16}
          color={nensGoColors.surface}
        />
      ) : null}
    </Pressable>
  );
}

function getIntentLabel(intentType?: string) {
  if (intentType === "toggle_favorite") {
    return "guardar una actividad";
  }

  if (intentType === "open_favorites") {
    return "abrir tus favoritos";
  }

  if (intentType === "open_profile") {
    return "continuar en tu cuenta";
  }

  return "continuar";
}

export function AccountStatusScreen() {
  const {
    accessState,
    authError,
    appUser,
    completeOnboarding,
    defaultOnboardingForm,
    isCompletingOnboarding,
    isLoading,
    isSigningIn,
    pendingIntent,
    pendingVerificationEmail,
    profileError,
    refreshAppUser,
    resendVerificationEmail,
    signInWithGoogle,
    signInWithPassword,
    signOut,
    signUpWithPassword,
    user,
    verificationMessage,
  } = useAuthSession();
  const { favoriteIds } = useRemoteFavorites();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [cityChoices, setCityChoices] = useState<CatalogCityChoice[]>([]);
  const [cityChoicesError, setCityChoicesError] = useState("");
  const [isLoadingCityChoices, setIsLoadingCityChoices] = useState(false);
  const [formError, setFormError] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    if (accessState !== "onboarding_required") {
      return;
    }

    setProfileName(defaultOnboardingForm.name);
    setProfileLastName(defaultOnboardingForm.lastName);
    setSelectedCityId(defaultOnboardingForm.cityId);
  }, [accessState, defaultOnboardingForm]);

  useEffect(() => {
    if (accessState !== "onboarding_required") {
      return;
    }

    let cancelled = false;

    async function loadCityChoices() {
      setIsLoadingCityChoices(true);
      setCityChoicesError("");

      try {
        const nextCityChoices = await listCatalogCityChoices();

        if (!cancelled) {
          setCityChoices(nextCityChoices);
        }
      } catch (error) {
        if (!cancelled) {
          setCityChoices([]);
          setCityChoicesError(
            error instanceof Error
              ? error.message
              : "No pudimos cargar las ciudades disponibles.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCityChoices(false);
        }
      }
    }

    void loadCityChoices();

    return () => {
      cancelled = true;
    };
  }, [accessState]);

  const heroLabel = useMemo(() => {
    if (accessState === "ready") {
      return "Cuenta lista";
    }

    if (accessState === "verification_pending") {
      return "Verificacion pendiente";
    }

    if (accessState === "onboarding_required") {
      return "Perfil pendiente";
    }

    if (accessState === "loading") {
      return "Preparando cuenta";
    }

    if (accessState === "error") {
      return "Acceso bloqueado";
    }

    return "Acceso";
  }, [accessState]);

  const currentIntentLabel = getIntentLabel(pendingIntent?.type);
  const selectedCity =
    cityChoices.find((cityChoice) => cityChoice.id === selectedCityId) ?? null;
  const messageError = formError || authError || profileError || cityChoicesError;

  async function handleCredentialsSubmit() {
    if (!email.trim() || !password.trim()) {
      setFormError("Email y password son obligatorios.");
      return;
    }

    if (mode === "signup" && password !== passwordConfirm) {
      setFormError("La confirmacion de la password no coincide.");
      return;
    }

    setFormError("");

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

  async function handleOnboardingSubmit() {
    if (!profileName.trim()) {
      setFormError("El nombre es obligatorio para completar el perfil.");
      return;
    }

    if (!selectedCity) {
      setFormError("Selecciona una ciudad para completar tu perfil.");
      return;
    }

    setFormError("");

    await completeOnboarding({
      name: profileName,
      lastName: profileLastName,
      cityId: selectedCity.id,
    });
  }

  return (
    <ScreenContainer keyboardShouldPersistTaps="handled">
      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <BrandLockup compact />
          <InfoPill label={heroLabel} tone="primary" />
        </View>

        <AppText variant="eyebrow">Cuenta</AppText>
        <AppText variant="hero">
          {accessState === "ready"
            ? "Tu cuenta esta lista"
            : accessState === "verification_pending"
              ? "Confirma tu email para continuar"
              : accessState === "onboarding_required"
                ? "Completa tu perfil minimo"
                : accessState === "loading"
                  ? "Estamos preparando tu acceso"
                  : accessState === "error"
                    ? "No pudimos dejar lista tu cuenta"
                    : `Accede para ${currentIntentLabel}`}
        </AppText>
        <AppText variant="body">
          {accessState === "ready"
            ? "Tu perfil de app ya esta activo y la cuenta puede usar favoritos y acciones protegidas."
            : accessState === "verification_pending"
              ? "La cuenta clasica necesita verificar el email antes de continuar con el onboarding o los favoritos."
              : accessState === "onboarding_required"
                ? "La cuenta ya existe, pero todavia falta asociar el perfil minimo con una ciudad."
                : accessState === "loading"
                  ? "Estamos leyendo la sesion actual y comprobando si el perfil de aplicacion ya esta completo."
                  : accessState === "error"
                    ? "La autenticacion existe, pero no hemos podido dejar listo el perfil con la configuracion actual."
                    : "El catalogo se puede explorar en abierto, pero favoritos y acciones protegidas necesitan una cuenta lista."}
        </AppText>
      </SurfaceCard>

      {accessState === "anonymous" ? (
        <SurfaceCard style={styles.sectionCard}>
          <AppText variant="title">Acceso</AppText>
          <AppText variant="body">
            Puedes continuar con Google o usar email y password.
          </AppText>

          <View style={styles.actionStack}>
            <AppButton
              label="Continuar con Google"
              icon="google"
              onPress={() => {
                void signInWithGoogle();
              }}
              disabled={isSigningIn || isLoading}
            />
          </View>

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

          {mode === "signup" ? (
            <View style={styles.formField}>
              <AppText variant="metaStrong">Confirmar password</AppText>
              <TextInput
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                placeholder="Repite tu password"
                placeholderTextColor={nensGoColors.tabInactive}
                style={styles.input}
              />
            </View>
          ) : null}

          <AppButton
            label={mode === "signin" ? "Entrar con email" : "Crear cuenta"}
            icon={mode === "signin" ? "login" : "account-plus-outline"}
            onPress={() => {
              void handleCredentialsSubmit();
            }}
            disabled={isSigningIn || isLoading}
          />
        </SurfaceCard>
      ) : null}

      {accessState === "loading" ? (
        <SurfaceCard tone="muted" style={styles.sectionCard}>
          <StatusRow
            icon="progress-clock"
            label="Cuenta"
            value="Leyendo sesion y perfil desde Supabase."
          />
        </SurfaceCard>
      ) : null}

      {accessState === "verification_pending" ? (
        <SurfaceCard style={styles.sectionCard}>
          <AppText variant="title">Verifica tu email</AppText>
          <StatusRow
            icon="email-check-outline"
            label="Email pendiente"
            value={
              pendingVerificationEmail ||
              user?.email ||
              "Cuenta creada, pero aun sin verificacion confirmada."
            }
          />
          <View style={styles.actionStack}>
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
            <AppButton
              label="Ya verifique mi email"
              icon="refresh"
              onPress={() => {
                void refreshAppUser();
              }}
            />
          </View>
        </SurfaceCard>
      ) : null}

      {accessState === "onboarding_required" ? (
        <SurfaceCard style={styles.sectionCard}>
          <AppText variant="title">Completa tu perfil</AppText>
          <View style={styles.formField}>
            <AppText variant="metaStrong">Nombre</AppText>
            <TextInput
              value={profileName}
              onChangeText={setProfileName}
              placeholder="Nombre"
              placeholderTextColor={nensGoColors.tabInactive}
              style={styles.input}
            />
          </View>

          <View style={styles.formField}>
            <AppText variant="metaStrong">Apellido</AppText>
            <TextInput
              value={profileLastName}
              onChangeText={setProfileLastName}
              placeholder="Apellido"
              placeholderTextColor={nensGoColors.tabInactive}
              style={styles.input}
            />
          </View>

          <View style={styles.formField}>
            <AppText variant="metaStrong">Tu ciudad</AppText>
            {isLoadingCityChoices ? (
              <StatusRow
                icon="progress-clock"
                label="Ciudades"
                value="Cargando ciudades disponibles."
              />
            ) : (
              <View style={styles.choiceWrap}>
                {cityChoices.map((cityChoice) => (
                  <ChoiceChip
                    key={cityChoice.id}
                    label={cityChoice.name}
                    selected={selectedCityId === cityChoice.id}
                    onPress={() => {
                      setSelectedCityId(cityChoice.id);
                    }}
                  />
                ))}
              </View>
            )}
          </View>

          <AppButton
            label="Guardar y continuar"
            icon="arrow-right"
            onPress={() => {
              void handleOnboardingSubmit();
            }}
            disabled={isCompletingOnboarding || isLoadingCityChoices}
          />
        </SurfaceCard>
      ) : null}

      {accessState === "ready" ? (
        <>
          <SurfaceCard style={styles.sectionCard}>
            <AppText variant="title">Perfil</AppText>
            <View style={styles.sectionList}>
              <StatusRow
                icon="account-check-outline"
                label="Nombre"
                value={appUser?.fullName || user?.email || "Cuenta lista"}
              />
              <StatusRow
                icon="email-outline"
                label="Email"
                value={appUser?.email || user?.email || "Sin email visible"}
              />
              <StatusRow
                icon="city-variant-outline"
                label="Ciudad"
                value={appUser?.cityName || "Sin ciudad visible"}
              />
              <StatusRow
                icon="heart-outline"
                label="Favoritos"
                value={
                  favoriteIds.length === 1
                    ? "1 actividad guardada"
                    : `${favoriteIds.length} actividades guardadas`
                }
              />
            </View>
          </SurfaceCard>

          <SurfaceCard tone="muted" style={styles.sectionCard}>
            <AppText variant="title">Sesion</AppText>
            <AppText variant="body">
              La cuenta esta lista para favoritos remotos y acciones protegidas.
            </AppText>
            <AppButton
              label="Cerrar sesion"
              variant="secondary"
              icon="logout"
              onPress={() => {
                void signOut();
              }}
            />
          </SurfaceCard>
        </>
      ) : null}

      {accessState === "error" ? (
        <SurfaceCard style={styles.sectionCard}>
          <AppText variant="title">No pudimos dejar lista tu cuenta</AppText>
          <AppText variant="body">
            Reintenta la lectura del perfil autenticado desde Supabase.
          </AppText>
          <AppButton
            label="Reintentar"
            icon="refresh"
            onPress={() => {
              void refreshAppUser();
            }}
          />
        </SurfaceCard>
      ) : null}

      {verificationMessage || messageError ? (
        <SurfaceCard tone="muted" style={styles.messageBlock}>
          {verificationMessage ? (
            <AppText variant="metaStrong" style={styles.messageInfo}>
              {verificationMessage}
            </AppText>
          ) : null}
          {messageError ? (
            <AppText variant="metaStrong" style={styles.messageError}>
              {messageError}
            </AppText>
          ) : null}
        </SurfaceCard>
      ) : null}
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
  actionStack: {
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
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: nensGoSpacing.sm,
  },
  choiceChip: {
    minHeight: 42,
    borderRadius: nensGoRadii.pill,
    borderWidth: 1,
    borderColor: nensGoColors.border,
    backgroundColor: nensGoColors.surface,
    paddingHorizontal: nensGoSpacing.md,
    paddingVertical: nensGoSpacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.xs,
  },
  choiceChipSelected: {
    borderColor: nensGoColors.primaryStrong,
    backgroundColor: nensGoColors.primaryStrong,
  },
  choiceChipPressed: {
    opacity: 0.9,
  },
  choiceChipLabel: {
    color: nensGoColors.primaryStrong,
  },
  choiceChipLabelSelected: {
    color: nensGoColors.surface,
  },
  messageBlock: {
    gap: nensGoSpacing.xs,
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
