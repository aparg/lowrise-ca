import Link from "next/link";
import React from "react";

const PropertyDisplaySection = ({
  title,
  subtitle,
  exploreAllLink,
  children,
}) => {
  return (
    <div className="mt-20 sm:mt-20">
      <div className="my-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-2xl font-bold">{title}</h3>
          <Link href={exploreAllLink || "#"}>
            <button className="border-black font-bold border-2 inline px-3 py-2 rounded-md">
              Explore All
            </button>
          </Link>
        </div>
        {subtitle && <h5 className="font-md text-md mt-2">{subtitle}</h5>}
      </div>
      {children}
    </div>
  );
};

export default PropertyDisplaySection;
