import React from "react";
import capitalizeFirstLetter from "@/helpers/capitalizeLetter";
import { getSalesData } from "@/_resale-api/getSalesData";
import CityTitle from "@/components/CityTitle";
import FilterComponent from "@/components/FilterComponent";

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const city = params.city.split("-").join(" ");
  const formattedSlug = encodeURIComponent(capitalizeFirstLetter(city));
  const salesListData = await getSalesData(0, INITIAL_LIMIT, formattedSlug);
  const saleLeaseVal = "lease";
  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div className="">
            <CityTitle city={city} saleLeaseVal={saleLeaseVal} />
            <FilterComponent
              {...{ salesListData, INITIAL_LIMIT, city, saleLeaseVal }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }, parent) {
  const formattedCity = capitalizeFirstLetter(params.city.replace("-", " "));
  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/resale/ontario/${params.city}/homes-for-lease`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `100+ ${formattedCity} Homes for lease | Detached, Semis & Towns | Lowrise`,
    description: `Find houses for lease in ${formattedCity}, ON. Visit lowrise.ca to see all the ${params.city}, ON real estate listings on the MLS® Systems today! Prices starting at $1 💰`,
  };
}

export default page;
