// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import Modal from "react-native-modal";
import { StatusBar } from "native-base";

import { StyleSheet, SafeAreaView } from "react-native";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import {
//   FlatList,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
// } from "react-native";
// } from "react-native-web";
import { AddItem } from "./components/AddItem";
//
import { db } from "./init-firebase";
import { AddList } from "./components/AddList";
import { ListSection } from "./components/ListSection";
import { BoxSection } from "./components/BoxSection";
import { NavMenu } from "./components/NavMenu";

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

export default function App() {
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
      <NavMenu />
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </>
  );
}

// const ListSection = ({ mainLists, addItemToList }) => {
//   // const [modalVisible, setModalVisible] = useState(false);
//   const [newItem, setNewItem] = useState({
//     name: "comprar regalos",
//     priority: "mid",
//   });
//   const titlesInList = Object.keys(mainLists);

//   const List = titlesInList.map((t) => {
//     const oneList = mainLists?.[t];
//     const itemsOfList = oneList?.items;
//     return (
//       <FlatList
//         key={oneList?.description}
//         style={{
//           borderWidth: 1,
//           borderColor: "black",
//           width: 100,
//         }}
//         data={itemsOfList}
//         renderItem={({ item }) => <Text title={item?.name}>{item?.name}</Text>}
//         ListHeaderComponent={() => (
//           <>
//             <AddItem title={t} mainLists={mainLists} />
//           </>
//         )}
//         ListFooterComponent={(item) => (
//           <Text>
//             {itemsOfList ? `${itemsOfList?.length} items` : "sin elementos"}
//           </Text>
//         )}
//       />
//     );
//   });
//   return (
//     <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
//       {List}
//     </View>
//   );
// };

// puedo crear listas  (crud)
// estan compuestos de DESEOS Y NECESIDADES (crud
// puedo asignar prioridad [bajo,medio,alto] a mis elementos

// sigueinte etapa es CREAr una SECCION donde mostraralgunnos ITEMS de cada LISTA creada dentro de 1 solo cuadro de (NECESIDADES Y DESEOS)
// poder marcar deseos y necesidades como completados

// una seccion de graficos y estadisticas de avances

// una seccion de notificaciones para avanzar en deseos y necesidades
