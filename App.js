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
import { StatusBar } from "expo-status-bar";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
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

const styles = StyleSheet.create({
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

  const [modalVisible, setModalVisible] = useState(false);
  const [value, setText] = useState({
    name: "comprar regalos",
    priority: "mid",
  });
  return (
    <View style={styles.mainView}>
      {/*  */}
      {/*  */}
      {/* DESEOS/NECESIDADES */}
      <Box mainLists={mainLists} />
      {/* creacion de listas */}
      <ListForm
        titleOfList={titleOfList}
        setTitleOfList={setTitleOfList}
        createNewList={createNewList}
      />
      {/* listado de listas */}
      <AllLists mainLists={mainLists} addItemToList={addItemToList} />
      <StatusBar style="auto" />
    </View>
  );
}
const Box = ({ mainLists }) => {
  // const mainLists = {
  //   salud: {
  //     description: "mi salud",
  //     items: [
  //       {
  //         name: "nutricionista",
  //         priority: "alto",
  //         type: "deseo",
  //       },
  //       {
  //         name: "ir al oculista",
  //         priority: "bajo",
  //         type: "necesidad",
  //       },
  //       {
  //         name: "gym",
  //         priority: "mid",
  //         type: "deseo",
  //       },
  //     ],
  //   },
  //   mama: {
  //     description: "listado de cosas de mama",
  //     items: [
  //       {
  //         name: "comprar regalos",
  //         priority: "mid",
  //         type: "deseo",
  //       },
  //       {
  //         name: "oculista",
  //         priority: "alto",
  //         type: "deseo",
  //       },
  //     ],
  //   },
  //   casa: {
  //     description: "listado de cosas de casa",
  //     items: [
  //       {
  //         name: "fix cocina",
  //         priority: "mid",
  //         type: "necesidad",
  //       },
  //       {
  //         name: "fix casa boby",
  //         priority: "alto",
  //         type: "necesidad",
  //       },
  //     ],
  //   },
  // };
  // tendre muchas listas
  // como sabre cual es necesidad o deseo? poreq al agregarlo se asigna
  // como sabre su proridad ? se asigna autoamticamente bajo

  // vamos a mostrar maximo 40 items por area y si sobran se puede dar en VER MAS apra ocupar toda la screen de 1 cat

  // primero organizemos las listas por prioridad
  // luego vamos rellenando cada  cuadros hasta su tope de 40
  const keysInList = Object.keys(mainLists);

  const formattedItemsFromLists = keysInList.reduce(
    (accum, key) => {
      const list = mainLists[key];
      // const hightPriorityList = list.priority === "alto";
      // const lowPriorityList = list.priority === "bajo";
      list.items?.filter((item) => {
        const important = item.type === "necesidad" && item.priority === "alto";
        const midImportant =
          item.type === "necesidad" && item.priority === "bajo";
        const lowImprtant = item.type === "deseo" && item.priority === "alto";
        const noImportant = item.type === "deseo" && item.priority === "bajo";
        if (important) {
          accum[0].push(item);
        }
        if (midImportant) {
          accum[1].push(item);
        }
        if (lowImprtant) {
          accum[2].push(item);
        }
        if (noImportant) {
          accum[3].push(item);
        }
      });

      return accum;
    },
    [[], [], [], []]
  );

  return (
    <View style={{ flex: 2, flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
          // flexDirection: "column",
          borderWidth: 1,
          borderBottomColor: "black",
          alignItems: "center",
        }}
      >
        {/* <Text>Necesidada</Text> */}
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            borderWidth: 1,
            borderBottomColor: "black",
            alignItems: "center",
            alignContent: "center",
            // width: "50%",
            flexDirection: "row", //que sea column cuando sean muchos ITEMS
          }}
        >
          {formattedItemsFromLists[0].map((items) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 5,
                    height: 40,
                    padding: 10,
                    margin: 1,
                  }}
                  onPress={() => alert("Botón pulsado")}
                >
                  <Text style={{ color: "white" }}>{items.name}</Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>

        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            borderWidth: 1,
            borderBottomColor: "black",
            alignItems: "center",
            alignContent: "center",
            // width: "50%",
            flexDirection: "row", //que sea column cuando sean muchos ITEMS
          }}
        >
          {formattedItemsFromLists[1].map((items) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 5,
                    height: 40,
                    padding: 10,
                    margin: 1,
                  }}
                  onPress={() => alert("Botón pulsado")}
                >
                  <Text style={{ color: "white" }}>{items.name}</Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // flexDirection: "column",
          borderWidth: 1,
          borderBottomColor: "black",
          alignItems: "center",
        }}
      >
        <Text>Deseo</Text>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            borderWidth: 1,
            borderBottomColor: "black",
            alignItems: "center",
            alignContent: "center",
            // width: "50%",
            flexDirection: "row", //que sea column cuando sean muchos ITEMS
          }}
        >
          {formattedItemsFromLists[2].map((items) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 5,
                    height: 40,
                    padding: 10,
                    margin: 1,
                  }}
                  onPress={() => alert("Botón pulsado")}
                >
                  <Text style={{ color: "white" }}>{items.name}</Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            borderWidth: 1,
            borderBottomColor: "black",
            alignItems: "center",
            alignContent: "center",
            // width: "50%",
            flexDirection: "row", //que sea column cuando sean muchos ITEMS
          }}
        >
          {formattedItemsFromLists[3].map((items) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 5,
                    height: 40,
                    padding: 10,
                    margin: 1,
                  }}
                  onPress={() => alert("Botón pulsado")}
                >
                  <Text style={{ color: "white" }}>{items.name}</Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
};
const ListForm = ({ titleOfList, setTitleOfList, createNewList }) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="ingresa algun titulo para la nueva lista"
          onChangeText={(e) => setTitleOfList(e)}
          value={titleOfList}
        />
        <Button
          onPress={() => {
            createNewList();
          }}
          title="crear"
          color="#841584"
          accessibilityLabel="presiona para crear una nueva lista"
        />
      </View>
    </>
  );
};
const AllLists = ({ mainLists, addItemToList }) => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "comprar regalos",
    priority: "mid",
  });
  const titlesInList = Object.keys(mainLists);

  const List = titlesInList.map((t) => {
    const oneList = mainLists?.[t];
    const itemsOfList = oneList?.items;
    return (
      <FlatList
        key={oneList?.description}
        style={{
          borderWidth: 1,
          borderColor: "black",
          width: 100,
        }}
        data={itemsOfList}
        renderItem={({ item }) => <Text title={item?.name}>{item?.name}</Text>}
        ListHeaderComponent={() => (
          <>
            <AddItem title={t} mainLists={mainLists} />
          </>
        )}
        ListFooterComponent={(item) => (
          <Text>
            {itemsOfList ? `${itemsOfList?.length} items` : "sin elementos"}
          </Text>
        )}
      />
    );
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
      {List}
    </View>
  );
};

// puedo crear listas  (crud)
// estan compuestos de DESEOS Y NECESIDADES (crud
// puedo asignar prioridad [bajo,medio,alto] a mis elementos

// sigueinte etapa es CREAr una SECCION donde mostraralgunnos ITEMS de cada LISTA creada dentro de 1 solo cuadro de (NECESIDADES Y DESEOS)
// poder marcar deseos y necesidades como completados

// una seccion de graficos y estadisticas de avances

// una seccion de notificaciones para avanzar en deseos y necesidades
