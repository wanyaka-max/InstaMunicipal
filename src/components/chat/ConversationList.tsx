import React, { useState } from "react";
import { Search, Plus, Filter, X } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface Conversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  isDepartment?: boolean;
  departmentId?: string;
}

interface ConversationListProps {
  conversations?: Conversation[];
  onSelectConversation?: (conversation: Conversation) => void;
  onNewConversation?: () => void;
  selectedConversationId?: string;
}

const ConversationList = ({
  conversations = [],
  onSelectConversation = () => {},
  onNewConversation = () => {},
  selectedConversationId = "",
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  // Default conversations if none provided
  const defaultConversations: Conversation[] = [
    {
      id: "conv-1",
      recipientId: "user-2",
      recipientName: "Jane Cooper",
      recipientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      lastMessage: "I'll check with the team and get back to you",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "conv-2",
      recipientId: "user-3",
      recipientName: "Robert Fox",
      recipientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      lastMessage: "The meeting is scheduled for tomorrow at 10 AM",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "conv-3",
      recipientId: "dept-1",
      recipientName: "Public Works",
      recipientAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=public-works",
      lastMessage: "New road maintenance schedule posted",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 1,
      isOnline: true,
      isDepartment: true,
      departmentId: "public-works",
    },
    {
      id: "conv-4",
      recipientId: "user-4",
      recipientName: "Leslie Knope",
      recipientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=leslie",
      lastMessage: "Can you review the proposal before the meeting?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "conv-5",
      recipientId: "dept-2",
      recipientName: "Parks & Recreation",
      recipientAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=parks-rec",
      lastMessage: "Summer program registration is now open",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
      isOnline: true,
      isDepartment: true,
      departmentId: "parks-rec",
    },
  ];

  const allConversations =
    conversations.length > 0 ? conversations : defaultConversations;

  // Filter conversations based on search query
  const filteredConversations = allConversations.filter((conv) =>
    conv.recipientName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const day = 24 * 60 * 60 * 1000;

    if (diff < 24 * 60 * 60 * 1000) {
      // Less than 24 hours, show time
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diff < 7 * day) {
      // Less than a week, show day name
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      // More than a week, show date
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <button
            onClick={onNewConversation}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No conversations found</p>
          </div>
        ) : (
          <ul className="divide-y">
            {filteredConversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`hover:bg-gray-50 cursor-pointer ${selectedConversationId === conversation.id ? "bg-blue-50" : ""}`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-center p-4">
                  <div className="relative mr-3">
                    <img
                      src={conversation.recipientAvatar}
                      alt={conversation.recipientName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                    {conversation.isDepartment && (
                      <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[8px]">D</span>
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium truncate">
                        {conversation.recipientName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
