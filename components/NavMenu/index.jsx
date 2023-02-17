import * as React from "react";
import { Button, Linking } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeSection from "../HomeSection/index";
import ListSection from "../ListSection/index";
import { Center, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
function NotificationsScreen({ navigation }) {
  return (
    <>
      <Center style={{ flex: 1, backgroundColor: "#62EFFF" }}>
        <Center style={{ flex: 1, margin: 67 }}>
          <Text>Idea para esta pantalla:</Text>
          <Text>
            esto podria ser una pantalla de registro de interacciones o acciones
            en uso grupal
          </Text>
        </Center>

        <Center style={{ flex: 1 }}>
          <Button
            onPress={() => navigation.goBack()}
            title="REGRESAR AL ORGANIZADOR"
          />
        </Center>

        <Center style={{ flex: 1 }}>
          <Text
            onPress={() => {
              Linking.openURL("https://github.com/freddymhs");
            }}
          >
            mas proyectos personales presinando aca !
          </Text>
        </Center>
      </Center>
    </>
  );
}

const Drawer = createDrawerNavigator();

// function ExampleUseTheme() {
//   const { colors } = useTheme();
//   const { primary, secondary } = colors;
//   const [isPressed, setIsPressed] = useState(false);

//   const handlePress = () => {
//     setIsPressed(!isPressed);
//   };
//   return (
//     <Center flex={1} p="3">
//       <Button
//         onPress={handlePress}
//         bg={isPressed ? primary : secondary}
//         _text={{ color: "white" }}
//       >
//         {isPressed ? "Pressed!" : "Press me!"}
//       </Button>
//     </Center>
//   );
// }

export function NavMenu() {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="ORGANIZADOR"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#52B1BC",
          },
        }}
      >
        <Drawer.Screen
          name="ORGANIZADOR"
          component={HomeSection}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="LISTAS"
          component={ListSection}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="NOTIFICACIONES"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </>
  );
}
