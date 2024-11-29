"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { SignInButton } from "@clerk/nextjs";
import NoteInput from "./NoteInput";
import { HouseIcon, MessageCircle } from "lucide-react";
import { BASE_URL } from "@/api";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { ChatBarContext } from "@/app/context/ChatbarContext";
import ChatMessage from "./ChatMessage";

const NotesForProperties = ({ forEmail, isAdminPortal }) => {
  const [email, setEmail] = useState(() => {
    if (forEmail) return forEmail;
    else if (isLocalStorageAvailable()) {
      return localStorage.getItem("notes-email") || "";
    }
    return "";
  });
  const adminEmail = "milan@homebaba.ca";
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
        email: isAdminPortal ? adminEmail : email,
        timestamp: new Date().toISOString(),
        listingId: propertyData.listingId || null,
        replies: [],
        isMainMessage: true,
      };

      const rawResponse = await fetch(`${BASE_URL}/notes/residential`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      const response = await rawResponse.json();
      if (rawResponse.status == 200) {
        const updatedMessages = [...messages, newMessage].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setMessages(updatedMessages);
      }
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
            // listingId: listingId || null,
          }),
        }
      );
      const messages = await response.json();

      // Create a map of original messages for quick lookup
      const messageMap = messages.reduce((acc, msg) => {
        acc[msg.id] = msg;
        return acc;
      }, {});

      // Flatten messages and replies into a single array
      const allMessages = messages.reduce((acc, msg) => {
        // Add the main message
        acc.push({ ...msg, replies: [], isMainMessage: true });

        // Add replies with their original message reference
        if (msg.replies) {
          msg.replies.forEach((reply) => {
            acc.push({
              ...reply,
              isReply: true,
              originalMessage: {
                id: msg.id,
                message: msg.message,
                email: msg.email,
                timestamp: msg.timestamp,
              },
            });
          });
        }
        return acc;
      }, []);

      // Sort all messages by timestamp
      const sortedMessages = allMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      setMessages(sortedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (message, replyToId) => {
    const originalMessage = messages.find((msg) => msg.id === replyToId);

    const newReply = {
      message: message,
      email: isAdminPortal ? adminEmail : email,
      listingId: listingId || null,
      timestamp: new Date().toISOString(),
      replyTo: replyToId,
      isReply: true,
      originalMessage: {
        id: originalMessage.id,
        message: originalMessage.message,
        email: originalMessage.email,
        timestamp: originalMessage.timestamp,
      },
    };

    const rawResponse = await fetch(`${BASE_URL}/notes/residential`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReply),
    });

    const response = await rawResponse.json();
    if (rawResponse.status === 200) {
      const updatedMessages = [...messages, newReply].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
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
      const scrollPosition = listingId
        ? elementPosition - containerHeight
        : elementPosition - containerHeight + 65;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-white rounded-t-lg shadow-lg w-full">
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
            {listingId && (
              <div className="sticky top-0 bg-gray-100 p-3 border shadow-sm">
                <h3 className="font-medium flex items-center gap-2">
                  <HouseIcon size={20} />
                  {listingId}
                </h3>
                <p className="text-gray-600">${price}</p>
              </div>
            )}
            {console.log(messages)}
            <div
              ref={messagesContainerRef}
              className={`${
                isAdminPortal ? "h-[600px]" : "h-[300px]"
              } overflow-y-auto p-4 space-y-4`}
            >
              {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500">No messages yet</div>
              ) : (
                messages.map((note, index) => (
                  <ChatMessage
                    key={index}
                    msg={note}
                    onReplyClick={(msg) => setReplyingTo(msg)}
                    onScrollToMessage={scrollToMessage}
                    listingId={note.listingId}
                    isAdminPortal={isAdminPortal}
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
                  <div className="mt-1 text-gray-700">{replyingTo.message}</div>
                </div>
              )}
              <NoteInput
                onSubmit={onSubmit}
                placeholder={
                  replyingTo ? "Write your reply..." : "Send seller a message"
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NotesForProperties;
