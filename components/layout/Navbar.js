"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Dropdown from "@/components/resale/Dropdown";
import { usePathname } from "next/navigation";
import { generateURL } from "@/helpers/generateResaleURL";
import citiesWithProvinces from "@/constant/cities";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import UnifiedSearchBar from "@/components/UnifiedSearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const cities = citiesWithProvinces.map((obj) => obj.city.toLowerCase());
  const cityName = cities.find((city) => !!pathname?.match(city));

  const buyOpts = [
    {
      name:
        "All homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Semi Detached Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Detached Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Townhomes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "townhomes",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Condos for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "condo",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Price dropped homes" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        priceDropped: true,
      }),
    },
  ];

  const rentOpts = [
    {
      name:
        "All homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Semi Detached Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Detached Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Townhomes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "Townhomes",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Condos for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "condo",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
  ];
  return (
    <>
      <nav className={`flex items-center justify-between px-4 py-3 bg-white`}>
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-center">
              <img src="/lowriselogo.svg" alt="Logo" className="w-24" />
            </Link>
          </div>

          {/* Search Section - Desktop */}
          <div className="hidden sm:block ml-4">
            <UnifiedSearchBar />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-7">
          <Dropdown
            name={`Buy ${
              cityName ? "in " + capitalizeFirstLetter(cityName) : ""
            }`}
            text={"red"}
            options={buyOpts}
            width="auto"
          />
          <Dropdown
            name={`Rent ${
              cityName ? "in " + capitalizeFirstLetter(cityName) : ""
            }`}
            text={"red"}
            options={rentOpts}
            width="auto"
          />
          <Link
            href="#"
            className="text-sm text-gray-900 hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Assignment
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-900 hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Blogs
          </Link>
          <Link
            href="/contact-us"
            className="text-sm text-gray-900 hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          {/* Search Section - Mobile */}
          <div className="flex-1 max-w-xs mx-4 me-auto sm:hidden">
            <UnifiedSearchBar small={true} />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="flex flex-col py-3 mt-20">
                  <div className="px-6 py-4">
                    <Dropdown
                      name={`Buy ${
                        cityName ? "in " + capitalizeFirstLetter(cityName) : ""
                      }`}
                      text={"red"}
                      options={buyOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                    />
                  </div>
                  <div className="px-6 py-4">
                    <Dropdown
                      name={`Rent ${
                        cityName ? "in " + capitalizeFirstLetter(cityName) : ""
                      }`}
                      text={"red"}
                      options={rentOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                    />
                  </div>
                  <Link
                    href="/assignment-sale"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Assignment
                  </Link>
                  <Link
                    href="/contact-us"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
