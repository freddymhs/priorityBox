import { SectionList, useTheme } from "native-base";
import { useState } from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const BoxSection = ({ mainLists }) => {
  const screenWidth = Dimensions.get("window").width;
  // items
  const styles = StyleSheet.create({
    itemContainer: {

      margin: 2,
      borderWidth: 0.9,
      borderRadius: 8,
      padding: 7,
    },
    itemText: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
      minWidth: screenWidth / 3,

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

  const {
    components: { boxArea },
  } = useTheme();
  return (
    <View style={boxArea}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          borderRightWidth: 0.3, /// alto
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 8,
            // borderBottomWidth: 1, // title

          }}
        >
          <Text
            style={{

              fontWeight: '600'
            }}
          >DESEO</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5, // ancho
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 2,
            borderColor: "black",
          }}
        >
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[2],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 2,
            // borderRightWidth: 1,
            // borderTopWidth: 1,
            // borderRadius: 8
          }}
        >
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[3],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 8,
            // borderBottomWidth: 1, //title
          }}
        >
          <Text
            style={{

              fontWeight: '600'
            }}
          >NECESIDAD</Text>
        </View>

        <View
          style={{
            borderBottomWidth: 0.5, // ancho
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 2,
            // borderLeftWidth: 1,
            // borderBottompWidth: 1,
            // borderRadius: 8
          }}
        >
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[0],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 2,
            // borderLeftWidth: 1,
            // borderTopWidth: 1,
            // borderRadius: 8
          }}
        >
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[1],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};
