import { StyleSheet } from "react-native";

const contactElemetStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 5,
    backgroundColor: "gray",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageContainer: {
    width: "90%",
  },
  message: {
    fontSize: 15,
    color: "gray",
  },
});

export default contactElemetStyles;
