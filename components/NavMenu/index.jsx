import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeSection from '../HomeSection/index';
import ListSection from '../ListSection/index';
import { NativeBaseProvider } from 'native-base';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function ExampleUseTheme() {
  const { colors } = useTheme();
  const { primary, secondary } = colors;
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  return (
    <Center flex={1} p="3">
      <Button
        onPress={handlePress}
        bg={isPressed ? primary : secondary}
        _text={{ color: "white" }}
      >
        {isPressed ? "Pressed!" : "Press me!"}
      </Button>
    </Center>
  );
}

export function NavMenu() {
  return (

    <Drawer.Navigator initialRouteName="HomeSection">
      <Drawer.Screen name="HomeSection" component={HomeSection} />
      <Drawer.Screen name="ListSection" component={ListSection} />
    </Drawer.Navigator>

  );
}