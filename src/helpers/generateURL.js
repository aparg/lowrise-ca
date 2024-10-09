import { houseType, saleLease } from "@/constant";
import { isLocalStorageAvailable } from "./checkLocalStorageAvailable";
const houseTypeLinkObj = {};
Object.values(houseType).forEach((elem) => {
  houseTypeLinkObj[elem.name.toLowerCase()] = elem.slug;
});
export const generateURL = ({
  cityVal,
  houseTypeVal,
  saleLeaseVal,
  listingIDVal = null,
  embeddedSite = false,
}) => {
  const filterState =
    isLocalStorageAvailable() &&
    JSON.parse(localStorage.getItem("filterState"));
  const city = cityVal?.toLowerCase().replaceAll(" ", "-");
  let houseType =
    houseTypeVal?.toLowerCase() || filterState?.type?.toLowerCase() || null;
  if (houseType == "house type") {
    houseType = null; //edge case for housetype object where housetype option represents nothing
  }
  const saleLeaseType =
    Object.keys(saleLease).find((key) => key == saleLeaseVal) ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].name == saleLeaseVal)
      ?.toLowerCase() ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].name == filterState?.saleLease)
      ?.toLowerCase();
  null;
  if (listingIDVal && city)
    return `${
      embeddedSite ? "/embedded-site" : ""
    }/ontario/${city}/listings/${listingIDVal}`;
  let finalLink = `${embeddedSite ? "/embedded-site" : ""}/ontario`;

  if (city) finalLink += "/" + city;

  if (!houseType && !saleLeaseType) return finalLink + "/homes-for-sale";

  // console.log(houseTypeLinkObj, houseType);
  if (houseType && !city) finalLink += "/homes/" + houseTypeLinkObj[houseType];
  if (houseType && city) finalLink += "/" + houseTypeLinkObj[houseType];
  if (saleLeaseType && houseType) finalLink += "-for-" + saleLeaseType;
  if (saleLeaseType && !houseType) finalLink += "/homes-for-" + saleLeaseType;

  return finalLink;

  // if (houseType) {
  //   if (saleLeaseType) {
  //     finalLink += `/${city}`;
  //   }
  //   return `${
  //     embeddedSite ? "/embedded-site" : ""
  //   }/ontario/${city}/${houseType}`;
  // }
  // if (saleLeaseType) {
  //   return `${
  //     embeddedSite ? "/embedded-site" : ""
  //   }/ontario/${city}/${saleLeaseType}`;
  // }
  // return `${
  //   embeddedSite ? "/embedded-site" : ""
  // }/ontario/${city}/homes-for-sale`;

  // if (houseType) {
  //   if (saleLeaseType) {
  //     return `${
  //       embeddedSite ? "/embedded-site" : ""
  //     }/ontario/homes/${houseType}-${
  //       houseType !== "town-homes" ? "homes" : ""
  //     }-for-${saleLeaseType}`;
  //   }
  //   return `${embeddedSite ? "/embedded-site" : ""}/ontario/homes/${houseType}`;
  // }
  // if (saleLeaseType) {
  //   return `${
  //     embeddedSite ? "/embedded-site" : ""
  //   }/ontario/homes/${saleLeaseType}`;
  // }

  // return `${embeddedSite ? "/embedded-site" : ""}/ontario`;
};
