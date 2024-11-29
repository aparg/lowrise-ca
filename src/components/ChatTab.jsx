import React, { useState } from "react";
import NoteInput from "./NoteInput";
import { Trash2Icon } from "lucide-react";
import ChatMessage from "./ChatMessage";

const ChatTab = ({
  listingId,
  messages,
  handleDeleteListingMessages,
  handleSubmit,
  email,
}) => {
  const [replyingTo, setReplyingTo] = useState(null);

  const onSubmit = (message) => {
    if (replyingTo) {
      // Assuming handleSubmit needs to be modified to handle replies
      handleSubmit(message, email, listingId, replyingTo.id);
      setReplyingTo(null);
    } else {
      handleSubmit(message, email, listingId);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col h-[calc(100vh-20rem)]">
      <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
        <button
          onClick={() => handleDeleteListingMessages(email, listingId)}
          className="p-2 text-red-500 hover:bg-red-50 rounded"
        >
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              msg={msg}
              listingId={listingId}
              isAdminPortal={true}
              onReplyClick={setReplyingTo}
            />
          ))}
        </div>
      </div>
      <div className="p-4 border-t bg-white">
        {replyingTo && (
          <div className="mb-2 p-2 bg-gray-50 rounded-lg text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Replying to:</span>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-1 text-gray-700">{replyingTo.message}</div>
          </div>
        )}
        <NoteInput
          onSubmit={onSubmit}
          placeholder={replyingTo ? "Write your reply..." : "Send a message"}
        />
      </div>
    </div>
  );
};

export default ChatTab;
