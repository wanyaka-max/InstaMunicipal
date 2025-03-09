import React from "react";
import MessagesComponent from "@/components/chat/MessagesPage";
import { Building2 } from "lucide-react";

const MessagesPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <MessagesComponent />
      </div>
    </div>
  );
};

export default MessagesPage;
