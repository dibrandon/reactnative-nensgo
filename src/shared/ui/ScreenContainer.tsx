import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { nensGoColors, nensGoSpacing } from "@/shared/theme/tokens";

type ScreenContainerProps = ScrollViewProps & {
  contentStyle?: ViewStyle;
};

export function ScreenContainer({
  children,
  contentStyle,
  ...props
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.backgroundBubblePrimary} pointerEvents="none" />
      <View style={styles.backgroundBubbleWarm} pointerEvents="none" />
      <View style={styles.backgroundBubblePurple} pointerEvents="none" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, contentStyle]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: nensGoColors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: nensGoSpacing.xl,
    paddingBottom: nensGoSpacing.xxxl,
    paddingTop: nensGoSpacing.sm,
    gap: nensGoSpacing.xl,
  },
  backgroundBubblePrimary: {
    position: "absolute",
    right: -74,
    top: 120,
    height: 230,
    width: 230,
    borderRadius: 230,
    backgroundColor: "rgba(99, 190, 235, 0.16)",
  },
  backgroundBubbleWarm: {
    position: "absolute",
    left: -90,
    bottom: 160,
    height: 240,
    width: 240,
    borderRadius: 240,
    backgroundColor: "rgba(245, 201, 74, 0.16)",
  },
  backgroundBubblePurple: {
    position: "absolute",
    right: -120,
    bottom: 320,
    height: 180,
    width: 180,
    borderRadius: 180,
    backgroundColor: "rgba(122, 73, 232, 0.08)",
  },
});
