import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const API_BASE_URL = 'http://10.10.130.6:5224'; // Update with your server address

const ChatBotPage = () => {
    const [message, setMessage] = useState(''); // User's input
    const [chatHistory, setChatHistory] = useState([]); // History of the chat

  const sendMessage = async () => {
    if (!message.trim()) return; // Avoid sending empty messages

    setChatHistory((prev) => [...prev, { sender: "user", text: message }]); // Add user's message

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatHistory((prev) => [...prev, { sender: "bot", text: data.response }]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: "Error: Unable to process your request." },
        ]);
      }
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred while communicating with the chatbot." },
      ]);
    }

    setMessage(""); // Clear input field
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Adjust for header height
    >
      {/* Chat History */}
      <ScrollView style={styles.chatContainer} contentContainerStyle={{ flexGrow: 1 }}>
        {chatHistory.map((chat, index) => (
          <View
            key={index}
            style={chat.sender === "user" ? styles.userMessage : styles.botMessage}
          >
            <Text style={styles.messageText}>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Field and Send Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7E7", // Match the app theme
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6", // Light green for user messages
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F0F0", // Light gray for bot messages
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#d3d4c9", // Match the app's primary button color
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatBotPage;
