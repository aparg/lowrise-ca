"use client";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import citiesWithProvinces from "@/constant/cities";

const PropertyLinksGrid = ({
  currentCity = "Toronto",
  transactionType = "For Sale",
}) => {
  const cities = citiesWithProvinces;

  const propertyTypes = [
    { label: "Detached", slug: "detached-homes", suffix: "homes" },
    { label: "Semi-Detached", slug: "semi-detached-homes", suffix: "homes" },
    { label: "Townhomes", slug: "townhomes", suffix: "" },
    { label: "Condo Townhomes", slug: "condo-townhomes", suffix: "" },
    { label: "Condos", slug: "condos", suffix: "" },
  ];

  // Different price ranges for sale vs lease
  const salePriceRanges = [
    { label: "Under $500k", slug: "homes-under-500k", displayText: "Cheapest" },
    {
      label: "Between $500k-$750k",
      slug: "homes-between-500k-750k",
      displayText: "Affordable",
    },
    {
      label: "Between $750k-$1M",
      slug: "homes-between-750k-1000k",
      displayText: "Mid-Range",
    },
    {
      label: "Between $1M-$1.5M",
      slug: "homes-between-1000k-1500k",
      displayText: "Expensive",
    },
    { label: "Over $1.5M", slug: "homes-over-1500k", displayText: "Luxury" },
  ];

  const leasePriceRanges = [
    { label: "Under $1,500", slug: "homes-under-1500", displayText: "Budget" },
    {
      label: "Between $1,500-$2,000",
      slug: "homes-between-1500-2000",
      displayText: "Affordable",
    },
    {
      label: "Between $2,000-$3,000",
      slug: "homes-between-2000-3000",
      displayText: "Mid-Range",
    },
    {
      label: "Between $3,000-$4,000",
      slug: "homes-between-3000-4000",
      displayText: "Premium",
    },
    { label: "Over $4,000", slug: "homes-over-4000", displayText: "Luxury" },
  ];

  // Use the appropriate price ranges based on transaction type
  const priceRanges =
    transactionType === "For Lease" ? leasePriceRanges : salePriceRanges;

  const bedBathOptions = [
    { label: "1+ Bed", slug: "1-plus-bed" },
    { label: "2+ Beds", slug: "2-plus-bed" },
    { label: "3+ Beds", slug: "3-plus-bed" },
    { label: "4+ Beds", slug: "4-plus-bed" },
    { label: "5+ Beds", slug: "5-plus-bed" },
    { label: "1+ Bath", slug: "1-plus-bath" },
    { label: "2+ Baths", slug: "2-plus-bath" },
    { label: "3+ Baths", slug: "3-plus-bath" },
  ];

  const [showAll, setShowAll] = useState(false);
  const displayedCities = showAll ? cities : cities.slice(0, 11);

  // Determine the transaction type suffix for URLs
  const transactionSuffix =
    transactionType === "For Lease" ? "for-lease" : "for-sale";

  // Determine the transaction type text for display
  const transactionText =
    transactionType === "For Lease" ? "for rent" : "for sale";

  const generatePropertyTypeURL = (city, propertyType) => {
    // Special case for Ontario as city
    if (city.toLowerCase() === "ontario") {
      return `/${propertyType}-${transactionSuffix}`;
    }
    return `/ontario/${city.toLowerCase()}/${propertyType}-${transactionSuffix}`;
  };

  const generatePriceRangeURL = (city, priceRange) => {
    // Special case for Ontario as city
    if (city.toLowerCase() === "ontario") {
      return `/${priceRange}-${transactionSuffix}`;
    }
    return `/ontario/${city.toLowerCase()}/${priceRange}-${transactionSuffix}`;
  };

  const generateOpenHouseURL = (city) => {
    // Special case for Ontario as city
    if (city.toLowerCase() === "ontario") {
      return `/open-houses`;
    }
    return `/ontario/${city.toLowerCase()}/open-houses`;
  };

  const generatePriceDroppedURL = (city) => {
    // Special case for Ontario as city
    if (city.toLowerCase() === "ontario") {
      return `/price-dropped`;
    }
    return `/ontario/${city.toLowerCase()}/price-dropped`;
  };

  const generateBedBathURL = (city, slug) => {
    // Special case for Ontario as city
    if (city.toLowerCase() === "ontario") {
      return `/homes-${transactionSuffix}/${slug}`;
    }
    return `/ontario/${city.toLowerCase()}/homes-${transactionSuffix}/${slug}`;
  };

  // New function to generate combined filter URLs
  const generateCombinedFilterURL = (
    city,
    propertyType,
    bedCount,
    priceRange
  ) => {
    // Special case for Ontario as city
    if (city.toLowerCase() === "ontario") {
      let url = "";

      // Add property type if provided
      if (propertyType) {
        url += `/${propertyType}`;
      } else {
        url += `/homes`;
      }

      // Add price range if provided
      if (priceRange) {
        url += `-${priceRange}`;
      }

      // Add transaction type before bed count
      url += `-${transactionSuffix}`;

      // Add bed count if provided
      if (bedCount) {
        url += `/${bedCount}-plus-bed`;
      }

      return url;
    }

    let url = `/ontario/${city.toLowerCase()}`;

    // Add property type if provided
    if (propertyType) {
      url += `/${propertyType}`;
    } else {
      url += `/homes`;
    }

    // Add price range if provided
    if (priceRange) {
      url += `-${priceRange}`;
    }

    // Add transaction type before bed count
    url += `-${transactionSuffix}`;

    // Add bed count if provided
    if (bedCount) {
      url += `/${bedCount}-plus-bed`;
    }

    return url;
  };

  const CurrentCitySection = ({ city }) => (
    <div className="rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {city} Real Estate | Homes {transactionText}
        </h2>
        <p className="text-black">
          Explore detached, semi-detached, townhomes & condos {transactionText}{" "}
          in {city || "Ontario"}. Open houses available. Price Dropped Homes
          Available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
        {/* Property Types Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {city} Homes by Property Type
          </h3>
          <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
            {propertyTypes.map((type) => (
              <li
                key={type.slug}
                className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
              >
                <Link href={generatePropertyTypeURL(city, type.slug)}>
                  {type.label} {type.suffix} {transactionText} in {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Ranges Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {city} Homes by Price Range
          </h3>
          <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
            {priceRanges.map((range) => (
              <li
                key={range.slug}
                className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
              >
                <Link href={generatePriceRangeURL(city, range.slug)}>
                  {range.displayText} Homes in {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Beds & Baths Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {city} Homes by Bedrooms & Bathrooms
          </h3>
          <div className="grid grid-cols-2 gap-x-8">
            <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
              {bedBathOptions.slice(0, 5).map((option) => (
                <li
                  key={option.slug}
                  className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                >
                  <Link href={generateBedBathURL(city, option.slug)}>
                    {option.label} homes in {city}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
              {bedBathOptions.slice(5).map((option) => (
                <li
                  key={option.slug}
                  className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                >
                  <Link href={generateBedBathURL(city, option.slug)}>
                    {option.label} homes in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Combined Filters Section */}
        <div className="md:col-span-3 border-t pt-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Combined Filters in {city}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Type + Bedroom Combinations */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Property Type + Bedrooms
              </h4>
              <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
                {propertyTypes.slice(0, 3).map((type) => (
                  <li
                    key={`${type.slug}-combined`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        type.slug,
                        "1",
                        null
                      )}
                    >
                      1 Bedroom {type.label} {transactionText} in {city}
                    </Link>
                  </li>
                ))}
                {propertyTypes.slice(0, 3).map((type) => (
                  <li
                    key={`${type.slug}-combined-2`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        type.slug,
                        "2",
                        null
                      )}
                    >
                      2 Bedroom {type.label} {transactionText} in {city}
                    </Link>
                  </li>
                ))}
                {propertyTypes.slice(0, 3).map((type) => (
                  <li
                    key={`${type.slug}-combined-3`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        type.slug,
                        "3",
                        null
                      )}
                    >
                      3 Bedroom {type.label} {transactionText} in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Type + Price Range Combinations */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Property Type + Price Range
              </h4>
              <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
                {propertyTypes.slice(0, 3).map((type) => (
                  <li
                    key={`${type.slug}-price-1`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        type.slug,
                        null,
                        transactionType === "For Lease"
                          ? "under-1500"
                          : "under-500k"
                      )}
                    >
                      {transactionType === "For Lease" ? "Budget" : "Cheapest"}{" "}
                      {type.label} {transactionText} in {city}
                    </Link>
                  </li>
                ))}
                {propertyTypes.slice(0, 3).map((type) => (
                  <li
                    key={`${type.slug}-price-2`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        type.slug,
                        null,
                        transactionType === "For Lease"
                          ? "between-1500-2000"
                          : "between-500k-750k"
                      )}
                    >
                      Affordable {type.label} {transactionText} in {city}
                    </Link>
                  </li>
                ))}
                {propertyTypes.slice(0, 3).map((type) => (
                  <li
                    key={`${type.slug}-price-3`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        type.slug,
                        null,
                        transactionType === "For Lease"
                          ? "between-2000-3000"
                          : "between-750k-1000k"
                      )}
                    >
                      Mid-Range {type.label} {transactionText} in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bedroom + Price Range Combinations */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Bedrooms + Price Range
              </h4>
              <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
                {bedBathOptions.slice(0, 3).map((option) => (
                  <li
                    key={`${option.slug}-price-1`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        "homes",
                        option.slug,
                        transactionType === "For Lease"
                          ? "under-1500"
                          : "under-500k"
                      )}
                    >
                      {option.label}{" "}
                      {transactionType === "For Lease" ? "Budget" : "Cheapest"}{" "}
                      Homes in {city}
                    </Link>
                  </li>
                ))}
                {bedBathOptions.slice(0, 3).map((option) => (
                  <li
                    key={`${option.slug}-price-2`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        "homes",
                        option.slug,
                        transactionType === "For Lease"
                          ? "between-1500-2000"
                          : "between-500k-750k"
                      )}
                    >
                      {option.label} Affordable Homes in {city}
                    </Link>
                  </li>
                ))}
                {bedBathOptions.slice(0, 3).map((option) => (
                  <li
                    key={`${option.slug}-price-3`}
                    className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    <Link
                      href={generateCombinedFilterURL(
                        city,
                        "homes",
                        option.slug,
                        transactionType === "For Lease"
                          ? "between-2000-3000"
                          : "between-750k-1000k"
                      )}
                    >
                      {option.label} Mid-Range Homes in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Triple Combination Examples */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Popular Combinations
              </h4>
              <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
                <li className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors">
                  <Link
                    href={generateCombinedFilterURL(
                      city,
                      "detached-homes",
                      "2",
                      transactionType === "For Lease"
                        ? "between-1500-2000"
                        : "between-500k-750k"
                    )}
                  >
                    2 Bedroom Affordable Detached Homes {transactionText} in{" "}
                    {city}
                  </Link>
                </li>
                <li className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors">
                  <Link
                    href={generateCombinedFilterURL(
                      city,
                      "condos",
                      "1",
                      transactionType === "For Lease"
                        ? "under-1500"
                        : "under-500k"
                    )}
                  >
                    1 Bedroom{" "}
                    {transactionType === "For Lease" ? "Budget" : "Cheapest"}{" "}
                    Condos {transactionText} in {city}
                  </Link>
                </li>
                <li className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors">
                  <Link
                    href={generateCombinedFilterURL(
                      city,
                      "townhomes",
                      "3",
                      transactionType === "For Lease"
                        ? "between-2000-3000"
                        : "between-750k-1000k"
                    )}
                  >
                    3 Bedroom Mid-Range Townhomes {transactionText} in {city}
                  </Link>
                </li>
                <li className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors">
                  <Link
                    href={generateCombinedFilterURL(
                      city,
                      "semi-detached-homes",
                      "2",
                      transactionType === "For Lease"
                        ? "between-1500-2000"
                        : "between-500k-750k"
                    )}
                  >
                    2 Bedroom Affordable Semi-Detached Homes {transactionText}{" "}
                    in {city}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Links Section */}
        <div className="md:col-span-3 border-t pt-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Price Dropped and Open Houses in {city}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={generateOpenHouseURL(city)}
              className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              Open houses in {city}
            </Link>
            <Link
              href={generatePriceDroppedURL(city)}
              className="text-[13px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              Price dropped homes in {city}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const OtherCityLinks = ({ city }) => (
    <div className="flex flex-col space-y-3">
      <h4 className="text-lg font-bold text-gray-800">
        <Link
          href={`/ontario/${city.toLowerCase()}/homes-${transactionSuffix}`}
          className="hover:text-black transition-colors"
        >
          Homes {transactionText} in {city}
        </Link>
      </h4>

      <div>
        <h4 className="text-[13px] font-semibold text-gray-700 mb-2">
          By Property Types
        </h4>
        <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
          {propertyTypes.map((type) => (
            <li
              key={type.slug}
              className="text-xs font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              <Link href={generatePropertyTypeURL(city, type.slug)}>
                {type.label} {type.suffix} {transactionText} in {city}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-gray-700 mb-2">
          By Price Range
        </h4>
        <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
          {priceRanges.map((range) => (
            <li
              key={range.slug}
              className="text-xs font-normal tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              <Link href={generatePriceRangeURL(city, range.slug)}>
                {range.displayText} Homes {transactionText} in {city}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {transactionType === "For Sale" && (
        <div>
          <h4 className="text-[13px] font-semibold text-gray-700 mb-2">
            Featured
          </h4>
          <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
            <li className="text-xs font-normal tracking-wide text-gray-600 hover:text-black transition-colors">
              <Link href={generateOpenHouseURL(city)}>
                Open houses in {city}
              </Link>
            </li>
            <li className="text-xs font-normal tracking-wide text-gray-600 hover:text-black transition-colors">
              <Link href={generatePriceDroppedURL(city)}>
                Price dropped homes in {city}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Current City Section - Skip for Ontario */}
      {currentCity.toLowerCase() !== "ontario" && (
        <CurrentCitySection city={currentCity} />
      )}

      {/* Other Cities Section */}
      <div>
        <h3 className="text-xl font-bold mb-6">
          Explore Homes {transactionText} Nearby {currentCity}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedCities.map((city, index) => (
            <OtherCityLinks key={`${city.city}-${index}`} city={city.city} />
          ))}
        </div>

        {/* View More Button */}
        {!showAll && cities.length > 11 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-8 text-black font-bold hover:underline text-sm"
          >
            View More Cities <MoveRight className="inline w-3 ml-0 font-bold" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyLinksGrid;
