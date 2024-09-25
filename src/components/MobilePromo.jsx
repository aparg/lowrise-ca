import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

const MobilePromo = () => {
  return (
    <div className="bg-gray-100 rounded-md p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between relative my-60">
      <div className="mb-8 md:mb-0 md:mr-8 lg:mr-16">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">
          MOBILE VERSION
        </h2>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Expand your search
          <br />
          experience on your phone
        </h1>
        <p className="text-gray-600 mb-6">
          Easy search for homes for sale
          <br />
          or lease across Ontario.
        </p>
      </div>
      <div className="absolute right-0 w-full max-w-sm md:max-w-md lg:max-w-lg">
        <Image
          src="/images/lowrise-sc.png"
          alt="Mobile app screenshot"
          width={300}
          height={600}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

export default MobilePromo;
