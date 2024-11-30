"use client";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/api";
import ChatUserEmail from "@/components/ChatUserEmail";
import ChatTab from "@/components/ChatTab";
import NotesForProperties from "@/components/NotesForProperties";
import { Plus } from "lucide-react";

export default function NotesDashboard() {
  const [chats, setChats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEmail, setActiveEmail] = useState(null);
  const adminEmail = "milan@homebaba.ca";
  const [showNewEmailInput, setShowNewEmailInput] = useState(false);
  const [newEmail, setNewEmail] = useState("");

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
          if (!message?.email || message?.email == adminEmail) return acc;

          // For admin messages, use receiver's email for grouping
          const emailKey =
            message.email === adminEmail
              ? message.replies[0]?.email || message.receiver || message.email
              : message.email;

          if (!emailKey) return acc;

          if (!acc[emailKey]) {
            acc[emailKey] = [];
          }
          acc[emailKey].push(message);
          return acc;
        }, {});
        console.log(groupedChats);
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

  const handleAddNewEmail = (e) => {
    e.preventDefault();
    if (newEmail && !chats[newEmail]) {
      setChats((prev) => ({
        ...prev,
        [newEmail]: [],
      }));
      setActiveEmail(newEmail);
      setNewEmail("");
      setShowNewEmailInput(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Notes Dashboard</h1>

      <div className="flex bg-gray-50 rounded-lg shadow-lg">
        {/* Email Sidebar */}
        <div className="w-96 border-r border-gray-200 p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Conversations
            </h2>
            <button
              onClick={() => setShowNewEmailInput(!showNewEmailInput)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Add new conversation"
            >
              <Plus size={24} className="text-blue-600" />
            </button>
          </div>

          {showNewEmailInput && (
            <form onSubmit={handleAddNewEmail} className="mb-6">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </form>
          )}

          <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
            {Object.keys(chats)
              .filter((email) => email != adminEmail)
              .map((email) => (
                <>
                  <ChatUserEmail
                    key={email}
                    email={email}
                    handleDeleteMessages={handleDeleteMessages}
                    activeEmail={activeEmail}
                    setActiveEmail={setActiveEmail}
                  />
                  <hr className="border-gray-200" />
                </>
              ))}
          </div>
        </div>

        {/* Chat Content Area */}
        <div className="flex-1 flex flex-col">
          {activeEmail ? (
            <>
              <div className="border-b p-4 flex justify-between items-center bg-blue-600 text-white rounded-tr-lg">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  {/* <span className="w-2 h-2 bg-green-400 rounded-full"></span> */}
                  {activeEmail}
                </h2>
              </div>
              <div className="flex-1 overflow-hidden bg-white rounded-br-lg ">
                <NotesForProperties
                  forEmail={activeEmail}
                  isAdminPortal={true}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
