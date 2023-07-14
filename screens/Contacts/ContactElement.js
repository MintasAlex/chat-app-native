import { View, Text, SafeAreaView, TouchableHighlight } from "react-native";
import AuthService from "../../services/auth-service";
import { useEffect } from "react";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import contactElemetStyles from "./ContactElement.styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import MessageService from "../../services/message-service";
import ParticipantService from "../../services/participant-service";
import UserService from "../../services/user-service";

export default function ContactElement({ navigation, conversation }) {
  const [name, setName] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  var touchProps = {
    activeOpacity: 1,
    underlayColor: "lightgray", // <-- "backgroundColor" will be always overwritten by "underlayColor"
    onPress: () => {}, // <-- "onPress" is apparently required
  };

  const getContactName = async () => {
    const user = await AuthService.getCurrentUser();

    try {
      const participants =
        await ParticipantService.getParticipantsByConversationId(
          conversation.id
        );
      if (participants.data.length === 2) {
        if (
          participants.data[0].userId === user.id &&
          participants.data[1].userId === user.id
        ) {
          setName("Me");
        } else {
          const otherParticipant = participants.data.find(
            (participant) => participant.userId !== user.id
          );
          const otherParticipantUsername = await UserService.getUsernameById(
            otherParticipant.userId
          );
          setName(otherParticipantUsername.data);
        }
      } else {
        setName(conversation.title);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLastMessage = async () => {
    const messages = await MessageService.getMessagesByConversationId(
      conversation.id
    );
    const conversationLength = messages.data.length;
    if (conversationLength > 0) {
      const lastMessage = messages.data[conversationLength - 1].content;
      setLastMessage(lastMessage);
    } else {
      setLastMessage("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getContactName();
      await getLastMessage();
    };

    fetchData();
  }, []);

  const handlePress = () => {
    navigation.navigate("Conversation", { conversationId: conversation.id });
  };

  return (
    <TouchableHighlight {...touchProps} onPress={handlePress}>
      <View style={contactElemetStyles.container}>
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <Icon name="account" style={contactElemetStyles.icon} size={40} />
        </IconComponentProvider>
        <View style={contactElemetStyles.contentContainer}>
          <Text style={contactElemetStyles.name}>{name}</Text>
          <View style={contactElemetStyles.messageContainer}>
            <Text style={contactElemetStyles.message} numberOfLines={1}>{lastMessage}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
