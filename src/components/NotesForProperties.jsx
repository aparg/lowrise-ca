"use client";
import React, { useEffect, useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import NoteInput from "./NoteInput";
import { Maximize2, Minimize2 } from "lucide-react";
import { BASE_URL } from "@/api";

const NotesForProperties = ({ email, username, listingId }) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const [messages, setMessages] = useState([
    { message: "Please drop your queries here" },
  ]);
  if (!email) {
    return (
      <div className="hidden lg:flex h-[300px] w-[300px] items-center justify-center border-2 border-black rounded-md bg-white p-4">
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
            Sign in to view notes
          </button>
        </SignInButton>
      </div>
    );
  }

  const onSubmit = async (value) => {
    console.log(email, listingId, value);
    const rawResponse = await fetch(`${BASE_URL}/notes/residential`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add this header
      },
      body: JSON.stringify({
        message: value,
        email: email,
        listingId: listingId,
      }),
    });
    const response = await rawResponse.json();
    console.log(response);
  };

  const fetchMessages = async () => {
    const response = await fetch(`${BASE_URL}/notes/residential/getmessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add this header
      },
      body: JSON.stringify({
        email: email,
        listingId: listingId,
      }),
    });

    const messages = await response.json();
    console.log(messages);
    setMessages(messages);
  };

  useEffect(() => {
    fetchMessages();
  }, [email]);

  return (
    <div
      className={`hidden lg:flex flex-col border-l-2 border-r-2 border-t-2 rounded-md rounded-b-none border-black bg-white transition-all duration-300
        ${
          isMaximized ? "h-[400px] w-[300px]" : "h-[40px] w-[300px] border-b-0"
        }`}
    >
      {/* Header */}
      <div className="border-b-2 border-black p-3 flex justify-between items-center hover:bg-gray-50">
        <h2 className="text-lg font-bold">Your Notes</h2>
        <button
          onClick={() => setIsMaximized(!isMaximized)}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          aria-label={isMaximized ? "Minimize" : "Maximize"}
        >
          {isMaximized ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Collapsible Content */}
      {isMaximized && (
        <>
          {/* Notes List */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((note, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                {console.log(note.email, email)}
                <p className="text-gray-800 mb-2">{note.message}</p>
                <p className="text-right text-sm text-gray-600 italic">
                  From: {note.email == email ? username : "admin"}
                </p>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <NoteInput onSubmit={onSubmit} />
        </>
      )}
    </div>
  );
};

export default NotesForProperties;
