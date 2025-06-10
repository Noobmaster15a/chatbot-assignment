import React, { useState } from 'react';
import ChatList from './ChatInput';
import ChatWindow from './ChatWindow';
import './App.css';
import Topbar from './Topbar';

const dummyChats = [
  {
    id: 1,
    name: 'Emma Thompson',
    initials: 'EM',
    status: 'Online',
    lastMessage: 'Hello! How can I help you today?',
    time: '12:45 PM',
    messages: [{ sender: 'Emma', text: 'Hello! How can I help you today?' }]
  },
  {
    id: 2,
    name: 'Michael Johnson',
    initials: 'MJ',
    status: 'Online',
    lastMessage: 'Sure, I’ll send that over.',
    time: 'Yesterday',
    messages: [{ sender: 'Michael', text: 'Sure, I’ll send that over.' }]
  },
  {
    id: 3,
    name: 'Sophia Lee',
    initials: 'SL',
    status: 'offline',
    lastMessage: 'Can we reschedule our meeting?',
    time: 'Yesterday',
    messages: [{ sender: 'Sophia', text: 'Can we reschedule our meeting?' }]
  }
];

const App = () => {
  const [chats, setChats] = useState(dummyChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);

  const handleSendMessage = (text) => {
    const botReplies = [
      "Welcome How may I help you?",
      "Let me check that for you. It will just take a moment.",
      "understand your concern, and I’m here to help. Can you please provide me with a bit more information?",
      "Just checking in to see if everything is going well. Do you need any further assistance?",
      "I apologize for the delay",
      ":)"
    ];

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          lastMessage: text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messages: [
            ...chat.messages,
            { sender: 'You', text },
            { sender: chat.name, text: botReplies[Math.floor(Math.random() * botReplies.length)] }
          ]
        };
      }
      return chat;
    });

    setChats(updatedChats);
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <div>
    <Topbar />
    <div className="app-container">
      <ChatList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId} />
      <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
    </div>
    </div>
  );
};

export default App;
