import { Text, type TextProps } from "react-native";

import { textStyles } from "@/shared/theme/typography";

type AppTextVariant =
  | "eyebrow"
  | "hero"
  | "title"
  | "section"
  | "body"
  | "bodyStrong"
  | "meta"
  | "metaStrong"
  | "button";

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
};

export function AppText({
  variant = "body",
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text style={[textStyles[variant], style]} {...props}>
      {children}
    </Text>
  );
}
