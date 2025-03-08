import Link from "next/link";
import { allCities } from "@/data/ontarioCities";
import {
  bedCount,
  homeText,
  houseType,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
} from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";

const propertyTypes = [
  {
    label: "Detached Homes",
    slug: "detached-homes-for-sale",
  },
  {
    label: "Semi-Detached Homes",
    slug: "semi-detached-homes-for-sale",
  },
  {
    label: "Townhomes",
    slug: "town-homes-for-sale",
  },
  {
    label: "Condos",
    slug: "condo-for-sale",
  },
  {
    label: "Open Houses",
    slug: "open-houses",
  },
];

const allPriceRanges = {
  ...priceRangesLeaseProperties,
  ...priceRangesSaleProperties,
};
const filterOutAbovePricing = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !key.toLowerCase().includes("above"))
  );
};

export default function OntarioCitiesGrid() {
  // Sort cities alphabetically
  const sortedCities = [...allCities].sort((a, b) =>
    a.city.localeCompare(b.city)
  );
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Ontario Real Estate | Homes & Condos for Sale & Rent
        </h1>
        <h2 className="text-sm text-gray-500">
          Homes, Condos, Townhomes for Sale & Lease | Open Houses | New Listings
          | MLS® Listings | 1-5 Bedroom Properties | Under $500K to Luxury Homes
          | Rental Properties from $1500-$5000+
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
        {sortedCities.map((cityData, index) => (
          <div className="">
            <Link
              href={`/resale/ontario/${cityData.city
                .toLowerCase()
                .replace(/\s+/g, "-")}/homes-for-sale`}
              className="text-xl font-bold text-gray-800 mb-2 hover:text-black transition-colors"
            >
              {cityData.city}
            </Link>
            <br />
            <Link
              key={`${cityData.city}-openhouse`}
              href={generateURL({
                cityVal: cityData.city,
                openHouse: true,
              })}
              className="text-sm font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              Open Houses in {cityData.city}
            </Link>

            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by house type and sale/lease
              </h2>
              {Object.keys(houseType)
                .filter((key) => key != "all")
                .map((type, typeIndex) =>
                  ["sale", "lease"].map((saleLease) => (
                    <>
                      <Link
                        key={`${type.slug}-${typeIndex}`}
                        href={generateURL({
                          houseTypeVal: houseType[type].name,
                          saleLeaseVal: saleLease,
                          cityVal: cityData.city,
                        })}
                        className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                      >
                        {`${
                          homeText[houseType[type].name] || houseType[type].name
                        } for ${saleLease} in ${cityData.city}`}
                      </Link>
                      <br />
                    </>
                  ))
                )}
            </div>

            {/* for bed count & salelease */}
            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by number of bedrooms
              </h2>
              {["sale", "lease"].map((saleLease) =>
                Object.values(bedCount)
                  .filter((obj) => obj.value != 0)
                  .map((bedObj) => (
                    <>
                      <Link
                        key={`${cityData.city}-${bedObj.value}-${saleLease}`}
                        href={generateURL({
                          saleLeaseVal: saleLease,
                          bedCount: bedObj.value,
                          cityVal: cityData.city,
                        })}
                        className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                      >
                        {`${bedObj.value} bedroom 
                        homes
                      for ${saleLease} in ${cityData.city}`}
                      </Link>
                      <br />
                    </>
                  ))
              )}
            </div>

            {/* //for house type + price range */}
            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by house type and price range
              </h2>
              {Object.keys(houseType)
                .filter((key) => key != "all")
                .map((type, typeIndex) => [
                  ...Object.keys(
                    filterOutAbovePricing(priceRangesSaleProperties)
                  ).map((priceRange) => (
                    <>
                      <Link
                        key={`${type.slug}-${typeIndex}-${priceRange}`}
                        href={generateURL({
                          houseTypeVal: houseType[type].name,
                          saleLeaseVal: "sale",
                          priceRange: priceRange,

                          cityVal: cityData.city,
                        })}
                        className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                      >
                        {`${
                          homeText[houseType[type].name] || houseType[type].name
                        } for sale in ${cityData.city} ${priceRange}`}
                      </Link>
                      <br />
                    </>
                  )),

                  ...Object.keys(
                    filterOutAbovePricing(priceRangesLeaseProperties)
                  ).map((priceRange) => (
                    <>
                      <Link
                        key={`${type.slug}-${typeIndex}-${priceRange}`}
                        href={generateURL({
                          houseTypeVal: houseType[type].name,
                          saleLeaseVal: "lease",
                          priceRange: priceRange,

                          cityVal: cityData.city,
                        })}
                        className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                      >
                        {`${
                          homeText[houseType[type].name] || houseType[type].name
                        } for lease in ${cityData.city} ${priceRange}`}
                      </Link>
                      <br />
                    </>
                  )),
                ])}
            </div>

            {/* //for house type + price range+ bedcount */}
            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by house type, price range and bedrooms
              </h2>
              {Object.keys(houseType)
                .filter((key) => key != "all")
                .map((type, typeIndex) => [
                  ...Object.keys(
                    filterOutAbovePricing(priceRangesSaleProperties)
                  ).map((priceRange) =>
                    Object.values(bedCount)
                      .filter((obj) => obj.value != 0)
                      .map((bedObj) => (
                        <>
                          <Link
                            key={`${type.slug}-${typeIndex}-${priceRange}-${bedObj.value}`}
                            href={generateURL({
                              houseTypeVal: houseType[type].name,
                              saleLeaseVal: "sale",
                              priceRange: priceRange,
                              bedCount: bedObj.value,
                              cityVal: cityData.city,
                            })}
                            className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                          >
                            {`${bedObj.value} bedroom ${
                              homeText[houseType[type].name] ||
                              houseType[type].name
                            } for sale in ${cityData.city} ${priceRange}`}
                          </Link>
                          <br />
                        </>
                      ))
                  ),

                  ...Object.keys(
                    filterOutAbovePricing(priceRangesLeaseProperties)
                  ).map((priceRange) =>
                    Object.values(bedCount)
                      .filter((obj) => obj.value != 0)
                      .map((bedObj) => (
                        <>
                          <Link
                            key={`${type.slug}-${typeIndex}-${priceRange}-${bedObj.value}`}
                            href={generateURL({
                              houseTypeVal: houseType[type].name,
                              saleLeaseVal: "lease",
                              priceRange: priceRange,
                              bedCount: bedObj.value,
                              cityVal: cityData.city,
                            })}
                            className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                          >
                            {`${bedObj.value} bedroom ${
                              homeText[houseType[type].name] ||
                              houseType[type].name
                            } for lease in ${cityData.city} ${priceRange}`}
                          </Link>
                          <br />
                        </>
                      ))
                  ),
                ])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
