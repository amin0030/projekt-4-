import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const API_BASE_URL = 'http://192.168.0.113:5224'; // Update with your server address

const ChatBotPage = () => {
    const [message, setMessage] = useState(''); // User's input
    const [chatHistory, setChatHistory] = useState([]); // History of the chat

    const sendMessage = async () => {
        if (!message.trim()) return; // Avoid sending empty messages

        // Add user's message to chat history
        setChatHistory((prev) => [...prev, { sender: 'user', text: message }]);

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();

            // Add bot's response to chat history
            setChatHistory((prev) => [...prev, { sender: 'bot', text: data.response }]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory((prev) => [
                ...prev,
                { sender: 'bot', text: 'An error occurred while communicating with the chatbot.' },
            ]);
        }

        setMessage(''); // Clear the input field
    };

    return (
        <View style={styles.container}>
            {/* Chat History */}
            <ScrollView style={styles.chatContainer}>
                {chatHistory.map((chat, index) => (
                    <View
                        key={index}
                        style={chat.sender === 'user' ? styles.userMessage : styles.botMessage}
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
                    value={message}
                    onChangeText={setMessage}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    chatContainer: {
        flex: 1,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#F1F0F0',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
});

export default ChatBotPage;
