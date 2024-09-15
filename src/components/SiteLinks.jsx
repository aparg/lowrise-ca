import { houseType, saleLease } from "@/constant";
import citiesWithProvinces from "@/constant/cities";
import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";

const houseTypesArray = Object.values(houseType)
  .filter((obj) => obj.value)
  .map((obj) => obj.name);
const cities = citiesWithProvinces.map((obj) => obj.city);
const SiteLinks = () => {
  console.log(houseTypesArray);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 max-w-[90%] mx-auto">
      {cities.map((city, index) => (
        <div key={city}>
          <b>Properties in {city}</b>
          {["sale", "lease"].map((saleLeaseVal) => {
            return (
              <ul key={saleLeaseVal}>
                {houseTypesArray.map((value) => {
                  return (
                    <li key={value}>
                      <Link
                        href={generateURL({
                          houseTypeVal: value,
                          saleLeaseVal: saleLeaseVal,
                        })}
                      >
                        {value} Homes in {city} for {saleLeaseVal}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SiteLinks;
