
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const BoxSection = ({ mainLists }) => {
  const screenWidth = Dimensions.get('window').width;
  const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#e0e0e0',
      padding: 4,
      margin: 5,
      borderRadius: 20,
    },
    itemText: {
      fontSize: 10,
      color: 'black',
      textAlign: 'center',
      width: screenWidth / 6,
    },
  });
  const keysInList = mainLists && Object.keys(mainLists);

  const formattedItemsFromLists = keysInList?.reduce(
    (accum, key) => {
      const list = mainLists[key];

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
    <View style={{ flex: 6, flexDirection: 'column' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: screenWidth / 2, borderColor: 'black', borderWidth: 1 }}>
          <Text>Esquina superior izquierda</Text>
          <ScrollView>

            <FlatList
              data={formattedItemsFromLists?.[0]}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />

          </ScrollView>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: screenWidth / 2, borderColor: 'black', borderWidth: 1 }}>
          <Text>Esquina superior derecha</Text>
          <ScrollView>

            <FlatList
              data={formattedItemsFromLists?.[1]}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />

          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: screenWidth / 2, borderColor: 'black', borderWidth: 1 }}>
          <Text>Esquina inferior izquierda</Text>
          <ScrollView>
            <FlatList
              data={formattedItemsFromLists?.[2]}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </ScrollView>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: screenWidth / 2, borderColor: 'black', borderWidth: 1 }}>
          <Text>Esquina inferior derecha</Text>
          <ScrollView>
            <FlatList
              data={formattedItemsFromLists?.[3]}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </ScrollView>
        </View>
      </View>
    </View>
    // <View style={{ flex: 2, flexDirection: "row" }}>

    //   <View
    //     style={{
    //       flex: 1,
    //       // flexDirection: "column",
    //       borderWidth: 1,
    //       borderBottomColor: "black",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text>Necesidad</Text>
    //     <View
    //       style={{
    //         flex: 1,
    //         flexWrap: "wrap",
    //         borderWidth: 1,
    //         borderBottomColor: "black",
    //         alignItems: "center",
    //         alignContent: "center",
    //         // width: "50%",
    //         flexDirection: "row", //que sea column cuando sean muchos ITEMS
    //       }}
    //     >
    //       {formattedItemsFromLists?.[0]?.map((items) => {
    //         return (
    //           <>
    //             <TouchableOpacity
    //               style={{
    //                 backgroundColor: "grey",
    //                 borderRadius: 5,
    //                 height: 40,
    //                 padding: 10,
    //                 margin: 1,
    //               }}
    //               onPress={() => alert("Botón pulsado")}
    //             >
    //               <Text style={{ color: "white" }}>{items.name}</Text>
    //             </TouchableOpacity>
    //           </>
    //         );
    //       })}
    //     </View>

    //     <View
    //       style={{
    //         flex: 1,
    //         flexWrap: "wrap",
    //         borderWidth: 1,
    //         borderBottomColor: "black",
    //         alignItems: "center",
    //         alignContent: "center",
    //         // width: "50%",
    //         flexDirection: "row", //que sea column cuando sean muchos ITEMS
    //       }}
    //     >
    //       {formattedItemsFromLists?.[1]?.map((items) => {
    //         return (
    //           <>
    //             <TouchableOpacity
    //               style={{
    //                 backgroundColor: "grey",
    //                 borderRadius: 5,
    //                 height: 40,
    //                 padding: 10,
    //                 margin: 1,
    //               }}
    //               onPress={() => alert("Botón pulsado")}
    //             >
    //               <Text style={{ color: "white" }}>{items.name}</Text>
    //             </TouchableOpacity>
    //           </>
    //         );
    //       })}
    //     </View>
    //   </View>
    //   <View
    //     style={{
    //       flex: 1,
    //       // flexDirection: "column",
    //       borderWidth: 1,
    //       borderBottomColor: "black",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text>Deseo</Text>
    //     <View
    //       style={{
    //         flex: 1,
    //         flexWrap: "wrap",
    //         borderWidth: 1,
    //         borderBottomColor: "black",
    //         alignItems: "center",
    //         alignContent: "center",
    //         // width: "50%",
    //         flexDirection: "row", //que sea column cuando sean muchos ITEMS
    //       }}
    //     >

    //       {formattedItemsFromLists?.[2]?.map((items) => {
    //         return (
    //           <>
    //             <TouchableOpacity
    //               style={{
    //                 backgroundColor: "grey",
    //                 borderRadius: 5,
    //                 height: 40,
    //                 padding: 10,
    //                 margin: 1,
    //               }}
    //               onPress={() => alert("Botón pulsado")}
    //             >
    //               <Text style={{ color: "white" }}>{items.name}</Text>
    //             </TouchableOpacity>
    //           </>
    //         );
    //       })}
    //     </View>
    //     <View
    //       style={{
    //         flex: 1,
    //         flexWrap: "wrap",
    //         borderWidth: 1,
    //         borderBottomColor: "black",
    //         alignItems: "center",
    //         alignContent: "center",
    //         // width: "50%",
    //         flexDirection: "row", //que sea column cuando sean muchos ITEMS
    //       }}
    //     >
    //       {formattedItemsFromLists?.[3]?.map((items) => {
    //         return (
    //           <>
    //             <TouchableOpacity
    //               style={{
    //                 backgroundColor: "grey",
    //                 borderRadius: 5,
    //                 height: 40,
    //                 padding: 10,
    //                 margin: 1,
    //               }}
    //               onPress={() => alert("Botón pulsado")}
    //             >
    //               <Text style={{ color: "white" }}>{items.name}</Text>
    //             </TouchableOpacity>
    //           </>
    //         );
    //       })}
    //     </View>
    //   </View>
    // </View>
  );
};