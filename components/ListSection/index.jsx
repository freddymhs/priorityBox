
import { onValue, ref, set, update, remove } from "@firebase/database";
import { SectionList } from "native-base";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db, listRef } from "../../init-firebase";
import { AddItem } from "../HomeSection/AddItem";
import { AddList } from './AddList';
import { List, ListItem, Icon } from 'native-base';



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


  const handleDelete = ({ t: titleList, item: { name: itemName }
  }) => {

    const allItems = mainLists[titleList].items;
    const newItems = allItems.filter(({ name }) => name !== itemName)

    const newItemsObject = {};
    newItems.forEach((item, i) => {
      newItemsObject[i] = item;
    });
    Alert.alert(
      'Confirmar borrado',
      `¿Estás seguro de que deseas borrar ?`,
      [
        {
          text: 'Sí',
          onPress: () => {
            set(ref(db, `/listas/${titleList}/items`), newItemsObject);
          }
        },
        {
          text: 'No',
          onPress: () => console.log('No se borró el elemento'),
        },
      ],
      { cancelable: false },
    );
  };


  const titlesInList = Object.keys(mainLists);

  const List = titlesInList.map((t) => {
    const oneList = mainLists?.[t];
    const itemsOfList = oneList?.items;

    return (
      <FlatList
        key={oneList?.description}
        // horizontal
        style={{
          borderWidth: 1,
          borderColor: "black",
          height: 100,
        }}
        data={itemsOfList}
        renderItem={({ item }) =>
          // <Text
          //   style={{
          //     borderWidth: 1,
          //     borderColor: 'black',
          //     margin: 2,
          //     display: 'flex',

          //   }}
          //   title={item?.name}>{item?.name}</Text>
          <View style={{
            flex: 1,
            flexDirection: "column",
            alignItems: 'center',
          }}>
            <TouchableOpacity
              onPress={(e) => {

                handleDelete({ item, t })
              }}
            >
              <Text

                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  margin: 2,
                  // display: 'flex',

                }}
                title={item?.name}>{item?.name}</Text>
            </TouchableOpacity>

          </View>

        }
        ListHeaderComponent={() => (
          <>

            <Text>{t}</Text>
            <Text>
              {itemsOfList ? `${itemsOfList?.length} items` : "sin elementos"}
            </Text>
          </>

        )}
      />


    );
  });
  // style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
  return (
    <>
      <View>
        {List}
      </View>
      <AddList mainLists={mainLists} setMainLists={setMainLists} />
    </>
  );
};