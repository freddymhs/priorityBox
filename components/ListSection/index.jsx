
import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../init-firebase";
import { AddItem } from "../Home/AddItem";



export default ListSection = () => {
  const [mainLists, setMainLists] = useState({});
  const refRealTimeDatabase = ref(db, "/listas");
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