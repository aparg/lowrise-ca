"use client";
import { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const ChatBarContext = createContext(null);

export function ChatBarContextProvider({ children }) {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(true);
  const [propertyData, setPropertyData] = useState({
    listingId: null,
    price: null,
    filters: null,
  });
  const [isAdminChatbox, setIsAdminChatbox] = useState(false);

  useEffect(() => {
    // Check for admin email in localStorage
    const notesEmail = localStorage.getItem("notes-email");
    console.log(notesEmail === "milan@homebaba.ca");
    setIsAdminChatbox(notesEmail === "milan@homebaba.ca");
    if (!pathname?.includes("/listings")) {
      setPropertyData({
        listingId: null,
        price: null,
      });
    } else if (pathname?.includes("/ontario")) {
      const filterState = localStorage.getItem("filterState");
      if (filterState) {
        const parsedFilters = JSON.parse(filterState);
        const activeFilters = Object.entries(parsedFilters).reduce(
          (acc, [key, value]) => {
            if (value !== null || value !== undefined || value !== 0) {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );

        setPropertyData({ ...propertyData, filters: activeFilters });
      }
    }
  }, [pathname]);

  return (
    <ChatBarContext.Provider
      value={{
        isMinimized,
        setIsMinimized,
        propertyData,
        setPropertyData,
        isAdminChatbox,
      }}
    >
      {children}
    </ChatBarContext.Provider>
  );
}
