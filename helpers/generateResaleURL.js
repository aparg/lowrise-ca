import {
  houseType,
  pillar9HouseTypes,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
  saleLease,
} from "@/constant";
import { isLocalStorageAvailable } from "./checkLocalStorageAvailable";
const houseTypeLinkObj = {};

export const generateURL = ({
  cityVal,
  houseTypeVal,
  saleLeaseVal,
  listingIDVal = null,
  embeddedSite = false,
  useLocalStorage = true,
  soldData = false,
  priceRange = null,
  openHouse = false,
  bedCount = null,
  condoCorp = null,
  priceDropped = false,
  condoCorpNumber = null,
  province = "ontario",
}) => {
  if (province == "alberta")
    Object.values(pillar9HouseTypes).forEach((elem) => {
      if (elem.value) houseTypeLinkObj[elem.name.toLowerCase()] = elem.slug;
    });
  else
    Object.values(houseType).forEach((elem) => {
      if (elem.value) houseTypeLinkObj[elem.name.toLowerCase()] = elem.slug;
    });

  const filterState =
    useLocalStorage &&
    isLocalStorageAvailable() &&
    JSON.parse(localStorage.getItem("filterState"));

  // Normalize and validate saleLeaseVal
  const normalizeSaleLeaseType = (value) => {
    if (!value) return null;
    // Check direct key match
    if (Object.keys(saleLease).includes(value.toLowerCase())) {
      return value.toLowerCase();
    }
    // Check name match
    const key = Object.keys(saleLease).find(
      (k) => saleLease[k].name.toLowerCase() === value.toLowerCase()
    );
    return key || null;
  };

  const saleLeaseType =
    normalizeSaleLeaseType(saleLeaseVal) ||
    normalizeSaleLeaseType(filterState?.saleLease) ||
    "sale"; // Default to 'sale' if no valid value

  const city = cityVal?.toLowerCase().replaceAll(" ", "-");
  let houseTypeName =
    houseTypeVal?.toLowerCase() ||
    filterState?.type?.toLowerCase() ||
    filterState?.houseTypeName?.toLowerCase() ||
    null;

  if (houseTypeName === "all properties") {
    houseTypeName = null;
  }

  // Special cases handling
  if (condoCorp && condoCorpNumber) {
    return `/${province}/${city}/condocorp-${condoCorp}-${condoCorpNumber}`;
  }

  if (openHouse) {
    if (city) {
      if (listingIDVal) {
        return `/${province}/${city}/open-house/listings/${listingIDVal}`;
      }
      return `/${province}/${city}/open-houses`;
    }

    return `/${province}/open-houses`;
  }

  if (priceDropped) {
    return city
      ? `/${province}/${city}/homes-for-sale/price-dropped`
      : `/${province}/homes-for-sale/price-dropped`;
  }

  // Listing ID handling
  if (listingIDVal && city) {
    return `/${province}/${city}/listings/${
      soldData ? "sold/" : ""
    }${encodeURIComponent(listingIDVal)}`;
  }

  const priceRangeObj =
    priceRangesSaleProperties[priceRange] ||
    priceRangesLeaseProperties[priceRange];

  // Build the URL
  let finalLink = `/${province}`;
  if (city) finalLink += `/${city}`;

  // Base case - no filters
  if (!houseTypeName && !bedCount) {
    return finalLink + `/homes-for-${saleLeaseType}`;
  }

  // Build URL with filters
  if (houseTypeName) {
    finalLink += city
      ? `/${houseTypeLinkObj[houseTypeName] || "homes"}`
      : `/${houseTypeLinkObj[houseTypeName]}`;
  } else {
    finalLink += "/homes";
  }

  if (priceRange) {
    finalLink += `-${priceRangeObj.slug}`;
  }

  finalLink += `-for-${saleLeaseType}`;

  if (bedCount) {
    finalLink += `/${bedCount}-plus-bed`;
  }

  return encodeURI(finalLink);
};
