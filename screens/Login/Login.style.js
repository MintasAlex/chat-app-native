import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
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
  loginForm: {
    width: "80%",
  },
  textInput: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default loginStyles;
