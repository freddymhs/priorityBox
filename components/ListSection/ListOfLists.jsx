import { Text, View } from "native-base";
import { FlatList, TouchableOpacity } from "react-native";

export const ListOfLists = ({ mainLists, handleDelete }) => {
  const titlesInList = Object.keys(mainLists);

  return (
    <FlatList
      data={titlesInList}
      renderItem={({ item: t }) => {
        const oneList = mainLists[t];
        const itemsOfList = oneList?.items;

        return (
          <View style={{ borderTopWidth: 0.7, borderColor: "black" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ alignSelf: "flex-start" }}>{t}</Text>
              <Text style={{ alignSelf: "flex-end" }}> ({itemsOfList?.length ? `${itemsOfList.length} items` : "sin elementos"})</Text>
            </View>
            <FlatList
              data={itemsOfList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleDelete({ item, t })}
                  style={{
                    alignItems: "flex-start",
                    paddingTop: 3
                  }}
                >
                  <Text
                    style={{ marginLeft: 21 }}
                  >
                    -   {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, i) => i}
            />
          </View>
        );
      }}
      keyExtractor={(item) => item}
    />
  );
};
