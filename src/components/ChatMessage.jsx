import React, { useState } from "react";
import { ReplyIcon } from "lucide-react";
import NoteInput from "./NoteInput";

const ChatMessage = ({ msg, onReplyClick, onScrollToMessage, listingId }) => {
  const adminMessage = msg.email === "milan@homebaba.ca";

  const formatPropertyMessage = () => {
    return (
      <>
        <div
          class={`flex items-center gap-2 ${
            !adminMessage ? "bg-blue-200" : "bg-gray-200"
          } py-2 px-2 rounded-lg`}
        >
          <span class="text-xl">🏠</span>
          <h2 class="text-sm">{msg.listingId}</h2>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-3" id={`message-${msg.id}`}>
      {/* Main message */}
      <div
        className={`p-4 rounded-2xl ${
          !adminMessage
            ? "bg-blue-600 text-white ml-auto"
            : "bg-gray-200 text-gray-800"
        } max-w-[80%]`}
      >
        <div>{listingId && formatPropertyMessage()}</div>
        <div>{msg.message}</div>
        <div className="flex justify-between items-center mt-1">
          <div
            className={`text-xs ${
              !adminMessage ? "text-blue-100" : "text-gray-500"
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
              !adminMessage ? "text-white" : "text-blue-600"
            }`}
          >
            <ReplyIcon size={14} />
            Reply
          </button>
        </div>
      </div>

      {/* Replies */}
      {msg.replies && msg.replies.length > 0 && (
        <div className={`pl-8 space-y-3`}>
          {msg.replies.map((reply) => (
            <div
              key={reply.id}
              className={`max-w-[80%] ${
                reply.email !== "milan@homebaba.ca" ? "ml-auto" : ""
              }`}
            >
              <div
                className={`rounded-2xl overflow-hidden ${
                  reply.email !== "milan@homebaba.ca"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {/* Original message */}
                <div
                  className={`p-3 text-sm cursor-pointer ${
                    reply.email !== "milan@homebaba.ca"
                      ? "bg-blue-700/50"
                      : "bg-gray-300/50"
                  }`}
                  onClick={() => onScrollToMessage(msg.id)}
                >
                  <div
                    className={`text-xs mb-1 ${
                      reply.email !== "milan@homebaba.ca"
                        ? "text-blue-100"
                        : "text-gray-600"
                    }`}
                  >
                    Replying to:
                  </div>
                  {msg.message}
                </div>

                {/* Reply message */}
                <div className="p-4">
                  {reply.message}
                  <div
                    className={`text-xs mt-1 ${
                      reply.email !== "milan@homebaba.ca"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {reply.timestamp &&
                      new Date(reply.timestamp).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
