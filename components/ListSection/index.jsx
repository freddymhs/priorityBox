
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
import { AddItem } from "../AddItem";

export const ListSection = ({ mainLists }) => {
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