import React, { useEffect } from "react";
import { View, Text } from "react-native";
import MessageStyles from "./Message.style";
import AuthService from "../../services/auth-service";
import { useState } from "react";

export default function Message({ message }) {
  const [isFromSelf, setIsFromSelf] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await AuthService.getCurrentUser();

      if (user.id === message.senderId) {
        setIsFromSelf(true);
      }
    };

    fetchData();

    const date = new Date(message.createdAt);
    setDate(date.toLocaleDateString());

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(time);
  }, []);

  return (
    <View
      style={isFromSelf ? MessageStyles.messageSelf : MessageStyles.message}
    >
      <Text
        style={
          isFromSelf ? MessageStyles.messageTextSelf : MessageStyles.messageText
        }
      >
        {message.content}
      </Text>
      <Text
        style={
          isFromSelf ? MessageStyles.messageDateSelf : MessageStyles.messageDate
        }
      >
        {date} {time}
      </Text>
    </View>
  );
}
