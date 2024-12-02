import React, { useState } from "react";
import { ReplyIcon } from "lucide-react";

const ChatMessage = ({
  msg,
  onReplyClick,
  onScrollToMessage,
  listingId,
  isAdminPortal = false,
}) => {
  const adminMessage = msg.sender_email === "milan@homebaba.ca";
  const sender = isAdminPortal
    ? msg.sender_email === "milan@homebaba.ca"
    : msg.sender_email !== "milan@homebaba.ca";

  const formatPropertyMessage = () => {
    return (
      <>
        {console.log(msg)}
        {msg.listingId && (
          <div
            className={`flex items-center gap-2 ${
              sender ? "bg-blue-700/50" : "bg-gray-700/50"
            } py-2 px-2 rounded-lg`}
          >
            <span className="text-xl">🏠</span>
            <h2 className="text-sm">{msg.listingId}</h2>
          </div>
        )}

        {msg.filters && isAdminPortal && (
          <div className="flex flex-wrap gap-2 mt-2">
            {/* {console.log(Object.entries(JSON.parse(msg.filters)))} */}
            {Object.entries(JSON.parse(msg.filters)).map(([key, value]) => (
              <div
                key={key}
                className={`text-xs px-2 py-1 rounded-lg ${
                  sender ? "bg-blue-700/50" : "bg-gray-300/50"
                }`}
              >
                {`${key}: ${
                  typeof value === "object" ? JSON.stringify(value) : value
                }`}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="space-y-3" id={`message-${msg.id}`}>
      <div className={`max-w-[80%] ${sender ? "ml-auto" : "mr-auto"}`}>
        {msg.isReply ? (
          // Reply message with original message attached
          <div
            className={`rounded-2xl overflow-hidden ${
              sender ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {/* Original message */}
            <div
              className={`p-3 text-sm cursor-pointer ${
                sender ? "bg-blue-700/50" : "bg-gray-300/50"
              }`}
              onClick={() => onScrollToMessage(msg.originalMessage.id)}
            >
              <div
                className={`text-xs mb-1 ${
                  sender ? "text-blue-100" : "text-gray-600"
                }`}
              >
                Replying to:
              </div>
              {msg.originalMessage.message}
            </div>

            {/* Reply message */}
            <div className="p-4">
              {msg.message}
              <div
                className={`text-xs mt-1 ${
                  sender ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg.timestamp &&
                  new Date(msg.timestamp).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
              </div>
            </div>
          </div>
        ) : (
          // Main message
          <div
            className={`p-4 rounded-2xl ${
              sender ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            <div>{(listingId || msg.filters) && formatPropertyMessage()}</div>
            <div>{msg.message}</div>
            <div className="flex justify-between items-center mt-1">
              <div
                className={`text-xs ${
                  sender ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg.timestamp &&
                  new Date(msg.timestamp).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
              </div>
              <button
                onClick={() => onReplyClick(msg)}
                className={`hover:opacity-80 flex items-center gap-1 text-sm ${
                  sender ? "text-white" : "text-blue-600"
                }`}
              >
                <ReplyIcon size={14} />
                Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
