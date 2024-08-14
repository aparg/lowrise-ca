import React from "react";
import dynamic from "next/dynamic";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import { residential } from "../../../../../../api/routes/fetchRoutes";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getSalesData } from "../../../../../../api/getSalesData";
import BookShowingForm from "@/components/BookShowingForm";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });
import PropertyPage from "@/components/PropertyPage";
import BookingDate from "@/components/BookingDate";
import FAQ from "@/components/FAQ";
import MortgageCalculator from "@/components/MortgageCalculator";
import Image from "next/image";
import Slider from "@/components/Slider";
import Breadcrumbs from "@/components/Breadcrumbs";
// import { Button } from "@nextui-org/react";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 10;

const fetchData = async (listingID) => {
  const options = {
    method: "GET",
  };
  const urlToFetchMLSDetail = residential.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );

  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results[0];
};

const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);
  const parts = params.listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingID = lastPart;
  const main_data = await fetchData(listingID); //always a single object inside the array
  const newSalesData = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    formattedSlug,
    main_data?.TypeOwnSrch
  );

  const imageURLs = generateImageURLs(
    listingID,
    parseInt(main_data?.PhotoCount)
  );

  const breadcrumbItems = [
    { label: "Ontario", href: "/ontario" },
    { label: formattedSlug, href: `/ontario/${city}` },
    { label: main_data?.StreetName, href: "#" },
  ];

  // const address = `${main_data?.Street} ${main_data?.StreetName} ${main_data?.StreetAbbreviation}`;
  const address = [
    main_data?.Street,
    main_data?.StreetName,
    main_data?.StreetAbbreviation,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="flex justify-center">
      <div>
        <div className="pt-md-3 pt-0">
          <Breadcrumbs items={breadcrumbItems} />
          <section className="padding-top w-full text-sm flex flex-col items-center justify-center gy-2">
            <div className="col-12 px-0">
              <Gallery data={imageURLs} />
            </div>
            <div className="sm:max-w-[90%] w-full flex justify-center pt-4 relative">
              <div className="grid grid-cols-6 justify-between sm:justify-between w-full gap-x-6">
                <div className={`sm:col-span-4 col-span-4 col-md-8 `}>
                  <PropertyPage {...{ main_data }} />
                  <BookingDate bannerImage={imageURLs[0]} />
                  <div className="z-20 relative mt-8 sm:mt-24">
                    <h2 className="font-extrabold pb-3 text-lg sm:text-4xl">
                      Map View
                    </h2>
                    <Map main_data={main_data} />
                  </div>
                  {/* <div className="mt-8 sm:mt-24">
                    <h2 className="font-extrabold pb-3 text-lg sm:text-4xl">
                      Mortgage Calculator
                    </h2>
                    <MortgageCalculator price={main_data.ListPrice} />
                  </div> */}
                </div>

                <div className="sm:col-span-2 col-span-2 pt-5" id="contact">
                  <BookShowingForm
                    defaultmessage={`Please book a showing for this property "${address}"`}
                    city={main_data.Municipality}
                    address={address}
                  ></BookShowingForm>
                </div>
                <div className="mt-24 mb-10 col-span-4">
                  <FAQ main_data={main_data} />
                </div>
                {formattedSlug && newSalesData?.length > 0 && (
                  <section className="additonal__listing w-full mx-auto mt-24">
                    {/* <PropertyDisplaySection data={newSalesData.slice(0, 5)} /> */}
                    <Slider data={newSalesData} />
                  </section>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  const parts = params.listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingID = lastPart;
  const main_data = await fetchData(listingID);
  const imageURLs = generateImageURLs(listingID);
  return {
    ...parent,
    alternates: {
      canonical: `https://luxehomesbyfara.com/pre-construction-homes/${params.city}/${params.slug}`,
    },
    openGraph: {
      images: await fetch(imageURLs[0]),
    },
    title: `${main_data?.Street} ${main_data?.StreetName} ${main_data?.StreetAbbreviation}`,
    description: `${main_data?.TypeOwn1Out}.${main_data?.Municipality}`,
  };
}
