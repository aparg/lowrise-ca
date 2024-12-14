import React from "react";
import { Trash2Icon } from "lucide-react";

const ChatUserEmail = ({
  email,
  activeEmail,
  setActiveEmail,
  lastMessage,
  name,
  unreadCount,
  isOnline,
  showMobileMessageBox,
  lastActivity,
  createdAt,
}) => {
  const showDate = lastActivity || createdAt;
  return (
    <div
      onClick={() => {
        setActiveEmail(email);
        showMobileMessageBox();
      }}
      className={`flex items-center gap-4 px-2 sm:px-4 py-2 my-1 sm:py-4 cursor-pointer hover:bg-chat-hover transition-colors rounded-lg ${
        activeEmail === email ? "bg-chat-active-card" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 md:w-6 md:h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        {isOnline && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* User Info */}
      <div className="w-full flex items-center justify-between">
        <div className="flex-1 min-w-0 flex">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 truncate">
              {name || email}
            </h3>
            <div
              className={`${
                unreadCount > 0 ? "text-black font-bold" : "text-gray-500"
              }`}
            >
              <p className="text-xs sm:text-sm truncate">{lastMessage}</p>
              <p className={`text-xs sm:text-sm  truncate`}>
                {new Date(showDate?.replace(" ", "T") + "Z").toLocaleString(
                  undefined,
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }
                )}
              </p>
            </div>
          </div>
        </div>

        {unreadCount > 0 && (
          <div className="rounded-[999px] bg-black text-white font-bold h-6 w-6 flex justify-center items-center text-[12px]">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUserEmail;
