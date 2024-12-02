"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";

import { MessageCircle } from "lucide-react";
import { ChatBarContext } from "@/app/context/ChatbarContext";

const ChatContainer = ({ children }) => {
  const { isMinimized, setIsMinimized } = useContext(ChatBarContext);
  const pathname = usePathname();

  if (pathname?.includes("/notes-dashboard")) return null;

  return (
    <div className="fixed bottom-0 right-2 z-50">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-t-lg px-6 py-3 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open Chat"
        >
          <MessageCircle size={20} />
          <span>Message</span>
        </button>
      ) : (
        <div className="w-[400px]">
          <div className="border-b p-3 flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
            <h2 className="font-semibold">Property Notes</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-blue-700 rounded-full px-3"
              >
                −
              </button>
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
