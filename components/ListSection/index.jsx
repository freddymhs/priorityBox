
import { onValue, ref, set, update, remove } from "@firebase/database";
import { ScrollView, SectionList } from "native-base";
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
import { ListOfLists } from "./ListOfLists";



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





  return (
    <>

      <View style={{ flex: 9 }}>
        <ListOfLists mainLists={mainLists} handleDelete={handleDelete} />
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}>

        <AddList mainLists={mainLists} setMainLists={setMainLists} />
      </View>
    </>
  );
};