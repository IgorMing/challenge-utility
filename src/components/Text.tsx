import React from "react";
import { StyleSheet, Text as NativeText, TextProps } from "react-native";

type Variant = "regular" | "title";
interface CustomTextProps extends TextProps {
  variant?: Variant;
}

const Text = (props: CustomTextProps): JSX.Element => {
  const { children, variant = "regular", style, ...textProps } = props;

  return (
    <NativeText {...textProps} style={[style, styles[variant]]}>
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontSize: 14,
  },
  title: {
    fontSize: 22,
  },
});

export default Text;
