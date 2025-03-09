import React, { useState } from "react";
import ConversationList from "./ConversationList";
import ChatInterface from "./ChatInterface";
import NewMessageModal from "./NewMessageModal";
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

interface Contact {
  id: string;
  name: string;
  avatar: string;
  department?: string;
  isDepartment?: boolean;
}

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const { user } = useAuth();

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleNewConversation = () => {
    setShowNewMessageModal(true);
  };

  const handleSelectContact = (contact: Contact) => {
    // Create a new conversation with the selected contact
    const newConversation: Conversation = {
      id: `conv-new-${Date.now()}`,
      recipientId: contact.id,
      recipientName: contact.name,
      recipientAvatar: contact.avatar,
      lastMessage: "Start a new conversation",
      timestamp: new Date(),
      unreadCount: 0,
      isOnline: true,
      isDepartment: contact.isDepartment,
      departmentId: contact.isDepartment
        ? contact.id.replace("dept-", "")
        : undefined,
    };

    setSelectedConversation(newConversation);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r">
        <ConversationList
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          selectedConversationId={selectedConversation?.id}
        />
      </div>
      <div className="w-2/3">
        {selectedConversation ? (
          <ChatInterface
            recipientId={selectedConversation.recipientId}
            recipientName={selectedConversation.recipientName}
            recipientAvatar={selectedConversation.recipientAvatar}
            isDepartmentChat={selectedConversation.isDepartment}
            departmentId={selectedConversation.departmentId}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "user"}`}
                alt="Your avatar"
                className="h-12 w-12 rounded-full"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">Your Messages</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Send private messages to colleagues or join department channels to
              stay connected with your municipal network.
            </p>
            <button
              onClick={handleNewConversation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Start a New Conversation
            </button>
          </div>
        )}
      </div>

      {showNewMessageModal && (
        <NewMessageModal
          isOpen={showNewMessageModal}
          onClose={() => setShowNewMessageModal(false)}
          onSelectContact={handleSelectContact}
        />
      )}
    </div>
  );
};

export default MessagesPage;
