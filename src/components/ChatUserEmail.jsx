import React from "react";
import { Trash2Icon } from "lucide-react";

const ChatUserEmail = ({
  email,
  activeEmail,
  setActiveEmail,
  lastMessage,
  name,
  isOnline,
}) => {
  return (
    <div
      onClick={() => setActiveEmail(email)}
      className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-blue-50 transition-colors ${
        activeEmail === email ? "bg-blue-100" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-500"
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
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 truncate">
            {name || email}
          </h3>
          <p className="text-sm text-gray-500 truncate">{email}</p>
          <p className="text-sm text-gray-400 truncate">{lastMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUserEmail;
