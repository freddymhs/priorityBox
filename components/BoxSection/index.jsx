
import { useState } from "react";
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
  const keysInList = mainLists && Object.keys(mainLists);

  const formattedItemsFromLists = keysInList?.reduce(
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
        <Text>Necesidad</Text>
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
          {formattedItemsFromLists?.[0]?.map((items) => {
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
          {formattedItemsFromLists?.[1]?.map((items) => {
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

          {formattedItemsFromLists?.[2]?.map((items) => {
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
          {formattedItemsFromLists?.[3]?.map((items) => {
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