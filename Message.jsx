import React from "react";
import "./App.css";

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === "user" ? "user" : "bot"}`}>
      {text}
    </div>
  );
};

export default Message;
