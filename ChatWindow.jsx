import React, { useState } from 'react';

const ChatWindow = ({ chat, onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className='avatar'>{chat.initials}</span><strong>{chat.name}</strong> <p className="status">• {chat.status}</p>
      </div>
      <div className="chat-messages">
        {chat.messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
