import Link from "next/link";
import React, { useEffect } from "react";

const PageSelectorElement = ({ selected, value, setSelected, scrollTo }) => {
  return (
    <button
      className={`rounded-md mr-1 border-2 w-8 h-8 ${
        selected ? "bg-[#262338] text-white border-black" : "border-grey-200 "
      }`}
      onClick={() => {
        window.scrollTo(0, 0);
        setSelected();
      }}
      key={value}
      // disabled={page === 1}
    >
      {value}
    </button>
  );
};

export default PageSelectorElement;
