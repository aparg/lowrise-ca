"use client";
import { useState, useEffect } from "react";
import NoteInput from "@/components/NoteInput";
import { BASE_URL } from "@/api";
import { Trash2Icon, TrashIcon } from "lucide-react";

export default function NotesDashboard() {
  const [chats, setChats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEmail, setActiveEmail] = useState(null);

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
        console.log(data);
        // Group messages by email
        const groupedChats = data.reduce((acc, message) => {
          if (!message.email || !message.listingId) return acc;
          const key = `${message.email}*${message.listingId}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(message);
          return acc;
        }, {});

        setChats(groupedChats);
        // After setting chats, set the first email as active
        const firstEmail = Object.keys(groupedChats)[0]?.split("*")[0];
        setActiveEmail(firstEmail);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (message, receiver, listingId) => {
    try {
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Update local state with new message
      //find the chat with the email and listingId and add the message to it
      setChats((prev) => {
        const key = `${receiver}*${listingId}`;
        return {
          ...prev,
          [key]: [
            ...(prev[key] || []),
            { message, email: "milan@homebaba.ca" },
          ],
        };
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      throw err;
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

      // Remove all messages for this email from local state
      setChats((prev) => {
        const newChats = { ...prev };
        Object.keys(newChats).forEach((key) => {
          if (key.split("*")[0] === email) {
            delete newChats[key];
          }
        });
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

  // Get unique emails from chat keys
  const uniqueEmails = [
    ...new Set(Object.keys(chats).map((key) => key.split("*")[0])),
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notes Dashboard</h1>

      <div className="flex">
        {/* Email Sidebar */}
        <div className="w-80 border-r pr-4 mr-4">
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          <div className="space-y-2">
            {uniqueEmails.map((email) => (
              <div key={email} className="flex items-center gap-2">
                <button
                  onClick={() => setActiveEmail(email)}
                  className={`flex-1 text-left px-4 py-2 rounded ${
                    activeEmail === email
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {email}
                </button>
                <button
                  onClick={() => handleDeleteMessages(email)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 space-y-6">
          {Object.entries(chats)
            .filter(([key]) => key.split("*")[0] === activeEmail)
            .map(([key, messages]) => {
              const [email, listingId] = key.split("*");
              return (
                <div key={key} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3 border-b">
                    <p className="text-sm text-gray-600">
                      Listing ID: {listingId}
                    </p>
                  </div>
                  <div className="p-4 space-y-3">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
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
                    ))}
                  </div>
                  <NoteInput
                    onSubmit={(message) =>
                      handleSubmit(message, email, listingId)
                    }
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
