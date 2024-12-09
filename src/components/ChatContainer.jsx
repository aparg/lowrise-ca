"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";

import {
  LucideMessageCircleDashed,
  MessageCircle,
  MessageCircleMore,
} from "lucide-react";
import { ChatBarContext } from "@/app/context/ChatbarContext";

const ChatContainer = ({ children }) => {
  const { isMinimized, setIsMinimized } = useContext(ChatBarContext);
  const pathname = usePathname();

  if (pathname?.includes("/notes-dashboard")) return null;
  const isListingPage = pathname?.includes("/listings");

  return (
    <div
      className={`fixed ${
        isListingPage ? "bottom-14" : "bottom-3"
      } right-4 md:bottom-0 md:right-2 z-50`}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center md:gap-2 rounded-[999px] md:rounded-b-none md:rounded-t-lg p-3 md:px-6 md:py-3 bg-blue-600 text-white shadow-2xl shadow-black hover:bg-blue-700 transition-colors text-xs md:text-sm"
          aria-label="Open Chat"
        >
          <MessageCircleMore size={16} />
          <span className="hidden md:block">Message</span>
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
