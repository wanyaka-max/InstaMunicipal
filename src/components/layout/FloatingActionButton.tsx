import React, { useState } from "react";
import { Bot } from "lucide-react";
import AIAssistant from "../ai/AIAssistant";

interface FloatingActionButtonProps {
  departmentContext?: string;
}

const FloatingActionButton = ({
  departmentContext,
}: FloatingActionButtonProps) => {
  const [showAI, setShowAI] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAI(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>

      <AIAssistant
        isOpen={showAI}
        onClose={() => setShowAI(false)}
        departmentContext={departmentContext}
      />
    </>
  );
};

export default FloatingActionButton;
