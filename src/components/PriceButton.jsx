import Link from "next/link";
import React from "react";

const PriceButton = ({ price }) => {
  return (
    <Link
      href="#contact"
      className="text-center fixed bottom-3 w-80 mx-auto shadow-xl z-[1000] overflow-hidden block sm:hidden"
    >
      <div className="text-primary-green bg-white font-bold text-lg bg-white rounded-t-xl w-full py-2 shadow-xl">
        Listing Price: ${price}
      </div>
      <div className="bg-primary-green text-white font-semibold text-lg py-2 px-6 rounded-b-xl w-full shadow-xl">
        Send a message{" "}
        <img src="/message.svg" alt="message" className="ml-2 inline w-5" />
      </div>
    </Link>
  );
};

export default PriceButton;
