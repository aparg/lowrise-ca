import React from "react";
import { houseType, saleLease } from "@/constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FiltersWithSalesList from "@/components/FiltersWithSalesList";
import { plural } from "@/constant/plural";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;

  const city = params.city;
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
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  }

  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/ontario/${type}/${saleLeaseValue || type}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `Find ${type || ""} Real Estate ${
      saleLeaseValue ? saleLease[saleLeaseValue]?.name : ""
    } in ${decodeURIComponent(params.city)}`,
    description: `Find 100+ ${
      type || "properties"
    } For Sale in Toronto, ON. Visit Lowrise.ca to explore  photos, prices & neighbourhood info. Check out townhomes with separate entrance, Basement, Pool and many more features including reduced prices homes.`,
  };
}

export default page;
