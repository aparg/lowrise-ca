import { residential } from "@/api/routes/fetchRoutes";
import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";

const PropertiesDisplayer = ({ data }) => {
  return (
    <section class="py-12 sm:py-16 bg-gray-800 rounded-xl">
      <div class="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div class="grid items-center grid-cols-1 lg:grid-cols-2 gap-5 xl:grid-cols-3 xl:gap-x-12">
          <div class="xl:order-2 xl:pb-0 pb-12 lg:col-span-2 xl:col-span-1 bg-dark-gray rounded-lg">
            <div class="xl:px-8 xl:py-12">
              <h2 class="tracking-tighter text-white">
                <span class="font-sans text-4xl font-normal sm:text-5xl md:text-6xl">
                  {" "}
                  Homes with
                </span>
                <span class="font-serif text-5xl italic sm:text-6xl md:text-7xl">
                  {" "}
                  Fireplaces
                </span>
              </h2>
              <p class="mt-6 font-sans text-lg font-normal leading-8 text-opacity-50 text-white">
                Where marshmallows meet their toasty fate and cold feet find
                their cozy soulmates.
              </p>
              {/* <div class="mt-12">
                <a
                  href="#"
                  title=""
                  class="
                                inline-flex
                                items-center
                                justify-center
                                px-5
                                py-2
                                font-sans
                                text-base
                                font-semibold
                                transition-all
                                duration-200
                                border-2 border-transparent
                                rounded-full
                                sm:leading-8
                                bg-white
                                sm:text-lg
                                text-black
                                hover:bg-opacity-90
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
                            "
                  role="button"
                >
                  View More
                  <svg
                    class="h-6 w-6 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div> */}
            </div>
          </div>

          <div class="xl:order-1 grid grid-cols-2 gap-5">
            {data.map((property, idx) => {
              if (idx < 2) {
                return (
                  <DisplayerCard
                    MLS={property.MLS}
                    address={property.Address}
                    type={property.TypeOwn1Out}
                  />
                );
              }
            })}
          </div>

          <div class="xl:order-3 grid grid-cols-2 gap-5">
            {data.map((property, idx) => {
              if (idx >= 2) {
                return (
                  <DisplayerCard
                    MLS={property.MLS}
                    address={property.Address}
                    type={property.TypeOwn1Out}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const DisplayerCard = ({ MLS, address, type }) => {
  const mapObj = {
    MLS: MLS,
    index: 1,
  };
  const imgSrc = residential.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });
  return (
    <Link href={generateURL({ listingIDVal: MLS })}>
      <div class="relative overflow-hidden rounded-lg">
        <div class="h-[30rem]">
          <img src={imgSrc} class="object-cover w-full h-full" alt="" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-red-800 via-transparent to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0">
          <div class="px-4 py-6">
            <p class="font-sans text-base font-medium text-white">{address}</p>
            <p class="mt-1 font-serif text-sm italic text-white">{type}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PropertiesDisplayer;
