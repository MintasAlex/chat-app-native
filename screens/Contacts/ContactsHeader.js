import { View, Text, TouchableOpacity } from "react-native";
import contactHeaderStyles from "./ContactsHeader.style";
import { Button } from "@react-native-material/core";
import AuthService from "../../services/auth-service";
import { useNavigation } from "@react-navigation/native";

export default function ContactsHeader({ navigation }) {
  const logout = () => {
    AuthService.logout();
    navigation.navigate("Login");
  };

  return (
    <View style={contactHeaderStyles.container}>
      <Text style={contactHeaderStyles.title}>Chats</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
}
