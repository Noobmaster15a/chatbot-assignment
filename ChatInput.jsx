import React from 'react';

const ChatList = ({ chats, setSelectedChatId, selectedChatId }) => {
  return (
    <div className="chat-list">
      <div className="chat-header">Chats</div>
      {chats.map(chat => (
        <div
          key={chat.id}
          className={`chat-item ${chat.id === selectedChatId ? 'active' : ''}`}
          onClick={() => setSelectedChatId(chat.id)}
        >
          <div className="avatar2">{chat.initials}</div>
          <div className="chat-info">
            <div className="chat-name-time">
              <span className="chat-name">{chat.name}</span>
              <span className="chat-time">{chat.time}</span>
            </div>
            <div className="chat-preview">{chat.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
