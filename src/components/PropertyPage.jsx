"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";

import TimeAgo from "@/components/TimeAgo";

//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

//CONSTANT
import Collapse from "@/components/Collapse";
import Image from "next/image";
//ICONS

import { priceFormatter } from "@/helpers/priceFormatter";
import Link from "next/link";
import MortgageCalculator from "./MortgageCalculator";
import formatCurrency from "@/helpers/formatCurrency";
import CompactMortgageCalculator from "./CompactMortgageCalculator";
import { houseType } from "@/constant";

const PropertyPage = ({ main_data }) => {
  const [navbar, setNavbar] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const { isMobileView } = useDeviceView();
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  const toggleShowMore = () => {
    setShowMoreDesc(!showMoreDesc);
  };

  const getCommunityFeatures = () => {
    const {
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    } = main_data;

    return [
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    ].join(", ");
  };

  const formatNumber = (value) => {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US");
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  };

  const handleScrollToContactAgent = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dashedStreetName = `${main_data.Street}-${main_data.StreetName}-${main_data.StreetAbbreviation}`;

  const price = formatCurrency(main_data?.ListPrice);
  const TaxAnnualAmount = formatCurrency(main_data?.Taxes);
  const AssociationFee = formatCurrency(main_data?.AddlMonthlyFees);

  const priceDecreased = useMemo(() => {
    if (
      parseFloat(main_data.MinListPrice) === parseFloat(main_data.ListPrice) &&
      parseFloat(main_data.ListPrice) < parseFloat(main_data.MaxListPrice)
    ) {
      return true;
    }
    return false;
  }, [main_data.MaxListPrice, main_data.ListPrice, main_data.MinListPrice]);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 870) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }
  }, []);

  const typeOwnSrchToName = {};
  Object.values(houseType).forEach(
    (item) => (typeOwnSrchToName[item.value] = item.name)
  );

  useEffect(() => {
    // Check if content is overflowing
    if (contentRef.current) {
      const element = contentRef.current;
      // Compare the scrollHeight with clientHeight to determine if the text overflows
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [main_data.RemarksForClients]);

  // const sendNotes = async () => {
  //   const response = await fetch("https://rets.dolphy.ca/notes/residential", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       // Your data here
  //       message: "new test message",
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  return (
    <>
      <div className="screenshot col-12 mt-2">
        <div
          className={`border-0  rounded-md ${
            isMobileView ? "sm:p-4 pt-3 mt-3" : "mt-5"
          }`}
        >
          <div
            className={`flex flex-col flex-wrap${
              isMobileView ? "gap-3" : "gap-0"
            }`}
          >
            <div className="flex flex-col space-y-2">
              <h3 className="text-5xl font-bold">{price}</h3>
              {/* <button onClick={sendNotes}>Go!</button> */}
              <div className="space-x-2 block sm:hidden">
                <button className="bg-[#CC0B0B] p-1 text-white text-xs font-bold mt-1 sm:my-0 w-fit-content rounded-md">
                  <TimeAgo modificationTimestamp={main_data.TimestampSql} />
                </button>
                <button className="bg-[#CC0B0B] p-1 text-white text-xs font-bold mt-1 sm:my-0 w-fit-content rounded-md">
                  <span>{main_data.TypeOwn1Out}</span>
                </button>
              </div>
              {/* <div className="flex items-center">
                        <Image
                          width={20}
                          height={20}
                          className="w-4 h-4 mx-1"
                          src="/property-page-img/price-reduced.png"
                          alt="reduced"
                        ></Image>
                        <span className=" text-green-700 text-lg font-medium">
                          C$
                          {priceDecreased &&
                            priceFormatter(
                              parseFloat(main_data.MaxListPrice) -
                                parseFloat(main_data.ListPrice)
                            )}
                        </span>
                      </div> */}
            </div>
            <h1 className="fs-6 mt-0 mb-1 text-lg">
              {main_data.Street} {main_data.StreetName}{" "}
              {main_data.StreetAbbreviation}, {main_data.Municipality},{" "}
              {main_data.Province}, {main_data.PostalCode}
            </h1>
            <div>
              <button className="bg-gray-200 mt-4 sm:py-1 px-2 text-black sm:text-xs font-semibold mb-1 w-fit-content rounded-md text-left py-[0.5px] text-[0.65rem]">
                <span>
                  Average price for {typeOwnSrchToName[main_data?.TypeOwnSrch]}{" "}
                  properties in {main_data.Municipality}: $
                  {main_data.avg.toLocaleString()}
                </span>
              </button>
            </div>

            <div className="rounded-md flex items-center">
              <div className="flex justify-content-center align-items-center gap-1 text-lg">
                <img
                  src="/property-page-img/bedrooms.svg"
                  alt="bedrooms"
                  className="w-4"
                />{" "}
                {main_data.Bedrooms} Bedroom
              </div>
              <span className="text-lg mx-1">|</span>
              <div className="flex justify-content-center align-items-center gap-1 text-lg">
                <img
                  src="/property-page-img/bathrooms.svg"
                  alt="washrooms"
                  className="w-4"
                />{" "}
                {main_data.Washrooms} Bathroom
              </div>
              {main_data.GarageSpaces && (
                <>
                  <span className="text-lg">&nbsp;|&nbsp;</span>
                  <div className="flex justify-content-center align-items-center gap-1 text-lg ">
                    <img
                      src="/property-page-img/garage.svg"
                      alt="garages"
                      className="w-3"
                    />{" "}
                    {Math.trunc(main_data.GarageSpaces)} Garage
                  </div>
                </>
              )}
            </div>
            <p className="card-subtitle my-1 font-normal text-lg">
              MLS - #{main_data.MLS}{" "}
            </p>
            <h1 className="vmain-title">
              <div className="uppercase bannerSection text-lg">
                FOR {main_data.SaleLease}
              </div>
            </h1>
            {/* <CompareButton main_data={main_data} width={8} /> */}
            {/* <div className="flex flex-col font-md mt-2 text-lg">
                <p class className="">
                  {main_data.Municipality}, {main_data.Province},{" "}
                  {main_data.PostalCode}
                </p>
              </div> */}
          </div>
        </div>
        {/* <div className="border-b border-[0.5px] border-gray-200 mt-2 sm:mt-0 sm:ml-4"></div> */}
        {/* Description */}
        <div className={`${isMobileView ? "pt-4 mt-12" : "mt-12 pt-4"}`}>
          <div className="border-0 rounded-md bg-very-light-gray p-3 sm:p-4">
            <h2 className="font-extrabold text-2xl sm:text-4xl">
              Property Description <br />
              <h2 className="font-normal text-lg sm:text-2xl sm:mt-2 mb-1 sm:mb-3">
                {main_data.Street} {main_data.StreetName}{" "}
                {main_data.StreetAbbreviation}, {main_data.Municipality},{" "}
                {main_data.Province}
              </h2>
            </h2>
            {/* <p className="text-lg pty-description pt-2 pb-4 leading-8">
              {main_data.RemarksForClients}
            </p> */}
            <p
              className={`text-lg pty-description pt-2 sm:leading-8 ${
                showMoreDesc ? "" : "line-clamp-4 sm:line-clamp-6"
              }`}
              ref={contentRef}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {main_data.RemarksForClients}
            </p>

            {/* <div
              className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Last check for updates
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  <TimeAgo modificationTimestamp={main_data.TimestampSql} />
                </p>
              </div>
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Property type
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {main_data.TypeOwn1Out}
                </p>
              </div>
            </div> */}

            <div
              className={`grid grid-cols-2 md:grid-cols-4 w-full ${
                isMobileView ? "flex-wrap" : "flex-nowrap"
              }`}
            >
              <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pr-0">
                <p className="font-bold text-black">Property type</p>
              </div>
              <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pl-0">
                <p className="text-black">{main_data.TypeOwn1Out}</p>
              </div>
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 border-sm py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">Lot size</p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 border-sm py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {main_data.LotFront} X {main_data.LotDepth} Feet
                </p>
              </div>
            </div>
            <div
              className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">Style </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">{main_data.Style}</p>
              </div>
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Approx. Area
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {main_data.ApproxSquareFootage} Sqft
                </p>
              </div>
            </div>
            <div
              className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">Taxes</p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">{TaxAnnualAmount}</p>
              </div>
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">Tax year</p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">{main_data.TaxYear}</p>
              </div>
            </div>
            <div
              className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Garage spaces
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {formatNumber(main_data.GarageSpaces)}
                </p>
              </div>
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">Mls® #</p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">{main_data.MLS}</p>
              </div>
            </div>
            {isOverflowing && (
              <button
                className="mt-2 px-2 border-2 border-black py-[3px] text-white font-semibold rounded-lg bg-black hover:text-black hover:bg-gray-200 focus:outline-none transition-colors duration-200 sm:my-2 mt-2 mb-4"
                onClick={toggleShowMore}
              >
                {showMoreDesc ? "See Less ↑" : "See More ↓"}
              </button>
            )}
          </div>
        </div>
        {/* Extras */}
        {main_data?.Extras && (
          <div className={`${isMobileView ? "pt-4 pb-4" : "pt-4 pb-4"}`}>
            <div className="col-md-12 px-0">
              <div className="container bg-very-light-gray rounded-md p-4 border-0">
                <h2 className="font-bold text-xl sm:text-xl">Extras</h2>
                <div className="flex flex-grid text-lg py-1 leading-8">
                  {main_data.Extras}
                </div>
              </div>
            </div>
          </div>
        )}
        {/*Home Overview  */}
        <div
          className={`${isMobileView ? "pt-4 pb-4 mt-12" : "mt-12 pt-4 pb-4"}`}
        >
          <div className="p-4 rounded-md bg-very-light-gray  border-0">
            <h2 className="font-extrabold pb-3 text-2xl sm:text-4xl">
              Home Overview
            </h2>
            <div
              className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pr-0">
                <p className="font-bold text-black">Last check for updates</p>
              </div>
              <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pl-0">
                <p className="text-black">
                  <TimeAgo modificationTimestamp={main_data.TimestampSql} />
                </p>
              </div>

              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Virtual tour
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  <Link href={main_data.VirtualTourURL || ""} target="_blank">
                    Tour Now
                  </Link>
                </p>
              </div>
            </div>

            <div
              className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Basement information
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {main_data?.Basement1
                    ? `${main_data?.Basement1}, ${main_data?.Basement2}`
                    : "None"}
                </p>
              </div>

              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Building size
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {main_data.ApproxSquareFootage}
                </p>
              </div>
            </div>

            <div
              className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">Status</p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {main_data.Status === "A" ? "Active" : "In-Active"}
                </p>
              </div>
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Property sub type
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {/* {main_data.PropertySubType} */}
                </p>
              </div>
            </div>

            <div
              className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                isMobileView ? "flex-wrap" : "flex-nowrap "
              }`}
            >
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">
                  Maintenance fee
                </p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">{AssociationFee}</p>
              </div>
              <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                <p className="cardd-subtitle_bg-black font-bold">Year built</p>
              </div>
              <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                <p className="cardd-subtitle_bg-black">
                  {main_data.AssessmentYear || "--"}
                </p>
              </div>
            </div>

            <div
              className={`block ${collapse ? "hidden" : "block"}`}
              id="collapseExample"
            >
              {/* Interior */}
              <h5 className="py-2 font-bold pt-5">Interior</h5>
              <div
                className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    # total bathrooms
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.Washrooms}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    # Full baths
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.Washrooms}
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    # of above grade bedrooms
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.Bedrooms}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    # of rooms
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {Number(main_data.Rooms) + Number(main_data.RoomsPlus)}
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Family room available
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {Boolean(Number(main_data.FamilyRoom) > 0) ? "Yes" : "No"}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Laundry information
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.LaundryLevel}
                  </p>
                </div>
              </div>

              {/* Exterior */}
              <h5 className="py-2 font-bold pt-5">Exterior</h5>
              <div
                className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Construction materials
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.Exterior1}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Other structures
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.OtherStructures1}
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    # garage spaces
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {formatNumber(main_data.GarageSpaces)}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    # parking spaces
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.ParkingSpaces}
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Garage features
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.GarageType}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Has basement (y/n)
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.Basement1 ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Has garage (y/n)
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.GarageType ? "Yes" : "No"}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">Drive</p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">{main_data.Drive}</p>
                </div>
              </div>

              {/* Amenities / Utilities */}
              <h5 className="py-2 font-bold pt-5">Amenities / Utilities</h5>
              <div
                className={`grid grid-cols-2 md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">Cooling</p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.AirConditioning}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Heat source
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data?.HeatSource}
                  </p>
                </div>
              </div>
              <div
                className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">Heat type</p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data?.HeatType}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">Sewers</p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">{main_data?.Sewers}</p>
                </div>
              </div>

              {/* Location */}
              <h5 className="py-2 font-bold pt-5">Location</h5>
              <div
                className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Water source
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">{main_data.Water}</p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">Area</p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">{main_data.Area}</p>
                </div>
              </div>
              <div
                className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">Community</p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.Community}
                  </p>
                </div>
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Community features
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {getCommunityFeatures()}
                  </p>
                </div>
              </div>
              <div
                className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
                  isMobileView ? "flex-wrap" : "flex-nowrap "
                }`}
              >
                <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
                  <p className="cardd-subtitle_bg-black font-bold">
                    Directions
                  </p>
                </div>
                <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
                  <p className="cardd-subtitle_bg-black">
                    {main_data.DirectionsCrossStreets}
                  </p>
                </div>
              </div>
            </div>
            {/* see more */}

            {/* <div className="pt-3">
              <Collapse> </Collapse>
            </div> */}
            <button
              onClick={() => setCollapse(!collapse)}
              className="bg-black font-bold mt-2 px-2 border-2 border-black py-1 text-white font-semibold rounded-lg hover:text-black hover:bg-gray-200 focus:outline-none transition-colors duration-200 sm:my-2 mt-2 mb-4 "
            >
              See {collapse ? "More ↓" : "Less ↑"}
            </button>
          </div>
        </div>

        {main_data.ListBrokerage && (
          <div className="flex flex-grid text-xs font-medium py-1 text-gray-700">
            Listed by {main_data?.ListBrokerage}
          </div>
        )}
      </div>
      <div className={isMobileView ? `mt-12 col-12` : `mt-24 col-12`}>
        <CompactMortgageCalculator
          price={main_data?.ListPrice}
          showDetails={false}
          align="left"
        />
      </div>
      <div className={isMobileView ? `mt-14 col-12` : `mt-24 col-12`}>
        <h2 className="font-bold pb-3 text-lg sm:text-2xl pt-3">
          <Image
            width={50}
            height={50}
            alt="walking  "
            className="w-8 sm:w-10 inline mr-2"
            src="/property-page-img/walking.svg"
          />
          Walk Score for {main_data.Street} {main_data.StreetName}{" "}
          {main_data.StreetAbbreviation}
        </h2>

        <div className="">
          <div className="">
            <div className="walkscore-container mt-2 rounded-mine">
              <script type="text/javascript"></script>
              {/* <div id="ws-walkscore-tile" className="ham2 w-full"> */}
              <iframe
                height="500px"
                title="Walk Score"
                className="ham p-0"
                width="100%"
                src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=${dashedStreetName},${main_data.Municipality}&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737`}
              ></iframe>
              {/* </div> */}
              <script
                type="text/javascript"
                src="/property-page-imghttps://www.walkscore.com/tile/show-walkscore-tile.php"
              ></script>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
