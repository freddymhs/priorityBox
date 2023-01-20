import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export const AddList = ({ titleOfList, setTitleOfList, createNewList }) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="ingresa algun titulo para la nueva lista"
          onChangeText={(e) => setTitleOfList(e)}
          value={titleOfList}
        />
        <Button
          onPress={() => {
            createNewList();
          }}
          title="crear"
          color="#841584"
          accessibilityLabel="presiona para crear una nueva lista"
        />
      </View>

    </>
  );
};