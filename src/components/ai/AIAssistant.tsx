import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  Sparkles,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { generateAIResponse, getUserInteractionHistory } from "@/lib/deepseek";
import { useAuth } from "../auth/AuthContext";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  departmentContext?: string;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIAssistant = ({
  isOpen,
  onClose,
  departmentContext,
}: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<
    { prompt: string; response: string; created_at: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when first opened
      setMessages([
        {
          id: "welcome",
          content: `Hello${user?.user_metadata?.full_name ? " " + user.user_metadata.full_name : ""}! I'm your InstaMunicipal AI assistant. How can I help you today?`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showHistory) {
      loadHistory();
    }
  }, [showHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadHistory = async () => {
    const interactionHistory = await getUserInteractionHistory();
    setHistory(interactionHistory);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(input, departmentContext);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I'm sorry, I encountered an error. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (prompt: string) => {
    setInput(prompt);
    setShowHistory(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden z-50">
      <div className="p-3 border-b bg-blue-500 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-medium">Municipal AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-blue-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className="text-xs mt-1 opacity-70 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs flex items-center text-blue-600 hover:text-blue-800"
          >
            {showHistory ? (
              <ChevronDown className="h-3 w-3 mr-1" />
            ) : (
              <ChevronUp className="h-3 w-3 mr-1" />
            )}
            {showHistory ? "Hide history" : "Show history"}
          </button>
          <div className="text-xs text-gray-500">Powered by DeepSeek AI</div>
        </div>

        {showHistory && (
          <div className="mb-2 max-h-32 overflow-y-auto bg-gray-50 rounded-md p-2">
            {history.length > 0 ? (
              <ul className="text-xs space-y-1">
                {history.map((item, index) => (
                  <li
                    key={index}
                    className="hover:bg-gray-100 p-1 rounded cursor-pointer"
                    onClick={() => handleHistoryItemClick(item.prompt)}
                  >
                    <div className="truncate font-medium">{item.prompt}</div>
                    <div className="text-gray-500 text-[10px]">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No history yet</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
