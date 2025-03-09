import React from "react";
import { getSalesData } from "@/_resale-api/getSalesData";
import CityTitle from "@/components/CityTitle";
import FilterComponent from "@/components/FilterComponent";

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const salesListData = await getSalesData(0, INITIAL_LIMIT);
  const saleLeaseVal = "sale";
  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div className="">
            <CityTitle saleLeaseVal={saleLeaseVal} />
            <FilterComponent
              {...{ salesListData, INITIAL_LIMIT, saleLeaseVal }}
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
      canonical: `https://lowrise.ca/resale/ontario/homes-for-sale`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    // Fix: Remove the extra comma after formattedCity string
    title: `100+ Ontario Homes for sale | Detached, Semis & Towns | Lowrise`,
    description: `Find houses for sale in Ontario. Visit lowrise.ca to see all the Ontario real estate listings on the MLS® Systems today! Prices starting at $1 💰`,
  };
}

export default page;
