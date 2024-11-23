import React from "react";

const ChatMessage = ({ msg, listingId }) => {
  return (
    <div
      className={`p-2 rounded-lg ${
        msg.email === "milan@homebaba.ca"
          ? "bg-blue-100 ml-auto"
          : "bg-gray-100"
      } max-w-[80%]`}
    >
      <div>{msg.message}</div>
      <div className="text-xs text-gray-500 mt-1">
        From Listing ID: {listingId}
      </div>
    </div>
  );
};

export default ChatMessage;
