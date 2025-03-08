import React from "react";
import { houseType, saleLease } from "@/constant";
import capitalizeFirstLetter from "@/helpers/capitalizeLetter";
import CityTitle from "@/components/CityTitle";
import { fetchOpenHouse } from "@/_resale-api/getSalesData";
import SalesList from "@/components/SalesList";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateURL } from "@/helpers/generateResaleURL";
import Filters from "@/components/Filters";

const page = async ({ params }) => {
  const city = params.city.split("-").join(" ");
  const openHouses = await fetchOpenHouse({ city: city });

  const breadcrumbItems = [
    { label: "Ontario", href: "/ontario" },
    {
      label: capitalizeFirstLetter(city),
      href: `${generateURL({
        cityVal: city,
      })}`,
    },
    {
      label: `Open Houses`,
      href: "#",
    },
  ];
  return (
    <div className="container-fluid">
      <CityTitle city={city} openHouse={true} />
      <div
        className={`pt-1 mt-4 grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-0 gap-x-2 gap-y-4 md:gap-x-2 sm:gap-y-[40px]`}
      >
        <SalesList salesData={openHouses} city={city} openHouse={true} />
      </div>
    </div>
  );
};

export default page;
