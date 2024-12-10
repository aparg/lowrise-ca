"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { SignInButton } from "@clerk/nextjs";
import NoteInput from "./NoteInput";
import { HouseIcon, MessageCircle } from "lucide-react";
import { BASE_URL } from "@/api";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { ChatBarContext } from "@/app/context/ChatbarContext";
import ChatMessage from "./ChatMessage";
import useSWR, { mutate } from "swr";

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
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMinimized,
    setIsMinimized,
    setPropertyData,
    propertyData,
    isAdminChatbox,
  } = useContext(ChatBarContext);
  const { listingId, price } = propertyData;
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesContainerRef = useRef(null);

  const { data: messagesData, error } = useSWR(
    email ? [`notes/residential/getmessages`, email, forEmail] : null,
    async ([url, email, forEmail]) => {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forEmail || email,
        }),
      });
      const messages = await response.json();
      console.log(messages);
      // Process messages (keeping your existing logic)
      const allMessages = messages.reduce((acc, msg) => {
        acc.push({ ...msg, replies: [], isMainMessage: true });
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
                filters: msg.filters,
              },
            });
          });
        }
        return acc;
      }, []);
      console.log(allMessages);
      return allMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    },
    { refreshInterval: 5000 }
  );
  // Add this useEffect to scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current && messagesData?.length > 0) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messagesData]);

  const onSubmit = async (value) => {
    if (replyingTo) {
      await handleReply(value, replyingTo.id);
      setReplyingTo(null);
    } else {
      const newMessage = {
        message: value,
        sender_email: isAdminPortal ? adminEmail : email,
        timestamp: new Date().toISOString(),
        receiver_email: forEmail || email,
        listingId: propertyData.listingId || null,
        replies: [],
        isMainMessage: true,
        filters: propertyData.filters || null,
      };
      console.log(newMessage);

      // Update the key to match the one used in the SWR hook
      const key = [`notes/residential/getmessages`, email, forEmail];

      // Optimistically update the UI with the correct data structure
      mutate(
        key,
        [...(messagesData || []), { ...newMessage, id: Date.now() }],
        { revalidate: false }
      );

      const rawResponse = await fetch(
        isAdminPortal
          ? `${BASE_URL}/notes/residential/admin-message`
          : `${BASE_URL}/notes/residential`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );
      console.log(rawResponse);
      const response = await rawResponse.json();
      if (rawResponse.status === 200) {
        // Revalidate with the correct key
        mutate(key);
      }
    }
  };

  const onSubmitEmail = async (value) => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem("notes-email", value);
    }
    setEmail(value);
    // await fetchMessages();
  };

  const handleReply = async (message, replyToId) => {
    const originalMessage = messagesData.find((msg) => msg.id === replyToId);

    const newReply = {
      message: message,
      sender_email: isAdminPortal ? adminEmail : email,
      receiver_email: forEmail || email,
      listingId: listingId || null,
      timestamp: new Date().toISOString(),
      replyTo: replyToId,
      isReply: true,
      originalMessage: {
        id: originalMessage.id,
        message: originalMessage.message,
      },
    };

    // Update the key to match the one used in the SWR hook
    const key = [`notes/residential/getmessages`, email, forEmail];

    // Optimistically update the UI with the correct data structure
    mutate(key, [...(messagesData || []), { ...newReply, id: Date.now() }], {
      revalidate: false,
    });
    const rawResponse = await fetch(`${BASE_URL}/notes/residential`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReply),
    });

    const response = await rawResponse.json();
    console.log(response);
    if (rawResponse.status === 200) {
      // Revalidate with the correct key
      mutate(key);
    }
  };

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
      <div className="bg-white shadow-lg w-full h-full">
        {email.length == 0 ? (
          <div className="p-3 md:p-4">
            {isAdminChatbox ? (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700 mb-2 md:mb-3 text-xs md:text-sm">
                  Select a user to chat with:
                </h3>
                <div className="max-h-[50vh] md:max-h-[300px] overflow-y-auto space-y-2">
                  {users.map((user) => (
                    <button
                      key={user.email}
                      onClick={() => setEmail(user.email)}
                      className="w-full text-left p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center justify-between text-xs md:text-sm"
                    >
                      <span className="truncate flex-1 mr-2">{user.email}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {user.last_activity
                          ? new Date(user.last_activity).toLocaleDateString()
                          : "No activity"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <NoteInput
                onSubmit={onSubmitEmail}
                placeholder="Enter an email to start a chat"
                type="email"
                className="text-xs md:text-sm"
              />
            )}
          </div>
        ) : (
          <div className=" overflow-y-auto flex flex-col h-full">
            {listingId && (
              <div className="sticky top-0 bg-gray-100 p-3 border shadow-sm">
                <h3 className="font-medium flex items-center gap-2">
                  <HouseIcon size={20} />
                  {listingId}
                </h3>
                <p className="text-gray-600">${price}</p>
              </div>
            )}
            <div
              ref={messagesContainerRef}
              className={`${
                isAdminPortal ? "h-[95%]" : "h-[300px]"
              } shrink overflow-y-auto p-4 space-y-4 mb-4`}
            >
              {console.log(messagesData)}
              {!messagesData ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : messagesData.length === 0 ? (
                <div className="text-center text-gray-500">No messages yet</div>
              ) : (
                messagesData.map((note, index) => (
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
            <div className="border-t p-3 rounded-md h-[12%] sm:h-[8%]">
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
                autoFocus={!!replyingTo}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotesForProperties;
