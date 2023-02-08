import React from "react";
import { NavMenu } from "./components/NavMenu";
import { StatusBar } from "native-base";
import { StyleSheet, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <NavMenu />
      </SafeAreaView>
    </>
  );
}
