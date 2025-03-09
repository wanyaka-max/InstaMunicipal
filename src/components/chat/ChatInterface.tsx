import React, { useState, useRef, useEffect } from "react";
import { Send, Image, Smile, Paperclip, Mic, MoreVertical } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: {
    type: "image" | "file" | "audio";
    url: string;
    name?: string;
  }[];
}

interface ChatInterfaceProps {
  recipientId?: string;
  recipientName?: string;
  recipientAvatar?: string;
  initialMessages?: Message[];
  isDepartmentChat?: boolean;
  departmentId?: string;
}

const ChatInterface = ({
  recipientId = "user-2",
  recipientName = "Jane Cooper",
  recipientAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  initialMessages = [],
  isDepartmentChat = false,
  departmentId = "",
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || "current-user",
      senderName: user?.user_metadata?.full_name || "You",
      senderAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "current-user"}`,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate reply after a delay
    if (!isDepartmentChat) {
      setIsTyping(true);
      setTimeout(() => {
        const reply: Message = {
          id: `msg-${Date.now()}`,
          senderId: recipientId,
          senderName: recipientName,
          senderAvatar: recipientAvatar,
          content: getRandomReply(),
          timestamp: new Date(),
          isRead: true,
        };
        setMessages((prev) => [...prev, reply]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const getRandomReply = () => {
    const replies = [
      "Thanks for the update!",
      "I'll look into this right away.",
      "Could you provide more details?",
      "Let me check with the team and get back to you.",
      "This is great news!",
      "We should discuss this in the next meeting.",
      "I appreciate your quick response.",
      "Have you filed the official report yet?",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={recipientAvatar}
              alt={recipientName}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{recipientName}</h3>
            <p className="text-xs text-gray-500">
              {isTyping ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreVertical className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwnMessage =
              message.senderId === (user?.id || "current-user");
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div className="flex max-w-[80%]">
                  {!isOwnMessage && (
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="h-8 w-8 rounded-full mr-2 mt-1"
                    />
                  )}
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        isOwnMessage
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                      {isOwnMessage && (
                        <span className="ml-1">
                          {message.isRead ? "✓✓" : "✓"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%]">
                <img
                  src={recipientAvatar}
                  alt={recipientName}
                  className="h-8 w-8 rounded-full mr-2"
                />
                <div className="bg-white border rounded-lg rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="p-3 border-t">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Image className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Mic className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full py-2 px-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100">
              <Smile className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <button
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
