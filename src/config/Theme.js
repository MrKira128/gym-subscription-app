import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2B2D42",
    secondary: "#DACBCB",
    secondary2: "#E18B8B",
    // placeholder: "#bbbbbb",
    placeholder: "white",
    text: "white",
    gradientColors: ["#2B2D42", "#6B5959"],
    gradientLocations: [0.15, 0.8],
  },
};
export const colorScheme = theme.colors;
