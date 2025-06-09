import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  { name: "Emma Thompson", initials: "EM", time: "12:45 PM" },
  { name: "Michael Johnson", initials: "MJ", time: "Yesterday" },
  { name: "Sophia Lee", initials: "SL", time: "Yesterday" },
  { name: "Robert Brown", initials: "RB", time: "Tuesday" },
  { name: "Amelia Wilson", initials: "AW", time: "Monday" },
  { name: "Daniel Martinez", initials: "DM", time: "May 25" },
];

const messagesData = {
  "Emma Thompson": [
    { sender: "Emma Thompson", text: "Oh, I almost forgot - do you have the latest version of the client presentation?", time: "12:05 PM", status: "received" },
    { sender: "You", text: "I’ve just sent it to your email. Let me know if you need anything else!", time: "12:15 PM", status: "sent" },
    { sender: "Emma Thompson", text: "Got it, thanks! See you soon!", time: "12:20 PM", status: "received" },
    { sender: "You", text: "Looking forward to it! 🔥", time: "12:25 PM", status: "sent" },
  ],
};

export default function ChatApp() {
  const [currentContact, setCurrentContact] = useState("Emma Thompson");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(messagesData);

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent",
    };
    const updated = [...(messages[currentContact] || []), newMsg];
    setMessages({ ...messages, [currentContact]: updated });
    setNewMessage("");
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 border-r bg-gray-50 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        {contacts.map((contact) => (
          <div
            key={contact.name}
            onClick={() => setCurrentContact(contact.name)}
            className={`p-2 rounded-lg cursor-pointer mb-2 flex items-center ${currentContact === contact.name ? "bg-blue-100" : "hover:bg-gray-200"}`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3 font-semibold">
              {contact.initials}
            </div>
            <div>
              <p className="font-medium">{contact.name}</p>
              <p className="text-xs text-gray-500">{contact.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-2">
            {(messages[currentContact] || []).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`max-w-xs px-4 py-2 rounded-xl text-sm ${msg.sender === "You" ? "ml-auto bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
              >
                {msg.text}
                <div className="text-[10px] text-right opacity-70 mt-1">
                  {msg.time} {msg.status === "sent" && <span>✔</span>}
                </div>
              </motion.div>
            ))}
          </CardContent>
          <div className="flex items-center p-2 border-t">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1"
            />
            <button
              onClick={handleSend}
              className="p-2 ml-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <Send size={18} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
