import React from "react";
import CityTitle from "@/components/CityTitle";
import { fetchOpenHouse } from "@/_resale-api/getSalesData";
import SalesList from "@/components/SalesList";

const page = async ({ params }) => {
  const openHouses = await fetchOpenHouse({ city: null });
  return (
    <div className="container-fluid">
      <CityTitle openHouse={true} />
      <div
        className={`pt-1 grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-0 gap-x-2 gap-y-4 md:gap-x-2 sm:gap-y-[40px]`}
      >
        <SalesList salesData={openHouses} openHouse={true} />
      </div>
    </div>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    title: "Open Houses in Ontario | Lowrise",
    description:
      "We have a list of open houses in Ontario for you to view. Find the perfect home for you today!",
    alternates: {
      canonical: "https://homebaba.ca/resale/ontario/open-houses",
    },
    openGraph: {
      images: "https://homebaba.ca/favicon.ico",
    },
  };
}
