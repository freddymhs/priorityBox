import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { db } from '../init-firebase';


export const AddItem = ({ title, mainLists }) => {
  const [modalVisible, setModalVisible] = useState(false);


  const [text, onChangeText] = useState({
    name: "comprar regalos",
    priority: "mid",
    type: "deseo"
  });


  const addItemInList = () => {
    const newPosition = mainLists[title]?.items?.length || 0;
    set(ref(db, `/listas/${title}/items/${newPosition}`), text);

  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <TextInput
              placeholder={text.name}
              style={styles.input}
              onChangeText={(e) => {
                onChangeText((prev) => {
                  return { ...prev, name: e };
                });
              }}
              value={text.name}
            />
            <TextInput
              placeholder={text.priority}
              style={styles.input}
              onChangeText={(e) => {
                onChangeText((prev) => {
                  return { ...prev, priority: e };
                });
              }}
              value={text.priority}
              keyboardType="numeric"
            />
            <TextInput
              placeholder={text.type}
              style={styles.input}
              onChangeText={(e) => {
                onChangeText((prev) => {
                  return { ...prev, type: e };
                });
              }}
              value={text.type}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addItemInList}>
              <Text style={styles.textStyle}>agregar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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

