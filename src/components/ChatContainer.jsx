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
    <div className="fixed bottom-0 right-0 z-50 md:right-2 md:left-auto md:translate-x-0 md:translate-y-0 left-1/2 transform -translate-x-1/2 w-5/6 md:w-auto flex justify-center">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-t-lg px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors text-xs md:text-sm"
          aria-label="Open Chat"
        >
          <MessageCircle size={16} />
          <span>Message</span>
        </button>
      ) : (
        <div className="w-full md:w-[400px]">
          <div className="border-b p-2 md:p-3 flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
            <h2 className="font-semibold text-xs md:text-sm">Messages</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-blue-700 rounded-full px-3"
              >
                −
              </button>
            </div>
          </div>
          <div className="max-h-[80vh] md:max-h-[600px] overflow-y-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
