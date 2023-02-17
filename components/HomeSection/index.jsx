

import { StyleSheet } from "react-native";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  View,
} from "react-native";

import { db } from "../../init-firebase";


import { BoxSection } from "../BoxSection/index";
import { AddItem } from "./AddItem";
import { Content, Container, useTheme } from "native-base";

const refRealTimeDatabase = ref(db, "/listas");

export default function HomeSection() {
  const {
    components: { fullScreen, separator }
  } = useTheme();

  const [mainLists, setMainLists] = useState({});

  useEffect(() => {
    function getDataFromFirebase() {
      try {
        onValue(refRealTimeDatabase, (snapshot) => {
          const data = snapshot.val();
          setMainLists(data);
        });
      } catch (err) {
        console.log("no pude obtener la data desde firebase realtime");
      }
    }

    getDataFromFirebase();
  }, []);




  return (
    <View style={fullScreen}>

      <BoxSection mainLists={mainLists} />
      <View style={separator}></View>
      <AddItem />

    </View>

  )
  // return (
  //   <View style={styles.mainView}>
  //     <BoxSection mainLists={mainLists} />
  //     <AddItem />
  //   </View>);
}
