import { extendTheme } from "native-base";

export const mySuperTheme = extendTheme({
  safeAreaViewContainer: {
    flex: 1,
  },
  config: {
    initialColorStatusBar: "dark-content",
  },
  //

  colors: {
    primary: "green.500",
    secondary: "blue.500",
  },
});

// debo hacer un hook peronslizado para probar el cambio de color
