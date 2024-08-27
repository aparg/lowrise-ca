import formatCurrency from "@/helpers/formatCurrency";
import Nformatter from "@/helpers/Nformatter";
import { priceFormatter } from "@/helpers/priceFormatter";
import Link from "next/link";
import React from "react";

const PriceButton = ({ price }) => {
  return (
    <Link
      href="#contact"
      className="text-center fixed bottom-3 w-56 mx-auto shadow-xl z-[1000] overflow-hidden block sm:hidden"
    >
      <div className="text-primary-green bg-white font-bold text-md bg-white rounded-t-xl w-full py-1 shadow-xl">
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
