import { PlaceholderShellScreen } from "@/features/shell/components/PlaceholderShellScreen";
import { nensGoColors } from "@/shared/theme/tokens";

const cards = [
  {
    title: "Catálogo después, shell ahora",
    body: "Esta primera slice sólo prueba que Expo, el router y la navegación base arrancan con una sensación de app real.",
    accentColor: nensGoColors.primary,
  },
  {
    title: "Explorar será el loop principal",
    body: "En las siguientes slices esta tab alojará el catálogo, las cards móviles y el acceso al detalle full-screen.",
    accentColor: nensGoColors.mint,
  },
  {
    title: "Sin migración literal de la web",
    body: "No estamos portando la landing larga ni los flujos internos. El objetivo es validar una experiencia nativa más corta y clara.",
    accentColor: nensGoColors.coral,
  },
];

export default function ExploreScreen() {
  return (
    <PlaceholderShellScreen
      eyebrow="Explorar"
      title="Primer shell nativo para descubrir actividades familiares"
      description="Este bootstrap deja lista la base móvil de NensGo sin fingir todavía catálogo ni detalle. Lo que valida ahora es navegación, tono visual y continuidad técnica."
      cards={cards}
      highlightLabel="Slice 001"
      primaryActionLabel="Catalogo en la siguiente slice"
      footerNote="Aquí aún no hay catálogo real, cards ni detalle. Eso entrará en slices separadas para no convertir el POC en una migración descontrolada."
    />
  );
}
