import { StyleSheet } from "react-native";

const contactHeaderStyles = StyleSheet.create({
    container: {
        paddingTop: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#3700B3",
        height: 80,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default contactHeaderStyles;