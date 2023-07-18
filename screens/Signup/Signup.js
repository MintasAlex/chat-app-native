import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import SignupStyles from "./Signup.style";
import AuthService from "../../services/auth-service";
import { TextInput, Button } from "@react-native-material/core";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await AuthService.signup(username, email, password).then(
        () => {
          alert("Signup successful");
          navigation.navigate("Login", { navigation });
        },
        (error) => {
          alert("Error signing up");
          console.log(error);
        }
      );
    } catch (err) {
      alert("Error signing up");
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={SignupStyles.container}>
        <Button
          style={SignupStyles.backButton}
          onPress={() => navigation.navigate("Login")}
          title="Back"
        />
        <Text style={SignupStyles.title}>Signup</Text>
        <View style={SignupStyles.signupForm}>
          <TextInput
            label="Username"
            variant="outlined"
            value={username}
            onChangeText={(e) => setUsername(e)}
            style={SignupStyles.textInput}
          />
          <TextInput
            label="Email"
            variant="outlined"
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={SignupStyles.textInput}
          />
          <TextInput
            label="Password"
            variant="outlined"
            secureTextEntry={true}
            value={password}
            onChangeText={(e) => setPassword(e)}
            style={SignupStyles.textInput}
          />
          <TextInput
            label="Confirm Password"
            variant="outlined"
            secureTextEntry={true}
            value={password2}
            onChangeText={(e) => setPassword2(e)}
            style={SignupStyles.textInput}
          />
          <Text style={SignupStyles.errorMessage}>{errorMessage}</Text>
          <Button
            title="Signup"
            style={SignupStyles.button}
            onPress={handleSignup}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
