import { StyleSheet } from "react-native";

const conversationHeaderStyles = StyleSheet.create({
    container: {
        paddingTop: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#3700B3",
        height: 80,
    },
    backButton: {
        position: "absolute",
        left: 20,
        bottom: 10,
    },
    title: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
});

export default conversationHeaderStyles;