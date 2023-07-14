import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import conversationHeaderStyles from "./ConversationHeader.styles";


export default function ConversationHeader({ navigation }) {
  return (
    <View style={conversationHeaderStyles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Contacts")}
          style={conversationHeaderStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={conversationHeaderStyles.title}>Conversation</Text>
    </View>
  );
}