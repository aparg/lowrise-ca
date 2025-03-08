import React from "react";
import {
  homeText,
  houseType,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
  saleLease,
} from "@/constant";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import CityTitle from "@/components/CityTitle";
import FilterComponent from "@/components/FilterComponent";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  let priceRange = undefined;
  let bedroomCount = undefined;
  let condoCorp = undefined;
  let condoCorpNumber = undefined;
  const city = params.city.split("-").join(" ");
  const INITIAL_LIMIT = 30;
  const splitData = params.slug1.split("-");
  splitData.forEach((data, idx) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(houseType).includes(data) && !type) {
      type = houseType[data].name;
    } else if (data == "price") {
      const priceSlug = splitData.splice(idx + 1, splitData.length).join("-");
      const priceRangeObj = Object.values({
        ...priceRangesSaleProperties,
        ...priceRangesLeaseProperties,
      }).find((obj) => obj.slug == priceSlug);
      if (priceRangeObj)
        priceRange = { min: priceRangeObj.min, max: priceRangeObj.max };
    } else if (data == "bedroom") {
      bedroomCount = splitData[idx - 1];
    } else if (data == "condocorp") {
      condoCorp = splitData[idx + 1];
      condoCorpNumber = splitData[idx + 2];
    }
    if (saleLeaseValue && type) return;
  });
  const isValidSlug = saleLeaseValue || type || condoCorp;
  if (isValidSlug)
    return (
      <div className="container-fluid">
        <CityTitle
          city={city}
          requiredType={type}
          saleLeaseVal={saleLeaseValue}
          bedroomCount={bedroomCount}
          priceRange={priceRange}
          condoCorp={condoCorp}
          condoCorpNumber={condoCorpNumber}
        />
        <FilterComponent
          {...{
            city,
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
            priceRange: priceRange,
            bedroomCount: bedroomCount,
            condoCorp: condoCorp,
            condoCorpNumber: condoCorpNumber,
          }}
        />
      </div>
    );
  return <></>;
};

export async function generateMetadata({ params }, parent) {
  let saleLeaseValue = undefined;
  let type = undefined;
  let priceRange = undefined;
  let bedroomCount = undefined;
  let condoCorp = undefined;
  let condoCorpNumber = undefined;
  const city = params.city.split("-").join(" ");
  const INITIAL_LIMIT = 30;
  const splitData = params.slug1.split("-");

  splitData.forEach((data, idx) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(houseType).includes(data) && !type) {
      type = houseType[data].name;
    } else if (data == "price") {
      const priceSlug = splitData.splice(idx + 1, splitData.length).join("-");
      const priceRangeObj = Object.values({
        ...priceRangesSaleProperties,
        ...priceRangesLeaseProperties,
      }).find((obj) => obj.slug == priceSlug);
      if (priceRangeObj)
        priceRange = { min: priceRangeObj.min, max: priceRangeObj.max };
    } else if (data == "bedroom") {
      bedroomCount = splitData[idx - 1];
    } else if (data == "condocorp") {
      condoCorp = splitData[idx + 1];
      condoCorpNumber = splitData[idx + 2];
    }
    if (saleLeaseValue && type) return;
  });

  const getTitle = () => {
    if (condoCorp && condoCorpNumber) {
      return `${condoCorp} #${condoCorpNumber} in ${capitalizeFirstLetter(
        city
      )} - Get information including bylaws, management, and how to order a status certificate for Peel condominium corporation ${condoCorp} #${condoCorpNumber}`;
    }
    return `100+ ${formattedCity} ${
      homeText[type] || "homes"
    } for Sale | Homebaba `;
  };
  const formattedCity = capitalizeFirstLetter(params.city.replace("-", " "));
  return {
    ...parent,
    alternates: {
      canonical: `https://homebaba.ca/resale/ontario/${params.city}/${params.slug1}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: getTitle(),
    description: `500+ ${formattedCity} ${type} homes for ${
      saleLeaseValue?.toLowerCase() == "lease" ? "Rent or Lease" : "sale"
    }. Book a showing for affordable homes with pools, finished basements, walkouts. Prices from $1 to $5,000,000. Open houses available.`,
  };
}

export default page;
