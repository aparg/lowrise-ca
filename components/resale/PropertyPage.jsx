"use client";
import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { format } from "date-fns";

import TimeAgo from "./TimeAgo";

//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

//CONSTANT
import Image from "next/image";
//ICONS

import WalkScore from "./WalkScore";
import formatCurrency from "@/helpers/formatCurrency";
import CompactMortgageCalculator from "./CompactMortgageCalculator";
import { houseType } from "@/constant";
import HomeOverview from "./HomeOverview";
import PropertyDescription from "./PropertyDescription";
import MapGoogle from "./MapGoogle";
import {
  Bed,
  Bath,
  Home,
  Car,
  House,
  Languages,
  Building2,
  Scan,
} from "lucide-react";
import OtherAmentities from "./OtherAmentities";
import MaintenanceItem from "./MaintenanceItem";
import NearbyPlacesGoogle from "./StreetViewGoogle";
import RoomInfo from "./RoomData";
import GetStatusReport from "./GetStatusReport";
import Link from "next/link";
import { generateURL } from "@/helpers/generateResaleURL";
import MarketComparisonChart from "./MarketComparisonChart";

const PropertyPage = ({
  main_data,
  room_data,
  analyticsData,
  openHouseData,
}) => {
  const [navbar, setNavbar] = useState(false);
  const { isMobileView } = useDeviceView();

  const price = formatCurrency(main_data?.ListPrice);

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

  const fullAddress = [
    [main_data.StreetNumber, main_data.StreetName, main_data.StreetSuffix]
      .filter(Boolean)
      .join(" "),
    main_data.City,
    main_data.Province,
    main_data.PostalCode,
  ]
    .filter((data) => !!data)
    .join(", ");

  const fullAddressGooglSearch = [
    [main_data.StreetNumber, main_data.StreetName, main_data.StreetSuffix]
      .filter(Boolean)
      .join(" "),
    main_data.City,
    main_data.Province,
    "CA",
  ]
    .filter((data) => !!data)
    .join(" ");

  return (
    <>
      <div className="col-12 mt-2">
        <div
          className={`border-0  rounded-md ${
            isMobileView ? "sm:p-4 pt-3 mt-3" : "mt-5"
          }`}
        >
          <div
            className={`flex flex-row sm:gap-x-28 flex-wrap items-center rounded-md ${
              isMobileView ? "gap-3" : "gap-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 md:space-x-20 sm:space-x-28 items-start w-full">
              <section className="flex justify-between items-start w-full">
                <div className="w-full">
                  {openHouseData && (
                    <div className="inline-flex items-center bg-white border text-xs px-3 py-1 rounded-md">
                      <span className="font-normal">
                        OPEN{" "}
                        {format(
                          openHouseData[openHouseData.length - 1]
                            .OpenHouseStartTime,
                          "EEE, h:mm a"
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mt-4">
                    <div className="w-full sm:w-auto">
                      <h1 className="text-xl sm:text-2xl font-semibold mb-1">
                        {[
                          main_data.StreetNumber,
                          main_data.StreetName,
                          main_data.StreetSuffix,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      </h1>
                      <div className="text-gray-600 text-sm sm:text-base">
                        <Link
                          href={generateURL({ cityVal: main_data.City })}
                          className="hover:text-blue-600"
                        >
                          {main_data?.City}
                        </Link>
                        {", "}
                        {[main_data.Province, main_data.PostalCode]
                          .filter((data) => !!data)
                          .join(", ")}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-2 mt-2">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Bed
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                            strokeWidth={1.5}
                          />
                          <span className="text-gray-900 text-sm sm:text-base">
                            {main_data.BedroomsTotal} Beds
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Bath
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                            strokeWidth={1.5}
                          />
                          <span className="text-gray-900 text-sm sm:text-base">
                            {main_data.BathroomsTotalInteger} Bath
                          </span>
                        </div>
                        {(main_data.BuildingAreaTotal ||
                          main_data.LivingAreaRange) && (
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Scan
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                              strokeWidth={1.5}
                            />
                            <span className="text-gray-900 text-sm sm:text-base">
                              {main_data.BuildingAreaTotal ||
                                main_data.LivingAreaRange}{" "}
                              sqft
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-normal">
                        <TimeAgo
                          modificationTimestamp={
                            main_data.ModificationTimestamp
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-auto sm:text-right">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                        {price}
                        {main_data.TransactionType === "For Lease" && (
                          <span className="text-base sm:text-lg"> /mo</span>
                        )}
                      </h3>
                      {main_data.TransactionType === "For Sale" && (
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                            <span className="text-gray-600">Est. Payment</span>
                            <div className="flex items-center gap-2">
                              <span className="font-normal text-sm sm:text-base">
                                $
                                {Math.round(
                                  ((main_data.ListPrice -
                                    main_data.ListPrice * 0.2) *
                                    (0.04 / 12) *
                                    Math.pow(1 + 0.04 / 12, 360)) /
                                    (Math.pow(1 + 0.04 / 12, 360) - 1)
                                ).toLocaleString()}
                                /mo*
                              </span>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById("mortgage-calculator")
                                    .scrollIntoView({ behavior: "smooth" })
                                }
                                className="bg-teal-600 text-white px-3 sm:px-4 py-1.5 rounded-md text-sm hover:bg-teal-700 transition-colors whitespace-nowrap"
                              >
                                Calculate
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            *Based on 20% down, 4% interest, 30-year term
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {main_data.ListOfficeName &&
                      main_data?.MlsStatus !== "Sold" && (
                        <div className="text-sm text-gray-600">
                          Listed by {main_data?.ListOfficeName}
                        </div>
                      )}

                    <div className="flex gap-2 text-sm text-gray-600">
                      <span>{main_data.PropertySubType}</span>
                      <span>•</span>
                      <span>MLS #{main_data.ListingKey}</span>
                      <span>•</span>
                      <span>{main_data.MlsStatus}</span>
                    </div>
                  </div>

                  {main_data?.PropertySubType.includes("Condo") && (
                    <>
                      <GetStatusReport />
                      <div className="text-sm text-gray-600 mt-2">
                        <Link
                          href={generateURL({
                            condoCorp: main_data.AssociationName,
                            cityVal: main_data.City,
                            condoCorpNumber: main_data.CondoCorpNumber,
                          })}
                          className="hover:text-blue-600"
                        >
                          Condo Corporation - {main_data.AssociationName} #
                          {main_data.CondoCorpNumber}
                        </Link>
                      </div>
                    </>
                  )}

                  {main_data.AssociationFeeIncludes.length > 0 && (
                    <div className="mt-4">
                      <MaintenanceItem
                        data={
                          Array.isArray(main_data?.AssociationFeeIncludes)
                            ? main_data?.AssociationFeeIncludes?.map((data) =>
                                data.replace("Included", "").trim()
                              )
                            : main_data?.AssociationFeeIncludes.split(",") ||
                              "N/A"
                        }
                        fee={main_data.AssociationFee}
                      />
                    </div>
                  )}

                  {analyticsData?.totalSimilar > 0 && (
                    <div className="mt-14">
                      <h2 className="font-extrabold text-sm sm:text-xl leading-0 mb-4">
                        Price comparison with similar homes in{" "}
                        <Link
                          href={generateURL({
                            cityVal: main_data.City,
                            houseTypeVal: main_data.PropertySubType,
                            saleLeaseVal: main_data.TransactionType,
                          })}
                          className="hover:underline underline-offset-4"
                        >
                          {main_data.City}
                        </Link>
                      </h2>

                      <div className="p-2 bg-white shadow rounded-xl border border-gray-100">
                        <div className="grid grid-cols-2 items-center gap-6">
                          <div>
                            <span className="text-sm text-gray-500">
                              Compared to {analyticsData?.totalSimilar}
                              {analyticsData?.totalSimilar > 1
                                ? " similar homes"
                                : " similar home"}
                            </span>
                            <div
                              className={`text-xl font-bold mt-1 ${
                                main_data.ListPrice >
                                (analyticsData?.avgPrice || 0)
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {(
                                ((main_data.ListPrice -
                                  (analyticsData?.avgPrice || 0)) /
                                  (analyticsData?.avgPrice || 1)) *
                                100
                              ).toFixed(1)}
                              %
                              {main_data.ListPrice >
                              (analyticsData?.avgPrice || 0)
                                ? " Higher"
                                : " Lower"}
                              {main_data.ListPrice >
                              (analyticsData?.avgPrice || 0)
                                ? "↑"
                                : "↓"}
                            </div>
                          </div>

                          <div>
                            <span className="text-sm text-gray-500">
                              Market Avg. of ({analyticsData?.totalSimilar || 0}{" "}
                              similar homes)
                            </span>
                            <div className="text-2xl font-bold text-gray-900">
                              $
                              {analyticsData?.avgPrice.toLocaleString(
                                "en-CA"
                              ) || 0}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg">
                        <MarketComparisonChart
                          currentPrice={main_data.ListPrice}
                          comparisons={[
                            {
                              name: `Similar Homes in ${main_data.City}`,
                              description: `${
                                analyticsData?.totalSimilar
                              } homes with ${main_data.BedroomsTotal} beds, ${
                                (main_data.WashroomsType1Pcs || 0) +
                                (main_data.WashroomsType2Pcs || 0)
                              } baths`,
                              price: analyticsData?.avgPrice || 0,
                            },
                            {
                              name: `${main_data.BedroomsTotal} Bed Homes`,
                              description: `Average of ${
                                analyticsData?.bedroomCount || 0
                              } homes`,
                              price: analyticsData?.avgPriceBedrooms || 0,
                            },
                            {
                              name: main_data.PropertySubType,
                              description: `Average of ${
                                analyticsData?.propertyTypeCount || 0
                              } ${main_data.PropertySubType} homes in ${
                                main_data.City
                              }`,
                              price: analyticsData?.avgPriceType || 0,
                            },
                          ]}
                        />
                        <p className="text-sm text-gray-500">
                          Note <span className="text-red-600">*</span> Price
                          comparison is based on the similar properties listed
                          in the area and may not be accurate. Consult licences
                          real estate agent for accurate comparison
                        </p>
                      </div>
                    </div>
                  )}

                  <RoomInfo data={room_data} />
                </div>
              </section>
            </div>
          </div>
        </div>
        {/* Description */}

        <div className="mt-6 sm:mt-8 pt-4">
          <h2 className="font-extrabold text-2xl sm:text-3xl leading-0 mb-2">
            Client Remarks{" "}
          </h2>
          <div className="text-justify text-gray-600 font-normal">
            {main_data.PublicRemarks}
          </div>
        </div>
        <PropertyDescription main_data={main_data} fullAddress={fullAddress} />

        {/* Extras */}
        {main_data?.Extras && (
          <div className={`${isMobileView ? "pt-4 pb-4" : "pt-4 pb-4"}`}>
            <div className="col-md-12 px-0">
              <div className="container rounded-md p-4 border-0">
                <h2 className="font-bold text-xl sm:text-xl">Extras</h2>
                <div className="flex flex-grid text-lg py-1 leading-8">
                  {main_data.Extras}
                </div>
              </div>
            </div>
          </div>
        )}
        {/*Home Overview  */}
        <HomeOverview main_data={main_data} />
        {main_data.AssociationAmenities.length > 0 && (
          <OtherAmentities amenities={main_data.AssociationAmenities} />
        )}
      </div>
      {main_data.UnparsedAddress && (
        <div className={isMobileView ? `mt-12 col-12` : `mt-12 col-12`}>
          <div className="sm:text-2xl py-3 flex items-start">
            <div>
              <Image
                width={50}
                height={50}
                alt="satellite view"
                className="w-8 sm:w-10 inline mr-2"
                src="/icons/home_address.png"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-extrabold pb-0 text-2xl sm:text-3xl">
                Walk around the neighborhood
              </div>
              <span className="text-sm font-normal leading-2">
                {fullAddress}
              </span>
            </div>
          </div>
          <MapGoogle location={main_data.UnparsedAddress} zoom={14} />
        </div>
      )}
      <div className="col-12 mt-6">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <Image
                src="/shally.jpeg"
                alt="Sales Representative"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold leading-0">
                    Shally Shi
                  </h3>
                  <p className="text-gray-600 leading-0">
                    Sales Representative, Dolphin Realty Inc
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Languages className="w-5 h-5" />
                <span className="text-sm leading-0">English, Mandarin</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <Home className="w-4 h-4" />
                    Residential Resale
                  </span>
                  <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <Building2 className="w-4 h-4" />
                    Property Management
                  </span>
                  <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <Building2 className="w-4 h-4" />
                    Pre Construction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {main_data.TransactionType === "For Sale" && (
        <div
          id="mortgage-calculator"
          className={isMobileView ? `mt-12 col-12` : `mt-24 col-12`}
        >
          <div className="bg-white rounded-xl border p-6">
            <CompactMortgageCalculator
              price={main_data?.ListPrice}
              showDetails={false}
              align="left"
            />
          </div>
        </div>
      )}

      <div className={isMobileView ? `mt-14 col-12` : `mt-24 col-12`}>
        <h2 className="font-bold pb-3 text-lg sm:text-2xl pt-3">
          <Image
            width={50}
            height={50}
            alt="walking  "
            className="w-8 sm:w-10 inline mr-2"
            src="/property-page-img/walking.svg"
          />
          Walk Score for {main_data.StreetNumber} {main_data.StreetName}{" "}
          {main_data.StreetSuffix}
        </h2>

        <div>
          <WalkScore
            address={`${main_data.StreetNumber} ${main_data.StreetName} ${
              main_data.StreetSuffix
            }, ${main_data.City.split(" ")[0]}, ON`}
            width={isMobileView ? 350 : 600}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
