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
