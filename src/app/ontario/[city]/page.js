import React from "react";
import dynamic from "next/dynamic";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getSalesData } from "../../../api/getSalesData";
import { ImSpinner } from "react-icons/im";

const FiltersWithSalesList = dynamic(
  () => import("@/components/FiltersWithSalesList"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center align-item-center">
        <ImSpinner size={24} />
      </div>
    ),
  }
);

export async function generateMetadata({ params }) {
  const city = params.city;

  return {
    title: `${city} Properties | Lowrise.ca`,
    description: `Discover resale properties and low-rise buildings in ${city}, Ontario.`,
    keywords: `${city} real estate, Ontario properties, resale homes`,
  };
}

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);

  const salesListData = await getSalesData(0, INITIAL_LIMIT, formattedSlug);

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="">
          <div className="">
            <FiltersWithSalesList {...{ salesListData, INITIAL_LIMIT, city }} />
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
      canonical: `https://luxehomesbyfara.com/ontario/${params.city}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `Find Real Estate in ${params.city}`,
    description: `Explore top Real Estate ${"properties"} in ${
      params.city || "Ontario"
    } and select the best ones`,
  };
}

export default page;
