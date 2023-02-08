import { ref, set } from '@firebase/database';
import { Box, Button, Input, Modal, Select } from 'native-base';
import { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { db } from '../../init-firebase';


export const AddList = ({ mainLists, setMainLists }) => {
  const { CloseButton, Content, Body, Header, Footer } = Modal;
  const { Group } = Button;
  const { Item } = Select;

  const [titleOfList, setTitleOfList] = useState("");
  const [descriptionOfList, setDescriptionOfList] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const createNewList = () => {
    const Added = {
      ...mainLists,
      [titleOfList]: { description: descriptionOfList || "", items: [{}] },
    };
    // // CREA LA LISTA
    setMainLists(Added);
    // #sube a firebase
    set(ref(db, "/listas"), Added);

  };



  return (

    <>

      <Modal
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Content maxWidth="350">
          <CloseButton />
          <Header>Ingrese nuevo Lista</Header>

          <Body>

            <Input
              onChangeText={(e) => {
                setTitleOfList(e);
              }}
              value={titleOfList}
              w="100%" placeholder="Asigne un nombre" _light={{
                placeholderTextColor: "blueGray.400"
              }} _dark={{
                placeholderTextColor: "blueGray.50"
              }} />
            <Input
              onChangeText={(e) => {
                setDescriptionOfList(e);
              }}
              value={descriptionOfList}
              w="100%" placeholder="describa objetivo de esta lista" _light={{
                placeholderTextColor: "blueGray.400"
              }} _dark={{
                placeholderTextColor: "blueGray.50"
              }} />


          </Body>
          <Footer>
            <Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                Cancel
              </Button>
              <Button onPress={() => {
                createNewList();
                setModalVisible(false);
              }}>
                Save
              </Button>
            </Group>
          </Footer>
        </Content>

      </Modal >
      <Box Box alignItems="center" >
        <Button onPress={() => setModalVisible(true)}>crear una Lista</Button>
      </Box >
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

