"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";

import {
  LucideMessageCircleDashed,
  MessageCircle,
  MessageCircleMore,
} from "lucide-react";
import { ChatBarContext } from "@/app/context/ChatbarContext";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

const ChatContainer = ({ children }) => {
  const { isMinimized, setIsMinimized } = useContext(ChatBarContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const fetcher = async (url) => {
    try {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverEmail: isLocalStorageAvailable()
            ? localStorage.getItem("notes-email")
            : "",
        }),
      });
      const json = await rawResponse.json();
      return json;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };
  const { data, error } = useSWR(
    "${BASE_URL}/notes/residential/user-unread-count",
    fetcher,
    { refreshInterval: 5 }
  );

  useEffect(() => {
    data && setUnreadCount(data[0]?.user_unread_count || 0);
  }, [data]);

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
          className="relative flex items-center md:gap-2 rounded-[999px] md:rounded-b-none md:rounded-t-lg p-3 md:px-6 md:py-3 bg-blue-600 text-white shadow-2xl shadow-black hover:bg-blue-700 transition-colors text-xs md:text-sm"
          aria-label="Open Chat"
        >
          <MessageCircleMore size={16} />
          <span className="hidden md:block">Message</span>
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {unreadCount}
            </div>
          )}
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
