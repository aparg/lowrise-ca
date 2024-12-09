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
            className={`flex md:text-md text-sm items-center gap-2 ${
              sender ? "bg-gray-400" : "bg-gray-300"
            } py-2 px-2 rounded-lg`}
          >
            <span className="text-lg">🏠</span>
            <h2 className="text-xs">{msg.listingId}</h2>
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
          <div className={`relative`}>
            {/* Original message */}
            <div
              className={`p-3 text-xs cursor-pointer border-gray-300 border-1 bg-white rounded-xl opacity-70 -mb-2 relative z-0`}
              onClick={() => onScrollToMessage(msg.originalMessage.id)}
            >
              <div className={`text-[10px] mb-1 text-gray-600`}>
                Replying to:
              </div>
              {msg.originalMessage.message}
            </div>

            {/* Reply message */}

            <div
              className={`relative p-2 z-10 max-w-fit ${
                sender
                  ? "bg-gray-300 text-black rounded-t-xl rounded-br-none rounded-bl-xl ml-auto right-0"
                  : "border-gray-300 border-1 bg-white text-gray-800 rounded-t-xl rounded-br-xl rounded-bl-none"
              }`}
            >
              {msg.message}
              <div className={`text-xs mt-1 text-black`}>
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
            className={`mr-2 p-4 md:text-md text-sm rounded-2xl ${
              sender
                ? "bg-gray-300 text-black rounded-t-xl rounded-br-none rounded-bl-xl"
                : "border-gray-300 border-1 bg-white text-gray-800 rounded-t-xl rounded-br-xl rounded-bl-none"
            }`}
          >
            <div>{(listingId || msg.filters) && formatPropertyMessage()}</div>
            <div>{msg.message}</div>
            <div className="flex justify-between items-center mt-1">
              <div
                className={`text-[10px] ${
                  sender ? "text-black" : "text-gray-500"
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
                className={`hover:opacity-80 flex items-center gap-1 text-xs text-black`}
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
