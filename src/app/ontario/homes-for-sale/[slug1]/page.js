import React from "react";
import { getSalesData } from "@/_resale-api/getSalesData";
import CityTitle from "@/components/CityTitle";
import FilterComponent from "@/components/FilterComponent";
import {
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
} from "@/constant";

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const salesListData = await getSalesData(0, INITIAL_LIMIT);
  const saleLeaseVal = "sale";
  const splitData = params.slug1.split("-");
  let priceRange = undefined;
  splitData.forEach((data, idx) => {
    if (data == "price") {
      const priceSlug = splitData.splice(idx + 1, splitData.length).join("-");
      const priceRangeObj = Object.values({
        ...priceRangesSaleProperties,
        ...priceRangesLeaseProperties,
      }).find((obj) => obj.slug == priceSlug);
      if (priceRangeObj)
        priceRange = { min: priceRangeObj.min, max: priceRangeObj.max };
    }
  });
  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div className="">
            <CityTitle saleLeaseVal={saleLeaseVal} />
            <FilterComponent
              {...{ priceRange, salesListData, INITIAL_LIMIT, saleLeaseVal }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/resale/ontario/homes-for-sale/${params.slug1}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `100+ ${params.slug1} Homes for sale | Detached, Semis & Towns | Lowrise`,
    description: `Find houses for sale in ${params.slug1}. Visit lowrise.ca to see all the ${params.slug1} real estate listings on the MLS® Systems today! Prices starting at $1 💰`,
  };
}

export default page;
