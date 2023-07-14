import { View, Text, SafeAreaView } from "react-native";
import { Button } from "@react-native-material/core";
import { TextInput, IconButton } from "@react-native-material/core";
import loginStyles from "./Login.style";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth-service";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    AuthService.logout();
    try {
      await AuthService.login(username, password).then(
        () => {
          navigation.navigate("Contacts", { navigation });
        },
        (error) => {
          alert("Error logging in1");
          console.log(error);
        }
      );
    } catch (err) {
      alert("Error logging in2");
      console.log(err);
    }
  };

  const getCurrentUser = async (e) => {
    try {
      const user = await AuthService.getCurrentUser();
      if (user) {
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      navigation.navigate("Contacts");
    }

  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Login</Text>
        <View style={loginStyles.loginForm}>
          <TextInput
            label="Username"
            variant="outlined"
            value={username}
            onChangeText={(e) => setUsername(e)}
            style={loginStyles.textInput}
          />
          <TextInput
            label="Password"
            variant="outlined"
            secureTextEntry={true}
            value={password}
            onChangeText={(e) => setPassword(e)}
            style={loginStyles.textInput}
          />
        </View>
        <Button
          title="Login"
          style={loginStyles.button}
          onPress={handleLogin}
        />
        {/* <Button
          title="Get User"
          style={loginStyles.button}
          onPress={getCurrentUser}
        /> */}
      </View>
    </SafeAreaView>
  );
}
