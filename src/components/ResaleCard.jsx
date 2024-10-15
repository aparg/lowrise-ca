"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "@/helpers/TimeAgo";
import { residential } from "../api/routes/fetchRoutes";
import { houseType, saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateURL";
import useDeviceView from "@/helpers/useDeviceView";
import MobileCityResoCard from "./MobileCityResoCard";
import { priceFormatter } from "@/helpers/priceFormatter";
import Image from "next/image";
import Favorite from "./Favorite";
import { toggle } from "@nextui-org/react";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

const ResaleCard = ({ curElem, small = false, showDecreasedPrice = false }) => {
  // const [address, setAddress] = useState("");

  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  };
  const imgSrc = residential.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  // const streetAndMLS = curElem.StreetName
  //   ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
  //       curElem.StreetAbbreviation
  //     }-${curElem.MLS}`
  //   : curElem.MLS;

  const streetAndMLS = (() => {
    const parts = [];

    if (curElem.Street) {
      parts.push(curElem.Street);
    }

    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }

    if (curElem.StreetAbbreviation) {
      parts.push(curElem.StreetAbbreviation);
    }

    if (curElem.MLS) {
      parts.push(curElem.MLS);
    }

    return parts.filter(Boolean).join("-");
  })();

  // Favoriting
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (
      window.localStorage.getItem("favorites") &&
      JSON.parse(window.localStorage.getItem("favorites")).includes(curElem.MLS)
    ) {
      setIsFavorite(true);
    }
  });
  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favoriteValue = window.localStorage.getItem("favorites");
    if (!isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      favorites.push(curElem.MLS);
      const value = JSON.stringify(favorites);
      window.localStorage.setItem("favorites", value);
    } else if (isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      const value = JSON.stringify(
        favorites.filter((val) => val !== curElem.MLS)
      );
      window.localStorage.setItem("favorites", value);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-2xl p-0 hover:shadow-lg hover:rounded-t-2xl  hover:-translate-y-1 overflow-hidden">
      <Link
        href={generateURL({
          cityVal: curElem.Municipality,
          listingIDVal: streetAndMLS,
        })}
        className="text-black"
      >
        <div className="lg:px-0 h-full w-full">
          <div
            className={`flex flex-col overflow-hidden relative`}
          >
            <div
              className={`${
                "h-52 sm:h-80"
              } overflow-hidden relative`}
            >
              <div
                className={`${
                  small ? "h-44" : "h-52 sm:h-80"
                } sm:h-80 relative z-10 rounded-t-2xl`}
              >
                <img
                  className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-2xl"
                  src={imgSrc}
                  width="900"
                  height="800"
                  alt="property image"
                  onError={handleImageError}
                />

                {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
              </div>

              <div className="absolute bottom-3 left-2 flex flex-row z-20">
                <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                  {curElem.TypeOwn1Out}{" "}
                </div>
                {curElem.ApproxSquareFootage && (
                    <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white items-center hidden sm:block">
                      <img
                        src="/resale-card-img/ruler.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>{curElem.ApproxSquareFootage} Sq.Ft.</span>
                    </div>
                  )}
                {/* <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                </div> */}
              </div>
            </div>
            <div className="flex-1 sm:px-3 pt-2 pb-4 px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="font-bold text-2xl sm:text-2xl items-center justify-start mt-2 sm:my-2">
                  <span className="font-bold text-black">{price}</span>
                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                </h2>
                <div className="text-xs font-medium text-[#CC0B0B] mb-1 sm:mb-0">
                  <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                </div>
              </div>
              {/* <p className="mb-0 fs-mine text-limit font-md pb-0">
                  {" "}
                  MLS® #{curElem.MLS}
                </p> */}
              <span className={`text-black text-xs`}>
                <div className="flex flex-row justify-start">
                  {curElem.Bedrooms && (
                    <div className="flex items-center mr-3">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(curElem.Bedrooms)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {curElem.Washrooms && (
                    <div className="flex items-center mr-3">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.Washrooms)}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}
                  {curElem.GarageSpaces && (
                    <div className="flex items-center mr-3">
                      <img
                        src="/resale-card-img/garage.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.GarageSpaces)}{" "}
                        <span className="hidden sm:inline">Garage</span>
                      </span>
                    </div>
                  )}
                  
                </div>
              </span>
              <div className="flex flex-row justify-between my-1">
                <div className="text-black">
                  <div className="text-dark text-sm">
                    {curElem.StreetName ? (
                      `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation} ${
                        curElem.Municipality
                      }, Ontario`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600">MLS® {curElem.MLS}</div>
              <div className="text-xs text-gray-600">
                Listed by {curElem.ListBrokerage}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`absolute ${
          small ? "top-[8rem] sm:top-[10rem]" : "sm:top-[18.5rem] top-[9rem]"
        } right-2 z-10`}
      >
        <Favorite
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          MLS={curElem.MLS}
          size={4}
        />
      </div>
    </section>
  );
};

export default ResaleCard;
