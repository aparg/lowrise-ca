import React from "react";
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
  console.log(email);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
        <p className="text-sm text-gray-600">Listing ID: {listingId}</p>
        <button
          onClick={() => handleDeleteListingMessages(email, listingId)}
          className="p-2 text-red-500 hover:bg-red-50 rounded"
        >
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} msg={msg} listingId={listingId} />
        ))}
      </div>
      <div className="pb-4 px-4">
        <NoteInput
          onSubmit={(message) => handleSubmit(message, email, listingId)}
        />
      </div>
    </div>
  );
};

export default ChatTab;
