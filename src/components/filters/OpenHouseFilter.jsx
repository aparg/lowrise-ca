"use client";
import { houseType } from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const OpenHouseFilter = ({ city }) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("open-houses")) {
      setActiveFilter(true);
    }
  }, []);
  return (
    <div className="inline-flex sm:justify-normal justify-center sm:mr-4 flex-nowrap gap-y-2 py-1 sm:py-0 sm:mx-2 my-0 bg-white">
      <div
        className={`flex items-center justify-center mx-[2px] px-3 text-xs font-semibold h-8 border-[#b2b2b2] tracking-[0.01125] border-[1px] cursor-pointer text-nowrap leading-[1.2rem] sm:leading-normal rounded-full hover:shadow-lg  ${
          activeFilter
            ? `border-black text-black bg-[#f2f4f5]`
            : "text-gray-500 border-[#e8e8e8]"
        }`}
        // onClick={() => handleClick(name, option)}
        // style={{ border: "2px solid #e5e7eb" }}
      >
        <Link
          href={generateURL({
            cityVal: city,
            openHouse: true,
          })}
        >
          Open House
        </Link>
      </div>
    </div>
  );
};
