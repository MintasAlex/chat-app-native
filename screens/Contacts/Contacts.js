import { View, Text, SafeAreaView, ScrollView } from "react-native";
import AuthService from "../../services/auth-service";
import { useEffect, useState } from "react";
import { Button } from "@react-native-material/core";
import ContactsHeader from "./ContactsHeader";
import ContactElement from "./ContactElement";
import { useNavigation } from "@react-navigation/native";
import ContactsService from "../../services/contacts-service";
import ContactStyles from "./Contacts.style";
import ConversationService from "../../services/conversation-service";
import ParticipantService from "../../services/participant-service";

export default function Contacts({ navigation }) {
  const [loading, setLoading] = useState(true);
  // const [contacts, setContacts] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setUser(user);
        return user;
      } catch (err) {
        console.log(err);
        navigation.navigate("Login");
      }
    };

    const getConversations = async (participants) => {
      setConversations([]); // clear conversations
      for (const participant of participants) {
        if (participant.isRemoved) continue; // skip removed participants
        try {
          const conversation = await ConversationService.getConversationById(
            participant.conversationId
          );
          setConversations((conversations) => [
            ...conversations,
            conversation.data,
          ]);
        } catch (err) {
          console.log(err);
        }
      }
    };

    const fetchData = async () => {
      const user = await getUser();

      try {
        const participants = await ParticipantService.getParticipantsByUserId(
          user.id
        );
        setParticipants(participants.data);
        await getConversations(participants.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ContactsHeader navigation={navigation} />
      {loading ? (
        <Text style={ContactStyles.loading}>Loading...</Text>
      ) : (
        <ScrollView>
          {conversations.map((conversation) => (
            <ContactElement
              key={conversation.id}
              navigation={navigation}
              conversation={conversation}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
