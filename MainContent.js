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
import { StatusBar } from "native-base";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function MainContent() {
  const {
    safeAreaViewContainer,
    config: { initialColorStatusBar },
  } = useTheme();

  return (
    // el safe area permite que la app se vea bien en los dispositivos
    <SafeAreaView style={safeAreaViewContainer}>
      {/* // status bar permite que la barra de estado se vea bien en los */}
      <StatusBar barStyle={initialColorStatusBar} />
      {/* // aqui se reenderiza la primera pantalla */}
      <NavMenu />
    </SafeAreaView>
  );
}
