import {
  DefaultTheme,
  type Theme as NavigationTheme,
} from "@react-navigation/native";

import { nensGoColors } from "@/shared/theme/tokens";

export const nensGoNavigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: nensGoColors.background,
    border: nensGoColors.border,
    card: nensGoColors.surface,
    primary: nensGoColors.primary,
    text: nensGoColors.text,
  },
};
