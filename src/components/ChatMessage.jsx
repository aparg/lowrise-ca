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
        {msg.listingId && (
          <div
            className={`flex md:text-md text-sm items-center gap-2 mb-1 ${
              sender ? "bg-gray-400" : "bg-gray-300"
            } py-2 px-2 rounded-lg`}
          >
            <span className="text-lg">🏠</span>
            <h2 className="text-xs">{msg.listingId}</h2>
          </div>
        )}

        {msg.filters && isAdminPortal && (
          <div className="flex flex-wrap gap-2 mt-2 mb-1">
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
          <div className={`relative`}>
            {/* Original message */}
            <div
              className={`p-3 text-xs cursor-pointer border-1 rounded-xl opacity-70 -mb-2 relative z-0 max-w-fit bg-[#f0f0f0] ${
                sender && "ml-auto "
              }`}
              onClick={() => onScrollToMessage(msg.originalMessage.id)}
            >
              <div className={`text-[10px] mb-1 text-gray-600`}>
                Replying to:
              </div>
              {msg.originalMessage.message}
            </div>

            {/* Reply message */}

            <div
              className={`relative p-4 z-10 max-w-fit ${
                sender
                  ? "bg-[#606060] text-white rounded-t-xl rounded-br-none rounded-bl-xl ml-auto right-0"
                  : "bg-[#f0f0f0] text-gray-800 rounded-t-xl rounded-br-xl rounded-bl-none"
              }`}
            >
              {msg.message}
              <div className={`text-[10px] mt-1`}>
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
            className={`mr-2 p-4 md:text-base text-sm rounded-2xl max-w-fit ${
              sender
                ? "bg-[#606060] text-white rounded-t-xl rounded-br-none rounded-bl-xl ml-auto"
                : "bg-[#f0f0f0] text-gray-800 rounded-t-xl rounded-br-xl rounded-bl-none"
            }`}
          >
            <div>{(listingId || msg.filters) && formatPropertyMessage()}</div>
            <div>{msg.message}</div>
            <div className="flex justify-between items-center space-x-4">
              <div className={`text-[10px]`}>
                {msg.timestamp &&
                  new Date(msg.timestamp).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
              </div>
              <button
                onClick={() => onReplyClick(msg)}
                className={`hover:opacity-80 flex items-center gap-1 text-[10px]`}
              >
                <ReplyIcon size={12} />
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
