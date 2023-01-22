

import { StyleSheet } from "react-native";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  View,
} from "react-native";

import { db } from "../../init-firebase";


import { BoxSection } from "../BoxSection/index";
import { AddItem } from "./AddItem";



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
  mainView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  //
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default function HomeSection() {
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
  const refRealTimeDatabase = ref(db, "/listas");
  //
  //
  //
  function setDataInFirebase() {
    set(ref(db, "/listas"), list);
  }
  //
  const [mainLists, setMainLists] = useState({});

  const addItemToList = () => {
    console.log("qwerty");
  };

  return (
    <View style={styles.mainView}>
      {/* DESEOS/NECESIDADES */}
      <BoxSection mainLists={mainLists} />
      {/* agregar itemss!!!!@#!@#! */}
      <AddItem />
    </View>);
}
