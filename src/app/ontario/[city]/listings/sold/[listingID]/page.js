import Gallery from "@/components/Gallery";
import capitalizeFirstLetter from "@/helpers/capitalizeLetter";
import {
  fetchDataFromMLS,
  fetchRoomInfo,
  getImageUrls,
  // fetchStatsFromMLS,
  getSalesData,
} from "@/_resale-api/getSalesData";
import BookShowingForm from "@/components/BookShowingForm";
// const Map = dynamic(() => import("@/components/Map"), { ssr: false });
// import Map from "@/components/Map";

import PropertyPage from "@/components/PropertyPage";
import BookingDate from "@/components/BookingDate";
import FAQ from "@/components/FAQ";
import Slider, { SliderSkeleton } from "@/components/Slider";
import Breadcrumbs from "@/components/Breadcrumbs";
import CreateSchema from "@/helpers/CreateSchema";
import { slugGenerator } from "@/helpers/slugGenerator";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import PriceButton from "@/components/PriceButton";
import formatCurrency from "@/helpers/formatCurrency";
import Carousel from "@/components/Carousel";
import { generateURL } from "@/helpers/generateResaleURL";
import TimeAgo from "@/components/TimeAgo";
import { homeText, houseType } from "@/constant";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import UnlockableCards from "@/components/UnlockableCards";
import SideContactForm from "@/components/SideContactForm";
import { cityRegions } from "@/constant/postalCodeCities";

// import { getNotes } from "@/helpers/getNotes";
// import { Button } from "@nextui-org/react";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 4;

