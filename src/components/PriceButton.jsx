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
      const offsetY = 115; // Adjust this value to change how far above the element it scrolls
      const elementPosition = contactElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetY;
      console.log(offsetPosition);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Link
      href="#contact"
      className="text-center fixed bottom-3 w-56 mx-auto shadow-xl z-[1000] overflow-hidden block sm:hidden"
      onClick={handleClick}
    >
      <div className="text-primary-green font-bold text-md bg-white rounded-t-xl w-full py-1 shadow-xl">
        {console.log(price)}
        Listing Price: {price}
      </div>
      <div className="bg-primary-green text-white font-semibold text-md py-1 px-6 rounded-b-xl w-full shadow-xl">
        Tour this home{" "}
        {/* <img src="/message.svg" alt="message" className="ml-2 inline w-5" /> */}
      </div>
    </Link>
  );
};

export default PriceButton;
