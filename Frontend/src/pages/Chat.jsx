import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Phone, Video, Send, MessageSquare } from "lucide-react";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sender, setSender] = useState("67a6f505c6ca6b6cb97e745c");
  const [receiver, setReceiver] = useState("67a6f88d36777f521c3d07ae");

  // Fetch past messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${sender}/${receiver}`);
        setMessages(res.data); // Store messages in state
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    socket.emit("register", sender);

    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [sender, receiver]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      if (sender.length !== 24 || receiver.length !== 24) {
        console.error("Invalid sender or receiver ID");
        return;
      }

      try {
        const messToSend = { sender, receiver, content: newMessage };

        await axios.post("http://localhost:5000/api/messages/send", messToSend);
        socket.emit("send_message", messToSend);
        setMessages((prevMessages) => [...prevMessages, messToSend]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error.response ? error.response.data : error.message);
      }
    }
  };

  return (
      <div className="flex h-screen bg-[#2F4F4F]">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-gray-700 flex flex-col">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-gray-500 rounded-full flex items-center justify-center text-white">SK</div>
              <div>
                <h3 className="font-semibold text-white">Sonu Kumar</h3>
                <p className="text-sm text-gray-400">@joji</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-700 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gray-500 rounded-full flex items-center justify-center text-white">DR</div>
              <h2 className="text-xl font-semibold text-white">Dev Raj</h2>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === sender ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === sender ? "bg-green-500 text-white" : "bg-gray-700 text-white"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#2F4F4F]">
            <div className="flex gap-2">
              <input
                className="flex-1 bg-[#98FB98] text-gray-900 placeholder:text-gray-700 p-2 rounded-md"
                placeholder="Typing..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage} className="bg-orange-500 hover:bg-orange-600 p-2 rounded-md text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 border-l border-gray-700 p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 bg-gray-500 rounded-full flex items-center justify-center text-white">DR</div>
            <h3 className="text-xl font-semibold text-white">Dev Raj</h3>
            <p className="text-sm text-gray-400">@joji</p>
            <div className="flex gap-4 mt-4">
              <button className="rounded-full h-12 w-12 bg-gray-700 p-2 flex items-center justify-center text-white">
                <Phone className="h-5 w-5" />
              </button>
              <button className="rounded-full h-12 w-12 bg-gray-700 p-2 flex items-center justify-center text-white">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="rounded-full h-12 w-12 bg-gray-700 p-2 flex items-center justify-center text-white">
                <Video className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Chat;
