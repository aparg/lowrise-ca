import dynamic from "next/dynamic";
import { ImSpinner } from "react-icons/im";
import Breadcrumbs from "@/components/Breadcrumbs";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";

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

export const metadata = {
  title: "Ontario Properties | Lowrise.ca",
  description:
    "Explore resale properties across Ontario. Find your next home or investment opportunity.",
  keywords: "Ontario real estate, resale properties, low-rise buildings",
};

const page = async ({ params }) => {
  const INITIAL_LIMIT = 30;
  const breadcrumbItems = [
    { label: "Lowrise", href: "/" },
    { label: "ON", href: null },
  ];
  return (
    <div className="">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container-fluid">
        <FiltersWithSalesList
          {...{
            INITIAL_LIMIT,
          }}
        />
      </div>
      <CanadianCitiesShowcase />
    </div>
  );
};

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/ontario`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: [
      `100+ Ontario Detached, Semi detached & Townhomes for lease`,
      ,
      "New Listings",
      "Lowrise.ca",
    ].join(" | "),
    description: `Find houses for sale in Ontario, ON. Visit Lowrise.ca to see all the ON real estate listings on the MLS® Systems today! Prices starting at $1 💰`,
  };
}

export default page;
