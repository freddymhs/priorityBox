import { onValue, ref, set } from "firebase/database";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  CloseIcon,
  HStack,
  IconButton,
  Input,
  Modal,
  Select,
  useTheme,
  VStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Alert,
} from "react-native";
import { db } from "../../init-firebase";
import { useToast } from "native-base";
export const AddItem = () => {
  const { CloseButton, Content, Body, Header, Footer } = Modal;
  const { Group } = Button;
  const { Item } = Select;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [mainLists, setMainLists] = useState(null);
  const [text, onChangeText] = useState({
    name: "",
    priority: "bajo",
    type: "deseo",
  });
  const toast = useToast();
  const { AddToListModal,
    components: { simpleButton },
    modalBtnText, modalBtn, modal, modalBody, modalHeader, modalFooter, modalContent } = useTheme();

  const addItemInList = () => {
    if (selectedList === null || text?.name?.length < 1 || text?.name === null) {

      Alert.alert("No es valido un campo vacio");
      return;
    }

    const newPosition = mainLists[selectedList]?.items?.length || 0;
    set(ref(db, `/listas/${selectedList}/items/${newPosition}`), text);
    toast.show({
      description: "TAREA AGREGADA",
      placement: "top",
    });

    // setSelectedList(null); // no cambia el valor en el select

    onChangeText((prev) => {
      return {
        ...prev,
        name: null,
        // priority: "bajo",
        // type: "deseo",
      }
    });
  };
  const [listNames, setListNames] = React.useState([]);

  useEffect(() => {
    const refRealTimeDatabase = ref(db, "/listas");
    function getDataFromFirebase() {
      try {
        onValue(refRealTimeDatabase, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMainLists(data);
            setListNames(Object.keys(data));
          }
        });
      } catch (err) {
        console.log("no pude obtener la data desde firebase realtime");
      }
    }
    getDataFromFirebase();
  }, []);

  return (
    <View style={AddToListModal}>
      <Modal
        style={modal}
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Content style={modalContent}>
          <CloseButton />
          <Header style={modalHeader}>Nuevo Item</Header>
          <Body style={modalBody}>

            <Input
              placeholderTextColor="#34656A"
              onChangeText={(e) => {
                onChangeText((prev) => {
                  return { ...prev, name: e };
                });
              }}
              value={text.name}
              placeholder="Asigne un nombre"
            />
            <Select
              placeholderTextColor="#34656A"
              selectedValue={selectedList}
              defaultValue={selectedList}
              onValueChange={(itemValue) => setSelectedList(itemValue)}
              placeholder="A que lista agregar este item?"
              _selectedItem={{ bg: "cyan.600" }}

            >
              {listNames?.map((name, i) => {
                return <Item label={name} value={name} key={i} />;
              })}
            </Select>



            <Select
              style={modalBody.select}
              selectedValue={text.type}
              minWidth={200}
              placeholder="Deseo o prioridad?"
              onValueChange={(itemValue) =>
                onChangeText((prev) => ({ ...prev, type: itemValue }))
              }



            >
              <Select.Item label="necesidad" value="necesidad" />
              <Select.Item label="deseo" value="deseo" />
            </Select>
            <Select

              selectedValue={text.priority}
              minWidth={200}
              placeholder="Nivel de relevancia "
              onValueChange={(itemValue) =>
                onChangeText((prev) => ({ ...prev, priority: itemValue }))
              }
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              <Select.Item label="Muy Importante" value="alto" />
              <Select.Item label="Poco Importante" value="bajo" />
            </Select>
          </Body>
          <Footer style={modalFooter}>
            <Group space={2}>
              <Button
                style={modalBtn}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={modalBtnText}>
                  Cancelar
                </Text>

              </Button>
              <Button
                style={modalBtn}
                onPress={() => {
                  addItemInList();
                  setModalVisible(false);
                }}
              >
                <Text style={modalBtnText}>
                  Guardar
                </Text>

              </Button>
            </Group>
          </Footer>
        </Content>
      </Modal>

      <Button style={simpleButton.btn} onPress={() => setModalVisible(true)}>
        <Text style={simpleButton.btn.text}> Agregar a la lista</Text>
      </Button>
    </View >
  );
};
