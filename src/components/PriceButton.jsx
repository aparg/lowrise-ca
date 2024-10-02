"use client";
import formatCurrency from "@/helpers/formatCurrency";
import Nformatter from "@/helpers/Nformatter";
import { priceFormatter } from "@/helpers/priceFormatter";
import Link from "next/link";
import React from "react";

const PriceButton = ({ price }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      const offsetY = 100; // Adjust this value to change how far from the element it scrolls

      // Get position relative to viewport
      const elementPosition = contactElement.getBoundingClientRect().top;

      // Add current scroll position to get absolute position
      const absoluteElementPosition = elementPosition + window.scrollY;

      // Calculate final scroll position with offset
      const scrollPosition = absoluteElementPosition - offsetY;

      console.log("Scrolling to:", scrollPosition);

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    // <Link
    //   href="#contact"
    //   className="text-center fixed bottom-3 right-3 mx-auto z-[1000] overflow-hidden block sm:hidden rounded-xl shadow-btn"
    //   onClick={handleClick}
    // >
    //   {/* <div className="text-primary-green font-bold text-md bg-white rounded-t-xl w-full py-1 shadow-xl">
    //     {console.log(price)}
    //     Listing Price: {price}
    //   </div> */}
    // </Link>
    <div onClick={handleClick}>
      <button className="fixed bottom-3 right-3 mx-auto z-[1000] overflow-hidden block sm:hidden rounded-xl shadow-btn bg-black text-white text-xs font-semibold py-2 px-4 transform transition-all duration-300 ease-in-out hover:scale-105 scale-100">
        Tour this home
      </button>
    </div>
  );
};

export default PriceButton;
