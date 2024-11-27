"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { SignInButton } from "@clerk/nextjs";
import NoteInput from "./NoteInput";
import { HouseIcon, MessageCircle } from "lucide-react";
import { BASE_URL } from "@/api";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { ChatBarContext } from "@/app/context/ChatbarContext";
import ChatMessage from "./ChatMessage";

const NotesForProperties = () => {
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined" && isLocalStorageAvailable()) {
      return localStorage.getItem("notes-email") || "";
    }
    return "";
  });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isMinimized, setIsMinimized, setPropertyData, propertyData } =
    useContext(ChatBarContext);
  const { listingId, price } = propertyData;
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesContainerRef = useRef(null);

  const onSubmit = async (value) => {
    if (replyingTo) {
      await handleReply(value, replyingTo.id);
      setReplyingTo(null);
    } else {
      const newMessage = {
        message: value,
        email: email,
        listingId: listingId || null,
        timestamp: new Date().toISOString(),
        replies: [],
      };
      console.log(newMessage);
      const rawResponse = await fetch(
        `http://localhost:3000/notes/residential`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      const response = await rawResponse.json();
      if (rawResponse.status == 200) {
        setMessages([...messages, newMessage]);
      }
      console.log(response);
    }
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
        `http://localhost:3000/notes/residential/getmessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            listingId: listingId || null,
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

  const handleReply = async (message, replyToId) => {
    const newReply = {
      message: message,
      email: email,
      listingId: listingId || null,
      timestamp: new Date().toISOString(),
      replyTo: replyToId,
    };
    console.log(newReply);
    const rawResponse = await fetch(`http://localhost:3000/notes/residential`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReply),
    });

    const response = await rawResponse.json();
    if (rawResponse.status === 200) {
      const updatedMessages = messages.map((msg) => {
        if (msg.id === replyToId) {
          return {
            ...msg,
            replies: [...(msg.replies || []), newReply],
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      if (email) {
        await fetchMessages();
      }
    };
    loadMessages();
  }, [email, listingId]);

  const scrollToMessage = (messageId) => {
    const element = document.getElementById(`message-${messageId}`);
    if (element && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const elementPosition = element.offsetTop;
      const containerHeight = container.clientHeight;
      const scrollPosition = elementPosition - containerHeight;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-0 right-4 z-50">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 rounded-t-lg px-6 py-3 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Open Chat"
          >
            <MessageCircle size={20} />
            <span>Property Notes</span>
          </button>
        ) : (
          <div className="bg-white rounded-t-lg shadow-lg w-[400px]">
            <div className="border-b p-3 flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
              <h2 className="font-semibold">Property Notes</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-blue-700 rounded-full px-3"
                >
                  −
                </button>
              </div>
            </div>

            {email.length == 0 ? (
              <div className="p-4">
                <NoteInput
                  onSubmit={onSubmitEmail}
                  placeholder="Enter an email to start a chat"
                  type="email"
                />
              </div>
            ) : (
              <>
                {
                  <div className="sticky top-0 bg-gray-100 p-3 border shadow-sm">
                    <h3 className="font-medium flex items-center gap-2">
                      <HouseIcon size={20} />
                      {listingId}
                    </h3>
                    <p className="text-gray-600">${price}</p>
                  </div>
                }
                {console.log(messages)}
                <div
                  ref={messagesContainerRef}
                  className="h-[300px] overflow-y-auto p-4 space-y-4"
                >
                  {isLoading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500">
                      No messages yet
                    </div>
                  ) : (
                    messages.map((note, index) => (
                      <ChatMessage
                        key={index}
                        msg={note}
                        onReplyClick={(msg) => setReplyingTo(msg)}
                        onScrollToMessage={scrollToMessage}
                      />
                    ))
                  )}
                </div>
                <div className="border-t p-3">
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
                      <div className="mt-1 text-gray-700">
                        {replyingTo.message}
                      </div>
                    </div>
                  )}
                  <NoteInput
                    onSubmit={onSubmit}
                    placeholder={
                      replyingTo
                        ? "Write your reply..."
                        : "Send seller a message"
                    }
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NotesForProperties;
