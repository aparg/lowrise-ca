import React from "react";
import { houseType, saleLease } from "@/constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FiltersWithSalesList from "@/components/FiltersWithSalesList";
import { plural } from "@/constant/plural";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;

  const city = params.city.split("-").join(" ");
  const INITIAL_LIMIT = 30;
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
  const splitData = params.slug1.split("-");
  splitData.forEach((data) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(houseType).includes(data) && !type) {
      type = houseType[data].name;
    }
    if (saleLeaseValue && type) return;
  });
  const formattedCity = capitalizeFirstLetter(params.city.replace("-", " "));
  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/ontario/${type}/${saleLeaseValue || type}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `100+ ${formattedCity} ${capitalizeFirstLetter(
      type
    )} homes for Sale | New Listings | Lowrise.ca `,
    description: `500+ ${formattedCity} ${type} homes for sale. Book a showing for affordable homes with pools, finished basements, walkouts. Prices from $1 to $5,000,000. Open houses available.`,
  };
}

export default page;
