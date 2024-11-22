"use client";
import { useState, useEffect } from "react";
import NoteInput from "@/components/NoteInput";
import { BASE_URL } from "@/api";

export default function NotesDashboard() {
  const [chats, setChats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages for all emails
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/notes/residential/all-notes`,
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);
  console.log(chats);
  const handleSubmit = async (message, receiver, listingId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/residential/admin-message`,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notes Dashboard</h1>
      <div className="space-y-6">
        {Object.entries(chats).map(([key, messages]) => {
          const [email, listingId] = key.split("*");
          return (
            <div key={key} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 border-b">
                <h2 className="font-medium">Chat with {email}</h2>
                <p className="text-sm text-gray-600">Listing ID: {listingId}</p>
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
                    {msg.message}
                  </div>
                ))}
              </div>
              <NoteInput
                onSubmit={(message) => handleSubmit(message, email, listingId)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
