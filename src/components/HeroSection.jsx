import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const HouseTypeCard = ({ type, icon }) => (
  <div className="bg-white p-4 rounded-lg text-center border transition duration-300">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="font-semibold text-gray-800">{type}</h3>
  </div>
);

const houseTypes = [
  { type: "Detached", icon: "🏡" },
  { type: "Semi-Detached", icon: "🏘️" },
  { type: "Townhouse", icon: "🏚️" },
];

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <Link href="/">
              <div className="flex justify-start mb-5">
                <img
                  src="/lowriselogo.svg"
                  alt="Lowrise Logo"
                  width={200}
                  height={200}
                />
              </div>
            </Link>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Your premier destination for low-rise homes across Canada.
              Discover curated selections of townhomes, bungalows, and other
              low-rise properties in prime locations.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
              {houseTypes.map((house, index) => (
                <HouseTypeCard
                  key={index}
                  type={house.type}
                  icon={house.icon}
                />
              ))}
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
            {/* <div className="flex items-center h-[40px] rounded-md w-auto mt-10">
              <SearchBar bigger={true} />
              <button
                className="bg-gray-100 px-4 h-[60px] search-button rounded-md"
                type="button"
                aria-label="Search Button"
              >
                <svg
                  aria-hidden="true"
                  className="svg"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  width="22"
                >
                  <path
                    d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                    fill="#000000"
                  ></path>
                </svg>
              </button>
            </div> */}
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <Image
                src="/hero-img.png"
                alt="Lowrise homes"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
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
