import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
} from "react-native";

import { AppText } from "@/shared/ui/AppText";
import {
  nensGoColors,
  nensGoRadii,
  nensGoSpacing,
} from "@/shared/theme/tokens";

type AppButtonProps = PressableProps & {
  label: string;
  variant?: "primary" | "secondary";
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export function AppButton({
  label,
  variant = "primary",
  icon,
  style,
  ...props
}: AppButtonProps) {
  return (
    <Pressable
      style={(state) => {
        const resolvedStyle =
          typeof style === "function" ? style(state) : style;

        return [
          styles.base,
          variant === "primary" ? styles.primary : styles.secondary,
          state.pressed && styles.pressed,
          resolvedStyle,
        ];
      }}
      {...props}
    >
      <View style={styles.content}>
        <AppText
          variant="button"
          style={variant === "primary" ? styles.primaryLabel : styles.secondaryLabel}
        >
          {label}
        </AppText>
        {icon ? (
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color={
              variant === "primary" ? nensGoColors.surface : nensGoColors.primaryStrong
            }
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: nensGoRadii.pill,
    paddingHorizontal: nensGoSpacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: nensGoSpacing.sm,
  },
  primary: {
    backgroundColor: nensGoColors.primaryStrong,
  },
  secondary: {
    backgroundColor: nensGoColors.surface,
    borderWidth: 1,
    borderColor: nensGoColors.border,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  primaryLabel: {
    color: nensGoColors.surface,
  },
  secondaryLabel: {
    color: nensGoColors.primaryStrong,
  },
});
