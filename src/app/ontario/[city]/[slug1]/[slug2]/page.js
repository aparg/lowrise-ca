import React from "react";
import { houseType, saleLease } from "@/constant";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { plural } from "@/constant/plural";
import CityTitle from "@/components/CityTitle";
import FilterComponent from "@/components/FilterComponent";

const page = async ({ params }) => {
  let saleLeaseValue;
  let type;

  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = houseType[params.slug1]?.name;
  } else if (Object.keys(houseType).includes(params.slug2)) {
    type = houseType[params.slug2]?.name;
  }
  const isValidSlug = saleLeaseValue || type;
  const city = params.city;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="container-fluid">
        <CityTitle
          city={city}
          requiredType={type}
          saleLeaseVal={saleLeaseValue}
        />
        <FilterComponent
          {...{
            city,
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
          }}
        />
      </div>
    );
  return <></>;
};

export default page;

export async function generateMetadata({ params }, parent) {
  let saleLeaseValue;
  let type;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  } else if (Object.keys(houseType).includes(params.slug2)) {
    type = capitalizeFirstLetter(params.slug2);
  }
  return {
    ...parent,
    alternates: {
      canonical: `https://homebaba.ca/resale/ontario/${params.city}/${params.slug1}/${params.slug2}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `Find ${type} Real Estate ${saleLease[saleLeaseValue]?.name} in ${params.city} - Homebaba`,
    description: `Explore top ${type}${
      plural[capitalizeFirstLetter(type)] || "properties"
    } in ${params.city || "Ontario"} and select the best ones`,
  };
}
