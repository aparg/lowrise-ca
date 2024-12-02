"use client";
import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/api";
import ChatUserEmail from "@/components/ChatUserEmail";
import ChatTab from "@/components/ChatTab";
import NotesForProperties from "@/components/NotesForProperties";
import { Plus } from "lucide-react";

export default function NotesDashboard() {
  const [chats, setChats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeEmail, setActiveEmail] = useState(null);
  const adminEmail = "milan@homebaba.ca";
  const [showNewEmailInput, setShowNewEmailInput] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch messages for all emails
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/notes/residential/all-users`
        );
        const data = await response.json();
        console.log(data);
        // Filter out admin from users list
        const filteredUsers = data.filter((user) => user.email !== adminEmail);
        setUsers(filteredUsers);

        // Initialize empty chats for each user
        const initialChats = filteredUsers.reduce((acc, user) => {
          acc[user.email] = [];
          return acc;
        }, {});
        setChats(initialChats);

        // Set first user as active if there is one
        console.log(filteredUsers);
        if (filteredUsers.length > 0) {
          setActiveEmail(filteredUsers[0].email);
        }
      } catch (err) {
        console.log("yeta");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, []);

  const handleSubmit = async (message, receiver, listingId, replyTo) => {
    if (replyTo) {
      handleReply(message, replyTo);
    } else {
      try {
        const timestamp = new Date().toISOString();
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
      sender_email: email,
      listingId: listingId || null,
      timestamp: new Date().toISOString(),
      replyTo: replyToId,
    };
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

  const handleDeleteMessages = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/residential/delete-messages`,
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

  const handleAddNewEmail = async (e) => {
    e.preventDefault();

    if (newEmail && !users.find((user) => user.email === newEmail)) {
      try {
        const response = await fetch(
          `http://localhost:3000/notes/residential/add-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: newEmail,
              username: newEmail.split("@")[0], // Default username from email
              phone: null, // Optional phone number
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to add user");
        }

        const { userId, email } = await response.json();

        // Add new user to users list
        const newUser = {
          id: userId,
          email: email,
          username: email.split("@")[0],
          created_at: new Date().toISOString(),
          last_activity: null,
        };

        setUsers((prev) => [...prev, newUser]);

        // Initialize empty chat for new user
        setChats((prev) => ({
          ...prev,
          [email]: [],
        }));

        setActiveEmail(email);
        setNewEmail("");
        setShowNewEmailInput(false);
      } catch (error) {
        console.error("Failed to add user:", error);
        alert(error.message || "Failed to add user. Please try again.");
      }
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
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <ChatUserEmail
                  email={user.email}
                  username={user.username}
                  lastActivity={user.last_activity}
                  handleDeleteMessages={handleDeleteMessages}
                  activeEmail={activeEmail}
                  setActiveEmail={setActiveEmail}
                  isActive={activeEmail === user.email}
                />
                <hr className="border-gray-200" />
              </React.Fragment>
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
