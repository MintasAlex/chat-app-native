import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login/Login";
import Contacts from "./screens/Contacts/Contacts";
import Conversation from "./screens/Conversation/Conversation";
import Signup from "./screens/Signup/Signup";1

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
