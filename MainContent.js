import React, { useState } from "react";
import { NavMenu } from "./components/NavMenu";
import {
  NativeBaseProvider,
  useTheme,
  Center,
  Button,
  Text,
} from "native-base";
import { newTheme } from "./theme/index";
// import {  } from "native-base";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { View, StatusBar, SafeAreaView } from "react-native";

export default function MainContent() {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      height: STATUSBAR_HEIGHT,
    },
    appBar: {
      backgroundColor: "red",
      height: APPBAR_HEIGHT,
    },
    content: {
      flex: 1,
      backgroundColor: "red",
    },
  });

  const {
    safeAreaViewContainer,
    config: { initialColorStatusBarIphone, initialColorStatusBarAndroid },
  } = useTheme();

  return (
    // el safe area permite que la app se vea bien en los dispositivos
    <SafeAreaView style={safeAreaViewContainer}>
      <StatusBar
        barStyle={initialColorStatusBarIphone}
        backgroundColor={initialColorStatusBarAndroid}
      />
      {/* // status bar permite que la barra de estado se vea bien en los */}
      <StatusBar
        barStyle={"Products" !== "Products" ? "light-content" : "dark-content"}
      />
      {/* // aqui se reenderiza la primera pantalla */}
      <NavMenu />
      {/* <NavigationBar /> */}
    </SafeAreaView>
  );
}
