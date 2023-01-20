

import { StyleSheet, SafeAreaView } from "react-native";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  View,
} from "react-native";

import { db } from "../../init-firebase";
import { AddList } from "../AddList";
import { ListSection } from "../ListSection/index";
import { BoxSection } from "../BoxSection/index";


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

export default function Home() {
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
  const [titleOfList, setTitleOfList] = useState("");

  const createNewList = () => {
    const Added = {
      ...mainLists,
      [titleOfList]: { description: "nada", items: [{}] },
    };

    // CREA LA LISTA
    setMainLists(Added);
    //*sube a firebase*
    set(ref(db, "/listas"), Added);
    // set(refRealTimeDatabase, Added);
  };
  const addItemToList = () => {
    console.log("qwerty");
  };

  return (
    <>

      <View style={styles.mainView}>
        {/* DESEOS/NECESIDADES */}
        <BoxSection mainLists={mainLists} />
        {/* creacion de listas */}
        <AddList
          titleOfList={titleOfList}
          setTitleOfList={setTitleOfList}
          createNewList={createNewList}
        />
        {/* listado de listas */}
        <ListSection mainLists={mainLists} addItemToList={addItemToList} />
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}
