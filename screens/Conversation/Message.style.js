import { StyleSheet } from "react-native";

const MessageStyles = StyleSheet.create({
  message: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
  messageDate: {
    fontSize: 12,
    // color: "#8c8c8c",
    opacity: 0.7,
    alignSelf: "flex-end",
  },
  messageSelf: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    backgroundColor: "#007aff",
    maxWidth: "80%",
  },
  messageTextSelf: {
    fontSize: 16,
    color: "white",
    alignSelf: "flex-end",
  },
  messageDateSelf: {
    fontSize: 12,
    alignSelf: "flex-end",
    color: "white",
    opacity: 0.7,
  },
});

export default MessageStyles;
