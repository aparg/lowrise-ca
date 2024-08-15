import React from "react";
import { houseType, saleLease } from "@/constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FiltersWithSalesList from "@/components/FiltersWithSalesList";

export async function generateMetadata({ params }) {
  const { slug1 } = params;

  return {
    title: `${slug1} Properties | Lowrise.ca`,
    description: `Find ${slug1} resale properties in Ontario. Explore our curated listings.`,
    keywords: `${slug1}, Ontario real estate, property filter`,
  };
}

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = houseType[params.slug1].name;
  }
  const isValidSlug = saleLeaseValue || type;
  const city = params.city;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="container-fluid">
        <FiltersWithSalesList
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

export async function generateMetadata({ params }, parent) {
  let saleLeaseValue;
  let type;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  }

  return {
    ...parent,
    alternates: {
      canonical: `https://luxehomesbyfara.com/ontario/${type}/${
        saleLeaseValue || type
      }`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `Find ${type || ""} Real Estate ${
      saleLeaseValue ? saleLease[saleLeaseValue]?.name : ""
    } in ${params.city}`,
    description: `Explore top ${type}${
      plural[capitalizeFirstLetter(type)] || "properties"
    } in ${params.city || "Ontario"} and select the best ones`,
  };
}

export default page;
