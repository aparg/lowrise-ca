import React from "react";
import { houseType, saleLease } from "@/constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FiltersWithSalesList from "@/components/FiltersWithSalesList";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  // if (Object.keys(saleLease).includes(params.slug1)) {
  //   saleLeaseValue = params.slug1;
  // }
  // if (Object.keys(houseType).includes(params.slug1)) {
  //   type = houseType[params.slug1].name;
  // }
  const splitData = params.slug1.split("-");
  splitData.forEach((data) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(houseType).includes(data) && !type) {
      type = houseType[data].name;
    }
    if (saleLeaseValue && type) return;
  });
  const isValidSlug = saleLeaseValue || type;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="">
        <FiltersWithSalesList
          {...{
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
            filter: type || "",
          }}
        />
        <CanadianCitiesShowcase />
      </div>
    );
  return <></>;
};

export default page;
