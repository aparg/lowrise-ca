import dynamic from "next/dynamic";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import { residential } from "../../../../../api/routes/fetchRoutes";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getSalesData } from "../../../../../api/getSalesData";
import BookShowingForm from "@/components/BookShowingForm";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });
import PropertyPage from "@/components/PropertyPage";
import BookingDate from "@/components/BookingDate";
import FAQ from "@/components/FAQ";
import MortgageCalculator from "@/components/MortgageCalculator";
import Image from "next/image";
import Slider from "@/components/Slider";
import Breadcrumbs from "@/components/Breadcrumbs";
import CreateSchema from "@/helpers/CreateSchema";
import { slugGenerator } from "@/helpers/slugGenerator";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import PriceButton from "@/components/PriceButton";
import formatCurrency from "@/helpers/formatCurrency";
import Carousel from "@/components/Carousel";
import { generateURL } from "@/helpers/generateURL";
import MobileGallery from "@/components/MobileGallery";
import Thumbnails from "@/components/Thumbnails";
import TimeAgo from "@/helpers/TimeAgo";
// import { Button } from "@nextui-org/react";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 4;

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
  const city = params.city.split("-").join(" ");
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
    { label: formattedSlug, href: generateURL({ cityVal: city }) },
    {
      label: `${main_data.Street} ${main_data.StreetName}${" "}
    ${main_data.StreetAbbreviation}`,
      href: "#",
    },
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
    <>
      <div className="flex justify-center">
        <div>
          <script
            key={main_data.MLS}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(CreateSchema(main_data)),
            }}
          />
          <div className="pt-md-3 pt-0 ">
            <div className="sticky top-0 z-[999]">
              <Breadcrumbs items={breadcrumbItems} />
              {/* <Thumbnails setCurrentImageIndex={setCurrentImageIndex} /> */}
            </div>
            <section className="padding-top w-full text-sm flex flex-col items-center justify-center gy-2 relative">
              <div className="hidden sm:block relative">
                <Gallery data={imageURLs} />
                <div className="space-x-2 order-2 sm:order-1 absolute bottom-2 left-2">
                  <button className="bg-[#CC0B0B] p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                    <TimeAgo modificationTimestamp={main_data.TimestampSql} />
                  </button>
                  <button className="bg-[#CC0B0B] p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                    <span>{main_data.TypeOwn1Out}</span>
                  </button>
                </div>
              </div>
              {/* Carousel is only for mobile. */}
              <Carousel urls={imageURLs} />
              <div className=" w-full flex justify-center pt-0 sm:pt-4 relative">
                <div className="grid sm:grid-cols-6 grid-cols-1 justify-between sm:justify-between w-full sm:gap-x-6 gap-y-8 sm:gap-y-0 relative">
                  <div className={`sm:col-span-4 col-span-4 col-md-8 `}>
                    <PropertyPage {...{ main_data }} />
                    <BookingDate bannerImage={imageURLs[0]} />
                    <div className="z-20 relative mt-8 sm:mt-24">
                      <h2 className="font-extrabold pb-3 text-lg sm:text-4xl">
                        Map View
                      </h2>
                      <Map main_data={main_data} />
                    </div>
                  </div>

                  <div
                    className="sm:col-span-2 col-span-2 relative"
                    id="contact"
                  >
                    <BookShowingForm address={address}></BookShowingForm>
                  </div>
                  <div className="mt-24 mb-10 col-span-4">
                    <FAQ main_data={main_data} />
                  </div>
                </div>
              </div>

              {formattedSlug && newSalesData?.length > 0 && (
                <section className="additonal__listing w-full mx-auto mt-24">
                  <PropertyDisplaySection title="You might be interested in">
                    <Slider data={newSalesData} type="resale" />
                  </PropertyDisplaySection>
                </section>
              )}

              <PriceButton price={formatCurrency(main_data?.ListPrice)} />
            </section>
          </div>
        </div>
      </div>
    </>
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
      canonical: `https://lowrise.ca/listings/${slugGenerator(main_data)}`,
    },
    openGraph: {
      images: await fetch(imageURLs[0]),
    },
    title: `${main_data?.Street} ${main_data?.StreetName} ${main_data?.StreetAbbreviation}`,
    description: `${main_data?.TypeOwn1Out}.${main_data?.Municipality}`,
  };
}
