import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { generateURL } from "@/helpers/generateURL";

const HouseTypeCard = ({ type, icon, link }) => (
  <Link href={link} className="text-black">
    <div className="bg-white p-4 rounded-lg text-center hover:cursor-pointer hover:border-primary-green border-2 transition duration-300 h-full">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-800">{type}</h3>
    </div>
  </Link>
);

const houseTypes = [
  { type: "Detached", icon: "🏡" },
  { type: "Semi-Detached", icon: "🏘️" },
  { type: "Townhouse", icon: "🏚️" },
];

const HeroSection = () => {
  return (
    <div className="">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between mt-5 pb-12 gap-x-10 lg:pb-20 gap-y-12 sm:gap-y-0">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 order-2 sm:order-1">
            <Link href="/">
              <div className="flex flex-col justify-start mb-5">
                <img
                  src="/lowriselogo.svg"
                  alt="Lowrise Logo"
                  width={200}
                  height={200}
                />
                <h2 className="font-medium mt-2 text-2xl">
                  Home for everyone!
                </h2>
              </div>
            </Link>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              Your premier destination for low-rise homes across Canada.
              Discover curated selections of townhomes, bungalows, and other
              low-rise properties in prime locations.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4">
              {houseTypes.map((house, index) => (
                <HouseTypeCard
                  key={index}
                  type={house.type}
                  icon={house.icon}
                  link={generateURL({
                    houseTypeVal: house.type.split("-").join("").toLowerCase(),
                  })}
                />
              ))}
            </div>
            <div className="w-full mt-8">
              <SearchBar bigger={true} />
            </div>
            <div className="flex flex-wrap gap-4 my-8">
              <Link href="#contact">
                <button className="px-6 py-3 bg-primary-green text-white font-semibold rounded-lg shadow-md hover:bg-primary-green transition duration-300 ease-in-out">
                  Contact Us
                </button>
              </Link>
              <Link href="#learn-more">
                <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md border border-gray-300 hover:bg-gray-50 transition duration-300 ease-in-out">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2  relative order-1 sm:order-2">
            {/* <div className="relative w-full h-[500px] lg:h-[600px]"> */}
            <Image
              src="/hero-img.png"
              alt="Lowrise homes"
              width="800"
              height="600"
              className="rounded-lg h-[400px] sm:h-[500px] lg:h-[600px]"
              priority
            />
            {/* </div> */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-900">
                Featured Property
              </p>
              <p className="text-xs text-gray-600">
                Modern Townhouse in Downtown
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
