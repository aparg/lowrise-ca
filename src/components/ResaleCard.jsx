"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { residential } from "@/_resale-api/routes/fetchRoutes";
import { houseType, saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";

import Favorite from "./Favorite";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { getImageUrls } from "@/_resale-api/getSalesData";
import { Skeleton } from "./ui/skeleton";
import SignInVOW from "./SignInVOW";
import { Clock } from "lucide-react";
import { cityRegions } from "@/constant/postalCodeCities";

const ResaleCard = ({
  curElem,
  small = false,
  showDecreasedPrice = false,
  isHotListing,
  soldData,
  openHouse = false,
}) => {
  // const [address, setAddress] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const price = Number(
    !soldData ? curElem.ListPrice : curElem.ClosePrice
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.ListingKey,
    index: 1,
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

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

  // Favoriting
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (
      window.localStorage.getItem("favorites") &&
      JSON.parse(window.localStorage.getItem("favorites")).includes(
        curElem.ListingKey
      )
    ) {
      setIsFavorite(true);
    }
    setLoadingImage(true);
    getImageUrls({
      MLS: curElem.ListingKey,
      thumbnailOnly: true,
      soldData: true,
    }).then((urls) => {
      setImgUrl(urls[0]);
      setLoadingImage(false);
    });
  }, []);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favoriteValue = window.localStorage.getItem("favorites");
    if (!isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      favorites.push(curElem.ListingKey);
      const value = JSON.stringify(favorites);
      window.localStorage.setItem("favorites", value);
    } else if (isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      const value = JSON.stringify(
        favorites.filter((val) => val !== curElem.ListingKey)
      );
      window.localStorage.setItem("favorites", value);
    }

    setIsFavorite(!isFavorite);
  };
  const region = cityRegions.find((cityRegion) =>
    cityRegion.regions.includes(curElem.City)
  );
  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-2xl p-0 hover:shadow-lg hover:rounded-t-2xl  hover:-translate-y-1 overflow-hidden">
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
          <div className={`flex flex-col overflow-hidden relative`}>
            <div
              className={`${
                small ? "h-32 sm:h-52" : "h-52 sm:h-52"
              } overflow-hidden relative`}
            >
              <div
                className={`${
                  small ? "h-32 sm:h-52" : "h-52 sm:h-52"
                } sm:h-52 relative z-10 rounded-t-2xl rounded-b-2xl overflow-hidden`}
              >
                {/* {loadingImage ? (
                  <Skeleton className="object-cover w-full h-full rounded-t-2xl rounded-b-2xl bg-gray-200" />
                ) : imgUrl ? (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                    src={imgUrl}
                    alt="property image"
                    onError={(e) => {
                      console.log("Trigerring error");
                      handleImageError(e);
                    }}
                  />
                ) : ( */}
                <img
                  className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                  src="/noimage.webp"
                  alt="property image"
                  onError={(e) => {
                    console.log("Trigerring error");
                    handleImageError(e);
                  }}
                />
                {/* )} */}

                {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
              </div>
              {isHotListing && (
                <div className="text-white text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-slate-800 items-center absolute top-3 left-2 z-20">
                  <span>🔥 New Listing</span>
                </div>
              )}

              <div className="absolute bottom-3 left-2 flex sm:flex-row z-20">
                <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                  {curElem.PropertySubType}{" "}
                </div>
              </div>
            </div>
            <div className="flex-1 sm:px-3 pt-2 pb-4 px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="font-bold text-2xl sm:text-2xl items-center justify-start mt-2 sm:my-2">
                  {curElem.OriginalListPrice > curElem.ListPrice &&
                    curElem.PriceChangeTimestamp && (
                      <div className="flex items-center gap-1 mb-1">
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
                        <span className="text-sm text-green-500 font-medium">
                          {Math.round(
                            ((curElem.OriginalListPrice - curElem.ListPrice) /
                              curElem.OriginalListPrice) *
                              100
                          )}
                          % reduced
                        </span>
                      </div>
                    )}
                  <span className="font-bold text-black">{price}</span>
                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                </h2>
                <div className="text-xs font-medium text-black mb-1 sm:mb-0 flex items-center">
                  {!soldData ? (
                    <>
                      <TimeAgo
                        modificationTimestamp={curElem.OriginalEntryTimestamp}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {openHouse && (
                <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#ffffff] items-center absolute top-3 left-2 z-20 font-bold">
                  OPEN HOUSE
                </div>
              )}
              {openHouse && (
                <div className="text-white text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#2b2a2a] items-center absolute top-10 left-2 sm:top-3 sm:left-28 z-20 font-bold">
                  {`${new Date(curElem.OpenHouseStartTime)
                    .toLocaleString("en-US", {
                      weekday: "short",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(/:\d{2} /, " ")} - ${new Date(
                    curElem.OpenHouseEndTime
                  )
                    .toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(/:\d{2} /, " ")}`}
                </div>
              )}

              <span className={`text-black text-xs`}>
                <div className="flex flex-row justify-start">
                  {curElem.BedroomsTotal && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(curElem.BedroomsTotal)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {curElem.BathroomsTotalInteger && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.BathroomsTotalInteger)}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}

                  {curElem.LotSizeArea && Number(curElem.LotSizeArea) > 0 && (
                    <div>
                      <img
                        src="/resale-card-img/ruler.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.LotSizeArea) ||
                          Math.floor(
                            Number(curElem.LotWidth) * Number(curElem.LotDepth)
                          ) ||
                          ""}{" "}
                        <span className="hidden sm:inline">Sq. Ft.</span>
                      </span>
                    </div>
                  )}
                </div>
              </span>
              <div className="flex flex-row justify-between my-1">
                <div className="text-black">
                  <div className="text-gray-500 text-xs truncate">
                    {curElem.StreetName ? (
                      `${curElem.StreetNumber} ${curElem.StreetName} ${curElem.StreetSuffix} ${curElem.City}, Ontario...`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-gray-500 text-[9px] truncate">
                Listed by {curElem.ListOfficeName}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`absolute ${
          small
            ? "top-[0.5rem] sm:top-[0.5rem]"
            : "sm:top-[0.5rem] top-[0.5rem]"
        } right-2 z-10`}
      >
        <Favorite
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          MLS={curElem.ListingKey}
          size={6}
        />
      </div>
    </section>
  );
};

