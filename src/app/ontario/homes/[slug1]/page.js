import React from "react";
import {
  houseType,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
  saleLease,
} from "@/constant";
import FiltersWithSalesList from "@/components/FiltersWithSalesList";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";
import CityTitle from "@/components/CityTitle";
import FilterComponent from "@/components/FilterComponent";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  let priceRange = undefined;
  let bedroomCount = undefined;
  // if (Object.keys(saleLease).includes(params.slug1)) {
  //   saleLeaseValue = params.slug1;
  // }
  // if (Object.keys(houseType).includes(params.slug1)) {
  //   type = houseType[params.slug1].name;
  // }
  const splitData = params.slug1.split("-");
  splitData.forEach((data, idx) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(houseType).includes(data) && !type) {
      type = houseType[data]?.name;
    } else if (data == "price") {
      const priceSlug = splitData.splice(idx + 1, splitData.length).join("-");
      const priceRangeObj = Object.values({
        ...priceRangesSaleProperties,
        ...priceRangesLeaseProperties,
      }).find((obj) => obj.slug == priceSlug);
      if (priceRangeObj)
        priceRange = { min: priceRangeObj.min, max: priceRangeObj.max };
    } else if (data == "bedroom") {
      bedroomCount = splitData[idx - 1];
    }
    if (saleLeaseValue && type) return;
  });
  const isValidSlug = saleLeaseValue || type;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="">
        <CityTitle
          requiredType={type}
          saleLeaseVal={saleLeaseValue}
          bedroomCount={bedroomCount}
          priceRange={priceRange}
        />
        <FilterComponent
          {...{
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
            filter: type || "",
            priceRange: priceRange,
            bedroomCount: bedroomCount,
          }}
        />
        <CanadianCitiesShowcase />
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
      type = houseType[data]?.name;
    }
    if (saleLeaseValue && type) return;
  });
  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/ontario/homes/${params.slug1}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `100+ Ontario homes for Sale | Lowrise `,
    description: `500+ Ontario ${type} for sale. Book a showing for affordable homes with pools, finished basements, walkouts. Prices from $1 to $5,000,000. Open houses available.`,
  };
}

export default page;
