import React from "react";
import { StyleSheet, Text as NativeText, TextProps } from "react-native";

type Variant = "regular" | "title" | "subtitle";
interface CustomTextProps extends TextProps {
  bold?: boolean;
  variant?: Variant;
}

const Text = (props: CustomTextProps): JSX.Element => {
  const { bold, children, variant = "regular", style, ...textProps } = props;

  return (
    <NativeText
      {...textProps}
      style={[styles[variant], bold && { fontWeight: "500" }, style]}
    >
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 16,
  },
  title: {
    fontSize: 22,
  },
});

export default Text;
