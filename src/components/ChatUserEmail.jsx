import React from "react";
import { Trash2Icon } from "lucide-react";

const ChatUserEmail = ({
  email,
  handleDeleteMessages,
  activeEmail,
  setActiveEmail,
}) => {
  return (
    <div key={email} className="flex items-center gap-2">
      <button
        onClick={() => setActiveEmail(email)}
        className={`flex-1 text-left px-4 py-2 rounded ${
          activeEmail === email ? "bg-blue-500 text-white" : "hover:bg-gray-100"
        }`}
      >
        {email}
      </button>
      {/* <button
        onClick={() => handleDeleteMessages(email)}
        className="p-2 text-red-500 hover:bg-red-50 rounded"
      >
        <Trash2Icon className="w-4 h-4" />
      </button> */}
    </div>
  );
};

export default ChatUserEmail;
