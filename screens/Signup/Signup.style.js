import { StyleSheet } from "react-native";

const signupStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 40,
    color: "#3700B3",
    fontWeight: "bold",
    marginBottom: 20,
  },
  signupForm: {
    width: "80%",
  },
  textInput: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 30,
  },
});

export default signupStyles;
