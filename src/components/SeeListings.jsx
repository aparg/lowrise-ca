import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";

const SeeListings = () => {
  return (
    <div className="w-full bg-gray-100 py-20 flex flex-col items-center mb-[20rem]">
      <div className="max-w-[90%]">
        <h2 className="uppercase text-sm sm:text-md text-center text-gray-600">
          Lowrise real estate listings
        </h2>
        <h1 className="text-2xl sm:text-4xl font-bold text-center">
          See listings available with us
        </h1>
        <section className="w-fit-content mx-auto grid grid-cols-1 sm:grid-cols-3 mt-8 sm:mt-16 sm:gap-x-40 sm:gap-y-0 gap-y-8">
          <div className="">
            <h2 className="font-bold text-xl mb-2">Popular cities near you</h2>
            <ul>
              <li>
                <Link
                  href={generateURL({ cityVal: "Toronto" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Toronto Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Ottawa" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Ottawa Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Mississauga" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Mississauga Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ cityVal: "Ajax" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Ajax Homes for Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-bold text-xl mb-2">
              Types of houses available
            </h2>
            <ul>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "semi detached" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Semi detached Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "detached" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Detached Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "duplex" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Duplex Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "triplex" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Triplex Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ houseTypeVal: "town house" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Town house for Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-fit">
            <h2 className="font-bold text-xl mb-2">Rent or Buy</h2>
            <ul>
              <li>
                <Link
                  href={generateURL({ saleLeaseVal: "sale" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Ontario Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  href={generateURL({ saleLeaseVal: "lease" })}
                  className="text-primary-green my-4 sm:font-medium text-sm"
                >
                  Ontario Homes for Lease
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeeListings;
