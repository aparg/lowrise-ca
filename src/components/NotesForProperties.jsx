"use client";
import React, { useEffect, useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import NoteInput from "./NoteInput";
import { MessageCircle } from "lucide-react";
import { BASE_URL } from "@/api";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

const NotesForProperties = ({ username, listingId, city }) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (value) => {
    const rawResponse = await fetch(
      `${BASE_URL}/notes/residential/admin-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          email: email,
          listingId: listingId,
          timestamp: new Date().toISOString(), // Adding timestamp
        }),
      }
    );
    const response = await rawResponse.json();
    if (rawResponse.status == 200) {
      setMessages([
        ...messages,
        {
          message: value,
          email: email,
          timestamp: new Date().toISOString(),
          listingId: listingId,
        },
      ]);
    }
    console.log(response);
  };

  const onSubmitEmail = async (value) => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem("notes-email", value);
    }
    setEmail(value);
    await fetchMessages();
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
      setMessages(messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (email) {
    //   const loadMessages = async () => {
    //     await fetchMessages();
    //   };
    //   loadMessages();
    // }
    if (localStorage.getItem("notes-email")) {
      setEmail(localStorage.getItem("notes-email"));
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full px-10 py-2 mb-4 bg-black text-white shadow-lg hover:bg-black transition-colors text-lg font-semibold hover:shadow-2xl"
          aria-label="Open Messages"
        >
          Add a note
        </button>
      </div>
      {/* Message Button */}

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
            {email.length == 0 ? (
              <div className="p-6 text-center">
                {/* <SignInButton
                  mode="modal"
                  forceRedirectUrl={`/ontario/${city}/listings/${listingId}`}
                >
                  <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                    Sign in to view notes
                  </button>
                </SignInButton> */}
                {console.log(email)}
                <NoteInput
                  onSubmit={onSubmitEmail}
                  placeholder="Enter an email to start a chat"
                  type="email"
                />
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
                  <NoteInput
                    onSubmit={onSubmit}
                    placeholder="Send seller a message"
                  />
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
