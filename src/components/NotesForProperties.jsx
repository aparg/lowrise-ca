"use client";
import React, { useEffect, useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import NoteInput from "./NoteInput";
import { MessageCircle } from "lucide-react";
import { BASE_URL } from "@/api";

const NotesForProperties = ({ email, username, listingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    console.log(rawResponse.status);
    if (rawResponse.status == 200) {
      setMessages([...messages, { message: value, email: email }]);
    }
    console.log(response);
  };

  const fetchMessages = async () => {
    console.log(email, listingId);
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/notes/residential/getmessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            listingId: listingId,
          }),
        }
      );

      const messages = await response.json();
      console.log(messages);
      setMessages(messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      const loadMessages = async () => {
        await fetchMessages();
      };
      loadMessages();
    }
  }, [email]);

  return (
    <>
      {/* Message Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-black text-white rounded-full shadow-lg hover:bg-black transition-colors"
        aria-label="Open Messages"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Backdrop Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {!email ? (
              <div className="p-6 text-center">
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                    Sign in to view notes
                  </button>
                </SignInButton>
              </div>
            ) : (
              <>
                <div className="border-b p-4 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Your Notes</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
                  {isLoading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500">
                      No notes yet
                    </div>
                  ) : (
                    messages.map((note, index) => (
                      <div
                        key={`${note.id || index}-${note.message}`}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm"
                      >
                        <p className="text-gray-800 mb-2">{note.message}</p>
                        <p className="text-right text-sm text-gray-600 italic">
                          From: {note.email === email ? username : "admin"}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t p-4">
                  <NoteInput onSubmit={onSubmit} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotesForProperties;
