import React from "react";
import "./App.css";

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
    status: 'Online',
    lastMessage: 'Can we reschedule our meeting?',
    time: 'Yesterday',
    messages: [{ sender: 'Sophia', text: 'Can we reschedule our meeting?' }]
  },
  {
    id: 4,
    name: 'Robert Brown',
    lastMessage: 'Can you review the budget proposal?',
    time: 'Tuesday',
    avatar: 'RB',
    messages: [{ sender: 'bot', text: 'Can you review the budget proposal?' }]
  },
  {
    id: 5,
    name: 'Amelia Wilson',
    lastMessage: 'Thanks for your help with the client call.',
    time: 'Monday',
    avatar: 'AW',
    messages: [{ sender: 'bot', text: 'Thanks for your help with the client call.' }]
  },
  {
    id: 6,
    name: 'Daniel Martinez',
    lastMessage: 'Let’s schedule a call to discuss the project.',
    time: 'May 25',
    avatar: 'DM',
    messages: [{ sender: 'bot', text: 'Let’s schedule a call to discuss the project.' }]
  },
];

const App = () => {
  const [chats, setChats] = useState(dummyChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);

  const handleSendMessage = (text) => {
    const botReplies = [
      "I'll look into that.",
      'Sure, give me a moment.',
      'Can you clarify that?',
      'Noted!',
      'Thanks for letting me know.'
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
    <div className="app-container">
      <ChatList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId} />
      <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;