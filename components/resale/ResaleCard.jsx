"use client";
import Link from "next/link";
import React, { useState } from "react";
import TimeAgo from "./TimeAgo";
import { saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";
import { cityRegions } from "@/constant/postalCodeCities";

const ResaleCard = ({
  curElem,
  small = false,
  showDecreasedPrice = false,
  isHotListing,
  soldData,
  openHouse = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const price = Number(
    !soldData ? curElem.ListPrice : curElem.ClosePrice
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  // Calculate price drop info
  const priceDropInfo = React.useMemo(() => {
    if (
      !curElem.OriginalListPrice ||
      curElem.ListPrice >= curElem.OriginalListPrice
    ) {
      return null;
    }

    const dropAmount = curElem.OriginalListPrice - curElem.ListPrice;
    const dropPercentage = (dropAmount / curElem.OriginalListPrice) * 100;

    return {
      amount: dropAmount,
      percentage: dropPercentage.toFixed(1),
    };
  }, [curElem.ListPrice, curElem.OriginalListPrice]);

  const streetAndMLS = (() => {
    const parts = [];
    if (curElem.StreetNumber) {
      parts.push(curElem.StreetNumber.replace("/", "-"));
    }
    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }
    if (curElem.StreetSuffix) {
      parts.push(curElem.StreetSuffix);
    }
    if (curElem.ListingKey) {
      parts.push(curElem.ListingKey);
    }
    return parts.filter(Boolean).join("-");
  })();

  const region = cityRegions.find((cityRegion) =>
    cityRegion.regions.includes(curElem.City)
  );

  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-xl p-0 hover:shadow-lg hover:rounded-t-2xl hover:-translate-y-1 overflow-hidden">
      <Link
        href={generateURL({
          cityVal: region?.name || curElem.City,
          listingIDVal: streetAndMLS,
          soldData: soldData,
          openHouse: openHouse,
        })}
        className="text-black"
      >
        <div className="lg:px-0 h-full w-full">
          <div className="flex flex-col overflow-hidden relative">
            {/* Image Container */}

            <div className={`h-64 sm:h-64 overflow-hidden relative`}>
              <div className="h-64 relative z-10 rounded-t-2xl rounded-b-2xl overflow-hidden">
                <img
                  className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                  src={curElem?.imageUrl?.medium || "/noimage.webp"}
                  alt={`${curElem.StreetNumber} ${curElem.StreetName} ${curElem.StreetSuffix}`}
                />
              </div>

              {/* Property Type Badge */}
              <div className="absolute bottom-3 left-2 flex sm:flex-row z-20">
                {curElem.PropertySubType?.trim() && (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                    {curElem.PropertySubType?.trim()}
                  </div>
                )}
                {isHotListing ? (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#f0fff4] items-center flex gap-1">
                    <span className="relative flex h-1 w-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500"></span>
                    </span>
                    <span>Just Listed</span>
                  </div>
                ) : (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white items-center flex gap-1">
                    <TimeAgo
                      modificationTimestamp={curElem.ModificationTimestamp}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content Section - Different styles for mobile and desktop */}
            <div className="flex-1 sm:px-3 pt-2 px-2">
              {/* Price Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex flex-col">
                  {/* Price Drop Info - Keeping original styling */}
                  {priceDropInfo && (
                    <div className="text-red-500 text-[13px] flex items-center">
                      <span className="text-red-500 font-extrabold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      ${priceDropInfo.amount.toLocaleString()}
                      <span className="text-black ps-1">
                        ({priceDropInfo.percentage}% reduced)
                      </span>
                    </div>
                  )}
                  {/* Price - Larger on desktop */}
                  <span className="font-bold text-2xl md:text-2xl items-center justify-start mt-0">
                    {price}
                    {curElem.SaleLease === saleLease.lease.value && (
                      <span className="text-xs text-gray-600"> /mo</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <span className="text-black text-xs md:text-sm">
                <div className="flex flex-row justify-start md:gap-4 mt-1">
                  {curElem.BedroomsTotal && (
                    <div className="flex items-center mr-1 md:mr-0">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 md:w-4 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(curElem.BedroomsTotal)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {curElem.BathroomsTotalInteger && (
                    <div className="flex items-center mr-1 md:mr-0">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-4 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.BathroomsTotalInteger)}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}
                  {curElem.LivingAreaRange && (
                    <div className="flex items-center">
                      <img
                        src="/resale-card-img/ruler.svg"
                        className="w-3 md:w-4 mr-[3px] inline"
                        alt="ruler"
                      />
                      <span className="hidden sm:inline">
                        {curElem.LivingAreaRange} Sqft.
                      </span>
                    </div>
                  )}
                </div>
              </span>

              {/* Address - Full width on desktop */}
              <div className="text-dark text-xs md:text-sm mt-1 truncate leading-1 md:w-full">
                {curElem.StreetNumber} {curElem.StreetName}{" "}
                {curElem.StreetSuffix} {curElem.City}, {curElem.StateOrProvince}
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 mt-1 whitespace-nowrap leading-none pb-2">
                Listed by: {curElem.ListOfficeName}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ResaleCard;