export default ResaleCard;

export const LockedResaleCard = ({ curElem, setSignedIn }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

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
  useEffect(() => {
    setLoadingImage(true);
    getImageUrls({ MLS: curElem.ListingKey, thumbnailOnly: true }).then(
      (urls) => {
        setImgUrl(urls[0]);
        setLoadingImage(false);
      }
    );
  }, []);
  return (
    <div className="lg:px-0 h-full w-full">
      <div className={`flex flex-col overflow-hidden relative`}>
        <div className={`${"h-52 sm:h-80"} overflow-hidden relative`}>
          <div
            className={`${"h-52 sm:h-80"} sm:h-80 relative z-10 rounded-t-2xl`}
          >
            {loadingImage ? (
              <Skeleton className="object-cover w-full h-full rounded-t-2xl" />
            ) : imgUrl ? (
              <img
                className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-2xl blur-[2px]"
                src={imgUrl}
                width="900"
                height="800"
                alt="property image"
                onError={(e) => {
                  console.log("Trigerring error");
                  handleImageError(e);
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <img src="/icons/no-photo.png" className="w-10 h-10" />
                <p>No Image Found</p>
              </div>
            )}
            <SignInVOW setSignedIn={setSignedIn} />
            <div className="bg-white text-black absolute bottom-2 mx-2 rounded-md p-1 border-2 border-black text-xs sm:text-md">
              Local MLS®️ rules require you to log in and accept their terms of
              use to view certain listing data.
            </div>
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
          </div>
        </div>
      </div>
      <Skeleton className={`w-36 h-4 mt-2 bg-gray-100`}></Skeleton>
      <Skeleton className={`sm:w-56 h-4 mt-2 bg-gray-100`}></Skeleton>
      <Skeleton className={`w-18 h-4 mt-2 bg-gray-100`}></Skeleton>
      <Skeleton className={`w-18 h-4 mt-2 bg-gray-100`}></Skeleton>
    </div>
  );
};
