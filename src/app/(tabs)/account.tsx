import { PlaceholderShellScreen } from "@/features/shell/components/PlaceholderShellScreen";
import { nensGoColors } from "@/shared/theme/tokens";

const cards = [
  {
    title: "Hueco visible para auth futura",
    body: "Cuenta existe desde el shell para que la navegación ya refleje que el POC crecerá hacia identidad y preferencias.",
    accentColor: nensGoColors.purple,
  },
  {
    title: "Sin login fake",
    body: "Todavía no hay Supabase, Google ni perfil persistido. Esta pantalla documenta la dirección sin prometer algo que no existe.",
    accentColor: nensGoColors.yellow,
  },
  {
    title: "Siguiente objetivo real",
    body: "Cuando llegue la slice de auth, esta superficie evolucionará desde placeholder hacia viabilidad técnica y contrato de cuenta.",
    accentColor: nensGoColors.aqua,
  },
];

export default function AccountScreen() {
  return (
    <PlaceholderShellScreen
      eyebrow="Cuenta"
      title="Base mínima para la futura capa de autenticación"
      description="La app ya reserva una superficie propia para identidad y continuidad de usuario, pero todavía no introduce auth real ni estados simulados."
      cards={cards}
      highlightLabel="Auth placeholder"
      footerNote="La presencia de esta tab es intencional: valida estructura de producto y navegación, no integración de autenticación."
    />
  );
}
