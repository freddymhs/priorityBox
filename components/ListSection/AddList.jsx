import { ref, set } from '@firebase/database';
import { Box, Button, Input, Modal, Select, Text, useTheme } from 'native-base';
import { useState } from "react";
import {
  StyleSheet,
  View,
  Alert
} from "react-native";
import { db } from '../../init-firebase';


export const AddList = ({ mainLists, setMainLists }) => {
  const { AddToListModal,
    components: { simpleButton },
    modalBtnText, modalBtn, modal, modalBody, modalHeader, modalFooter, modalContent } = useTheme();

  const { CloseButton, Content, Body, Header, Footer } = Modal;
  const { Group } = Button;

  const [titleOfList, setTitleOfList] = useState("");
  const [descriptionOfList, setDescriptionOfList] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const createNewList = () => {



    if (mainLists[titleOfList]) {
      Alert.alert('esta lista ya existe',)
      return;
    }
    if (titleOfList.length < 1 || descriptionOfList.length < 1) {
      Alert.alert('No es valido un campo vacio',)
      return;
    }
    const Added = {
      ...mainLists,
      [titleOfList]: { description: descriptionOfList || "", items: [{}] },
    };

    // // CREA LA LISTA
    setMainLists(Added);
    // #sube a firebase
    set(ref(db, "/listas"), Added);



    setTitleOfList("")
    setDescriptionOfList("")

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
          <Header style={modalHeader}>Ingrese nueva Lista</Header>

          <Body style={modalBody}>

            <Input placeholderTextColor="#34656A"
              onChangeText={(e) => {
                setTitleOfList(e);
              }}
              value={titleOfList}
              w="100%" placeholder="Asigne un nombre"
            // _light={{
            //   placeholderTextColor: "blueGray.400"
            // }} _dark={{
            //   placeholderTextColor: "blueGray.50"
            // }}
            />
            <Input placeholderTextColor="#34656A"
              onChangeText={(e) => {
                setDescriptionOfList(e);
              }}
              value={descriptionOfList}
              w="100%" placeholder="describa objetivo de esta lista"
            // _light={{
            //   placeholderTextColor: "blueGray.400"
            // }} _dark={{
            //   placeholderTextColor: "blueGray.50"
            // }}
            />


          </Body>
          <Footer style={modalFooter}>
            <Group space={2}>
              <Button
                style={modalBtn}
                // variant="ghost" colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={modalBtnText}>
                  Cancelar
                </Text>
              </Button>
              <Button
                style={modalBtn}
                onPress={() => {
                  createNewList();
                  setModalVisible(false);
                }}>

                <Text style={modalBtnText}>
                  Guardar
                </Text>
              </Button>
            </Group>
          </Footer>
        </Content>

      </Modal >
      {/* <Box Box alignItems="center" > */}

      <Button style={simpleButton.btn} onPress={() => setModalVisible(true)}>
        <Text style={simpleButton.btn.text}> crear una Lista </Text>
      </Button>
      {/* </Box > */}
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

