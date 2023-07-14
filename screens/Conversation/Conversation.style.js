import { StyleSheet } from "react-native";

const conversationStyles = StyleSheet.create({
  loading: {
    marginTop: "50%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  container: {
    height: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "10%",
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  textInput: {
    width: "80%",
  },
  btnSend: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    borderRadius: 10,
  },

});

export default conversationStyles;
