import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import ConversationHeader from "./ConversationHeader";
import Message from "./Message";
import ConversationStyles from "./Conversation.style";
import MessageService from "../../services/message-service";
import ConversationService from "../../services/conversation-service";
import { TextInput } from "@react-native-material/core";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";
import AuthService from "../../services/auth-service";
import authHeader from "../../services/auth-header";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export default function Conversation({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  let stompClient = null;

  const { conversationId } = route.params;

  const messagesScrollView = useRef(null);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: "#690069", //make slightly darker when pressed
    onPress: () => {},
  };

  const handleSendMessage = async () => {
    try {
      const message = await MessageService.postMessage(
        conversationId,
        user.id,
        inputMessage
      );
    } catch (err) {
      console.log(err);
    }

    // stompClient.send(
    //   "/app/chat/" + conversationId,
    //   {},
    //   JSON.stringify({
    //     conversationId: conversationId,
    //     senderId: user.id,
    //     content: inputMessage,
    //   })
    // );
  };

  const connectToSocket = async () => {
    const header = await authHeader();
    let socket = new SockJS("http://192.168.1.150:8080" + "/chat/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect(header, () => {
      stompClient.subscribe("/topic/messages" + conversationId, (response) => {
        // let data = JSON.parse(response.body);
        // setMessages([...messages, data]);
        fetchMessages();
      });
    });
  };

  const fetchMessages = async () => {
    try {
      const messages = await MessageService.getMessagesByConversationId(
        conversationId
      );
      setMessages(messages.data);
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    messagesScrollView.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setUser(user);
        const conversation = await ConversationService.getConversationById(
          conversationId
        );
        setConversation(conversation.data);

        fetchMessages();

        // const messages = await MessageService.getMessagesByConversationId(
        //   conversationId
        // );
        // setMessages(messages.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();

    connectToSocket();

    scrollToBottom();

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <SafeAreaView>
      <ConversationHeader
        navigation={navigation}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
      />
      {loading ? (
        <Text style={ConversationStyles.loading}>Loading...</Text>
      ) : (
        <View style={ConversationStyles.container}>
          <ScrollView ref={messagesScrollView}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </ScrollView>
        </View>
      )}
      <View style={ConversationStyles.inputContainer}>
        <TextInput
          style={ConversationStyles.textInput}
          variant="outlined"
          placeholder="Write a message..."
          value={inputMessage}
          onChangeText={(e) => setInputMessage(e)}
        ></TextInput>
        <TouchableHighlight
          {...touchProps}
          onPress={handleSendMessage}
          style={ConversationStyles.btnSend}
        >
          <View>
            <Ionicons name="send" size={24} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}
