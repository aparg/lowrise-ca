"use client";
import React from "react";
import { usePathname } from "next/navigation";

const layout = ({ children }) => {
  const pathname = usePathname();
  const isListingsPage = pathname.includes("/listings/");
  return (
    <>
      {!isListingsPage ? (
        <div className="max-w-[98%] mx-auto mt-2 font-lausanne">{children}</div>
      ) : (
        children
      )}
    </>
  );
};

export default layout;