const page = async ({ params }) => {
  const { city, listingID } = await params;
  const cityValue = city.split("-").join(" ");
  const formattedSlug = capitalizeFirstLetter(cityValue);
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;
  let main_data = await fetchDataFromMLS(listingIDValue, true); //always a single object inside the array
  const newSalesData = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    formattedSlug,
    main_data?.PropertyType,
    true
  );
  const oldSoldData = await getSalesData(
    INITIAL_OFFSET,
    4,
    formattedSlug,
    main_data?.PropertyType,
    true
  );

  // const statsValue = await fetchStatsFromMLS({
  //   listingType: main_data?.PropertySubType,
  //   municipality: main_data?.City,
  //   saleLease: main_data?.TransactionType,
  // });
  // main_data.avg = statsValue?.avg
  //   ? parseFloat(statsValue?.avg?.toFixed(0)).toLocaleString()
  //   : null;
  // const imageURLs = generateImageURLs(
  //   listingIDValue,
  //   parseInt(main_data?.PhotoCount)
  // );
  const propertyTypeName = Object.values(houseType).find(
    (obj) =>
      obj?.value?.toLowerCase() == main_data?.PropertySubType?.toLowerCase()
  )?.name;
  const breadcrumbItems = [
    { label: "Ontario", href: "/ontario" },
    { label: formattedSlug, href: generateURL({ cityVal: cityValue }) },
    {
      label: `${homeText[propertyTypeName] || propertyTypeName || ""} ${
        main_data.TransactionType
      } `,
      href: generateURL({
        cityVal: cityValue,
        saleLeaseVal: main_data?.TransactionType?.toLowerCase(),
        houseTypeVal: propertyTypeName?.toLowerCase() || null,
      }),
    },
    {
      label: `${main_data.StreetNumber} ${main_data.StreetName}${" "}
    ${main_data.StreetSuffix}`,
      href: "#",
    },
  ];
  const roomData = await fetchRoomInfo(listingIDValue);
  // const address = `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix}`;
  const address = [
    main_data?.StreetNumber,
    main_data?.StreetName,
    main_data?.StreetSuffix,
  ]
    .filter(Boolean)
    .join(" ");

  const imageURLs = await getImageUrls({ MLS: main_data?.ListingKey });
  const region = cityRegions.find((cityRegion) =>
    cityRegion.regions.includes(main_data.City)
  );
  return (
    <>
      <div className="flex justify-center sm:max-w-[90%] min-[2000px]:max-w-[65%] mx-auto">
        <div>
          <script
            key={main_data.ListingKey}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(CreateSchema(main_data)),
            }}
          />
          <div className="pt-md-3 pt-0 ">
            <div className="sticky top-[0rem] z-[500] max-w-[100vw] overflow-x-auto">
              <Breadcrumbs items={breadcrumbItems} />
              {/* <Thumbnails setCurrentImageIndex={setCurrentImageIndex} /> */}
            </div>
            <section className="padding-top w-full text-sm flex flex-col items-center justify-center gy-2 relative">
              <div className="hidden sm:block relative w-full">
                <Gallery data={imageURLs} />
                {/* <div className="space-x-2 order-2 sm:order-1 absolute bottom-2 left-2">
                  <button className="bg-resale-primary-color p-1 text-black text-xs mt-1 mb-2 sm:my-0 w-fit-content rounded-md border-gray-500 border-[1px]">
                    <TimeAgo
                      modificationTimestamp={main_data.OriginalEntryTimestamp}
                    />
                  </button>
                  <button className="bg-resale-primary-color p-1 text-black text-xs mt-1 mb-2 sm:my-0 w-fit-content rounded-md border-gray-500 border-[1px]">
                    <span>{main_data.PropertySubType}</span>
                  </button>
                </div> */}
              </div>
              {/* Carousel is only for mobile. */}
              <Carousel urls={imageURLs} />
              <div className=" w-full flex justify-center pt-0 sm:pt-4 relative">
                <div className="grid sm:grid-cols-9 grid-cols-1 justify-between sm:justify-between w-full sm:gap-x-8 gap-y-12 sm:gap-y-0 relative max-w-[90%] sm:max-w-[75%]">
                  <div className={`sm:col-span-6 col-span-9`}>
                    <PropertyPage {...{ main_data, room_data: roomData }} />

                    <BookingDate bannerImage={imageURLs[0]} city={city} />
                    {/* <div className="z-20 relative mt-12 sm:mt-24">
                      <h2 className="font-extrabold text-2xl sm:text-4xl mb-2">
                        Map View
                      </h2>
                      <Map main_data={main_data} />
                    </div> */}
                  </div>

                  <div
                    className="sm:col-span-3 col-span-9 relative"
                    id="mycontact"
                  >
                    <SideContactForm
                      address={address + `, ${main_data?.City}, Ontario`}
                      city={main_data?.City}
                    ></SideContactForm>
                  </div>
                  <div className="mt-24 mb-10 col-span-7">
                    <FAQ main_data={main_data} />
                  </div>
                </div>
              </div>
              {
                <section className="additonal__listing w-full mx-auto mt-24">
                  <PropertyDisplaySection
                    title={`Recently Sold Homes in ${
                      region?.name || main_data?.City || "Ontario"
                    }`}
                    subtitle={`Check out recently sold properties. Listings updated daily`}
                    exploreAllLink={null}
                  >
                    <UnlockableCards data={oldSoldData} />
                    {/* <Slider data={oldSoldData} type="resale" /> */}
                  </PropertyDisplaySection>
                </section>
              }
              {formattedSlug && newSalesData?.length > 0 && (
                <section className="additonal__listing w-full mx-auto mt-24">
                  <PropertyDisplaySection
                    title={`Similar Homes nearby in ${
                      main_data?.City || "Ontario"
                    }`}
                    subtitle={`Check out 100+ listings near this property. Listings updated daily`}
                    exploreAllLink={generateURL({
                      houseTypeVal:
                        houseType[
                          Object.keys(houseType).find(
                            (key) =>
                              houseType[key].value == main_data?.TypeOwnSrch
                          )
                        ]?.name,
                      saleLeaseVal: main_data?.TransactionType,
                      cityVal: city,
                    })}
                  >
                    <Slider data={newSalesData} type="resale" />
                  </PropertyDisplaySection>
                </section>
              )}

              {/* <PriceButton price={formatCurrency(main_data?.ListPrice)} /> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  const { listingID } = await params;
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;
  const main_data = await fetchDataFromMLS(listingIDValue, true);
  const imageURLs = await getImageUrls({
    MLS: main_data?.ListingKey,
    soldData: true,
  });
  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/resale/ontario/${
        params.city
      }/listings/${slugGenerator(main_data)}`,
    },
    openGraph: {
      images: imageURLs[0],
    },
    title: `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix}`,
    description: `${main_data?.PropertySubType}.${main_data?.City}`,
  };
}
