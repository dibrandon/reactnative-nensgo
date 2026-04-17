import type { AuthFeasibilityState } from "@/features/account/models/AuthFeasibilityState";

export const authFeasibilityState: AuthFeasibilityState = {
  currentMode: "anonymous",
  proposedProvider: "Google OAuth + Supabase Auth",
  currentCapabilities: [
    "Explorar catalogo en abierto",
    "Abrir detalle full-screen",
    "Salir a contacto externo sin cuenta",
  ],
  observedWebBaseline: [
    "La web usa Google OAuth a traves de Supabase Auth.",
    "La sesion se rehidrata si la configuracion existe y sigue siendo valida.",
    "Una ciudad pasa a ser obligatoria antes de continuar ciertas acciones protegidas.",
  ],
  missingInputs: [
    "No hay EXPO_PUBLIC_SUPABASE_URL ni anon key configuradas para la app nativa.",
    "No hay redirects OAuth definidos para Expo ni para builds moviles.",
    "No existen client IDs de Google aprobados para iOS, Android y web.",
    "La app movil aun no tiene acciones protegidas aprobadas que justifiquen auth real.",
  ],
  proposedPath: [
    "Mantener catalogo y detalle abiertos por defecto.",
    "Anadir Google sign-in via Supabase solo cuando credenciales y redirects existan.",
    "Completar ciudad si el alta minima queda incompleta tras autenticar.",
    "Desbloquear futuros flujos de cuenta desde un estado autenticado real.",
  ],
  futureUnlocks: [
    "Continuidad de sesion y perfil basico entre visitas.",
    "Preferencias o ciudad por defecto si el producto decide necesitarlas.",
    "Un flujo real de actividades guardadas solo si el producto lo aprueba despues.",
  ],
};
