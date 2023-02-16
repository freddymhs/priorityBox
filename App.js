import React, { useState } from "react";
import { NavMenu } from "./components/NavMenu";
import {
  NativeBaseProvider,
  useTheme,
  Center,
  Button,
  Text,
} from "native-base";
import { mySuperTheme } from "./theme/index";
import { StatusBar } from "native-base";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainContent from "./MainContent";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    // para que funcione el navigation
    <NavigationContainer>
      {/* para que funcione el theme  */}
      <NativeBaseProvider theme={mySuperTheme}>
        {/* contenido de la app */}
        <MainContent />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
