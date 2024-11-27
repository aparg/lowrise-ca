"use client";
import { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const ChatBarContext = createContext(null);

export function ChatBarContextProvider({ children }) {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);
  const [propertyData, setPropertyData] = useState({
    listingId: null,
    price: null,
  });

  useEffect(() => {
    if (!pathname?.includes("/listings")) {
      setPropertyData({
        listingId: null,
        price: null,
      });
    }
  }, [pathname]);

  return (
    <ChatBarContext.Provider
      value={{ isMinimized, setIsMinimized, propertyData, setPropertyData }}
    >
      {children}
    </ChatBarContext.Provider>
  );
}
