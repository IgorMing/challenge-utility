import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import generalStyles from "../utils/styles";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = (props: CustomButtonProps): JSX.Element => {
  const { title, style, ...buttonProps } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, style]}
      {...buttonProps}
    >
      <Text
        style={[styles.title, buttonProps.disabled && { color: "lightgray" }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    padding: 12,
    backgroundColor: "blue",
    ...generalStyles.elevation,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
});

export default Button;
