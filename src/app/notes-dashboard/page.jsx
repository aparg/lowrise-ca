"use client";
import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/api";
import ChatUserEmail from "@/components/ChatUserEmail";
import ChatTab from "@/components/ChatTab";
import NotesForProperties from "@/components/NotesForProperties";
import { ArrowBigLeft, ArrowLeft, Plus } from "lucide-react";
import useDeviceView from "@/helpers/useDeviceView";
import { Avatar } from "@nextui-org/react";
import useSWR from "swr";

// Define a fetcher function
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NotesDashboard() {
  const [chats, setChats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeEmail, setActiveEmail] = useState(null);
  const adminEmail = "milan@homebaba.ca";
  const [showNewEmailInput, setShowNewEmailInput] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [users, setUsers] = useState([]);
  const { isMobileView } = useDeviceView();
  const [showMessageBox, setShowMessageBox] = useState(false);
  const isMesssageBoxOpen = showMessageBox && isMobileView;
  const showBackButton = showMessageBox && isMobileView;
  // Replace useEffect with useSWR for fetching users
  const { data } = useSWR(
    `http://localhost:3000/notes/residential/all-users`,
    fetcher,
    { refreshInterval: 5000 } // Set refresh interval to 5 seconds
  );

  useEffect(() => {
    if (data) {
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
      // if (filteredUsers.length > 0) {
      //   setActiveEmail(filteredUsers[0].email);
      // }
    }
  }, [data]); // Add data as a dependency

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

  const mobileMessageBox = isMobileView ? showMessageBox : true;
  const showConversations = !isMobileView ? true : !showMessageBox;
  return (
    <div className=" bg-[#f5f5f5] h-full p-4">
      <div className="h-[88vh] sm:h-[91vh] flex bg-[#f5f5f5] rounded-lg md:flex space-x-4">
        {/* <h1 className="text-3xl font-bold mb-8 text-gray-800">Notes Dashboard</h1> */}
        {/* Email Sidebar */}
        {showConversations && (
          <div className="w-full sm:w-96 p-4 bg-white rounded-lg">
            <div className="justify-between items-center mb-6 flex">
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

            <div className="overflow-y-auto sm:max-h-[calc(100vh-250px)]">
              {console.log(users)}
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
                    showMobileMessageBox={() => setShowMessageBox(true)}
                    unreadCount={user.unread_count}
                    lastMessage={user.last_msg}
                    createdAt={user.created_at}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Chat Content Area */}
        {mobileMessageBox && (
          <div className="flex-1 flex flex-col h-full rounded-lg overflow-hidden bg-white">
            {activeEmail ? (
              <>
                <div className="border-b py-2 sm:p-4 flex items-center bg-white  text-black rounded-t-lg sm:rounded-tl-none shadow-md z-10 space-x-2">
                  {isMobileView && (
                    <button
                      className="sm:hidden p-2 rounded-full text-black ml-2 hover:bg-chat-active-card"
                      onClick={() => setShowMessageBox(false)} // Adjust this function as needed
                      title="Back"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 md:w-6 md:h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-sm sm:text-lg font-semibold flex items-center gap-2">
                    {/* <span className="w-2 h-2 bg-green-400 rounded-full"></span> */}
                    {activeEmail}
                    {}
                  </h2>
                </div>
                <div className="flex-1 overflow-hidden bg-white rounded-br-lg z-0">
                  {console.log("***")}
                  {console.log(activeEmail)}
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
        )}
      </div>
    </div>
  );
}
