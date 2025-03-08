import { getPropertiesCount } from "@/_resale-api/getSalesData";
import {
  bedCount,
  homeText,
  houseType,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
  saleLease,
} from "@/constant";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import React from "react";

const CityTitle = async ({
  city = null,
  requiredType = null,
  saleLeaseVal = null,
  openHouse = false,
  bedroomCount = null,
  priceRange = null,
  condoCorp = null,
  condoCorpNumber = null,
}) => {
  const totalPropertyCount = await getPropertiesCount({
    city: city,
    propertyType: Object.values(houseType).find(
      (obj) => obj.name == requiredType
    )?.value,
    saleLease: saleLease[saleLeaseVal]?.name,
    condoCorp: condoCorp,
    condoCorpNumber: condoCorpNumber,
  }).then((data) => {
    const localeStringNumber = Number(data["@odata.count"])?.toLocaleString();
    const propertyCount = localeStringNumber;
    return propertyCount;
  });

  // const homeText = !requiredType
  //   ? "Homes"
  //   : !requiredType?.toLowerCase().includes("house")
  //   ? "Homes"
  //   : "";
  const allPriceRanges = {
    ...priceRangesLeaseProperties,
    ...priceRangesSaleProperties,
  };
  const getTitle = () => {
    return (
      <>
        {[
          totalPropertyCount || "100+",
          requiredType ? homeText[requiredType] : "homes",
          capitalizeFirstLetter(saleLeaseVal)?.toLowerCase() == "lease"
            ? "for Rent"
            : "for Sale",
        ].join(" ") + " "}{" "}
        in
        {city ? ` ${capitalizeFirstLetter(city)}` : " Ontario"}
        {condoCorp &&
          ` from Condo Corporation ${decodeURIComponent(
            condoCorp.toUpperCase()
          )} #${condoCorpNumber}`}
      </>
    );
  };
  const getSubtitle = () => {
    if (openHouse) return `Open houses in ${city || "Ontario"}`;
    return `${totalPropertyCount} ${capitalizeFirstLetter(city) || "Ontario"} ${
      requiredType ? homeText[requiredType]?.toLowerCase() : "homes"
    } for 
    ${
      saleLeaseVal?.toLowerCase() == "lease" ? "Rent or Lease" : "sale"
    } | Affordable ${
      bedroomCount ? bedroomCount + " bedroom" : "1 - 4 bedroom"
    }  ${requiredType ? homeText[requiredType]?.toLowerCase() : "homes"} in ${
      capitalizeFirstLetter(city) || "Ontario"
    } 
    ${
      priceRange
        ? Object.keys(allPriceRanges)
            .find(
              (key) =>
                allPriceRanges[key]?.min == priceRange.min &&
                allPriceRanges[key]?.max == priceRange.max
            )
            ?.toLowerCase()
        : "from $1 to $5M"
    } | 
    Open Houses & New Listings Available`;
  };
  return (
    <div className="px-1 mt-3">
      <h1
        className={`font-bold text-xl md:text-3xl text-left sm:text-left pt-2 sm:pt-0 text-gray-800`}
      >
        {!openHouse
          ? getTitle()
          : `Open Houses in ${capitalizeFirstLetter(city) || "Ontario"}`}
      </h1>
      <h2 className="text-xs mt-1 mb-2 md:mb-1 text-left sm:text-left text-gray-600">
        {getSubtitle()}
      </h2>
    </div>
  );
};

export default CityTitle;
