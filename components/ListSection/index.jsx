
import { onValue, ref } from "@firebase/database";
import { SectionList } from "native-base";
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
          data && setMainLists(data);
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
        horizontal
        style={{
          borderWidth: 1,
          borderColor: "black",
          height: 100,
        }}
        data={itemsOfList}
        renderItem={({ item }) => <Text
          style={{
            // borderWidth: 1, borderColor: 'black',
            margin: 2
          }}
          title={item?.name}>{item?.name}</Text>}
        ListHeaderComponent={() => (
          <>

            <Text>{t}</Text>
            <Text>
              {itemsOfList ? `${itemsOfList?.length} items` : "sin elementos"}
            </Text>
          </>

        )}
      // ListFooterComponent={(item) => (
      //   <Text>
      //     {itemsOfList ? `${itemsOfList?.length} items` : "sin elementos"}
      //   </Text>
      // )}
      />


    );
  });
  return (
    <View
    // style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
    >
      {List}
    </View>
  );
};