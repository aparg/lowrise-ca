"use client";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/api";
import ChatUserEmail from "@/components/ChatUserEmail";
import ChatTab from "@/components/ChatTab";
import NotesForProperties from "@/components/NotesForProperties";

export default function NotesDashboard() {
  const [chats, setChats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEmail, setActiveEmail] = useState(null);
  const adminEmail = "milan@homebaba.ca";
  // Fetch messages for all emails
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/notes/residential/all-notes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        // Modified grouping logic to only use email
        const groupedChats = data.reduce((acc, message) => {
          if (!message.email) return acc;

          // For admin messages, use receiver's email for grouping
          const emailKey =
            message.email === adminEmail
              ? message.replies[0]?.email || message.receiver
              : message.email;

          if (!acc[emailKey]) {
            acc[emailKey] = [];
          }
          acc[emailKey].push(message);
          return acc;
        }, {});

        setChats(groupedChats);
        const firstEmail = Object.keys(groupedChats)[0];
        setActiveEmail(firstEmail);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (message, receiver, listingId, replyTo) => {
    if (replyTo) {
      handleReply(message, replyTo);
    } else {
      try {
        const timestamp = new Date().toISOString();
        const response = await fetch(
          `${BASE_URL}/notes/residential/admin-message`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message,
              receiver,
              listingId,
              replyTo,
              timestamp,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        // Update local state with new message
        setChats((prev) => ({
          ...prev,
          [receiver]: [
            ...(prev[receiver] || []),
            {
              id: `msg_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
              message,
              timestamp,
              email: adminEmail,
              replyTo,
              replies: [],
            },
          ],
        }));
      } catch (err) {
        console.error("Failed to send message:", err);
        throw err;
      }
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
    const rawResponse = await fetch(`${BASE_URL}/notes/residential`, {
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
      console.log(updatedMessages);
      setMessages(updatedMessages);
    }
  };

  const handleDeleteMessages = async (email) => {
    try {
      const response = await fetch(
        `${BASE_URL}/notes/residential/delete-messages`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete messages");
      }

      // Remove messages for this email from local state
      setChats((prev) => {
        const newChats = { ...prev };
        delete newChats[email];
        return newChats;
      });

      // Reset activeEmail if we just deleted its messages
      if (activeEmail === email) {
        setActiveEmail(null);
      }
    } catch (err) {
      console.error("Failed to delete messages:", err);
      alert("Failed to delete messages");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notes Dashboard</h1>

      <div className="flex">
        {/* Email Sidebar */}
        <div className="w-80 border-r pr-4 mr-4">
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          <div className="space-y-2">
            {Object.keys(chats).map((email) => (
              <ChatUserEmail
                key={email}
                email={email}
                handleDeleteMessages={handleDeleteMessages}
                activeEmail={activeEmail}
                setActiveEmail={setActiveEmail}
              />
            ))}
          </div>
        </div>

        {/* Single Chat Box */}
        <div className="flex-1">
          {activeEmail && (
            // <ChatTab
            //   messages={chats[activeEmail] || []}
            //   handleSubmit={(message) => handleSubmit(message, activeEmail)}
            //   email={activeEmail}
            // />
            <>
              <div className="border-b p-3 flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
                <h2 className="font-semibold">{activeEmail}</h2>
              </div>
              <NotesForProperties forEmail={activeEmail} isAdminPortal={true} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
