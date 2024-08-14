"use client";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import { generateURL } from "@/helpers/generateURL";
import citiesWithProvinces from "@/constant/cities";

const Navbar = (props) => {
  const [isSticky, setIsSticky] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  // const { comparisonFlag } = useComparisionFlag();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }

  useEffect(() => {
    const handleScroll = async () => {
      const offset = window.scrollY;
      // console.log(offset);
      setIsSticky(offset > 0);
      if (offset > 0 && pathname.includes("/ontario")) {
        setShowNavbar(false);
      }
      if (offset === 0) {
        setShowNavbar(true);
      }
    };
    // Add event listener to scroll event
    window.addEventListener("scroll", handleScroll);
    if (pathname.includes("/listings")) {
      setIsSticky(false);
    }
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const isPropertyPage = useMemo(() => {
    return pathname.includes("/listings");
  }, [pathname]);

  const isCityPage = useMemo(() => {
    return;
  });

  const whiteLogoPath = "/logo/whitelogo.svg";
  const blackLogoPath = "/logo/blacklogo.svg";

  const cities = citiesWithProvinces.map((obj) => {
    return { name: obj.city, link: generateURL({ cityVal: obj.city }) };
  });

  const buyOpts = [
    {
      name: "Semi-detached Homes for Sale",
      link: generateURL({ houseTypeVal: "semiDetached" }),
    },
    {
      name: "Detached Homes for Lease",
      link: generateURL({ houseTypeVal: "detached" }),
    },
    {
      name: "Townhomes for Sale",
      link: generateURL({ houseTypeVal: "townhomes" }),
    },
    {
      name: "Duplex  Homes for Sale",
      link: generateURL({ houseTypeVal: "duplex" }),
    },
    {
      name: "Triplex Homes for Sale",
      link: generateURL({ houseTypeVal: "triplex" }),
    },
  ];

  const calculatorOpts = [
    { name: "Mortgage Calculator", link: "/calculator/mortgage" },
    { name: "Property Tax Calculator", link: "/calculator/property-tax" },
    { name: "Home Evaluation", link: "/home-value-estimator" },
  ];

  return (
    <header
      className={`lg:pb-0 relative bg-white ${showNavbar ? "" : "hidden"} ${
        isSticky
          ? "bg-white sticky top-0 z-[1000]"
          : "z-[1000] md:bg-transparent"
      }  container-fluid`}
    >
      <div className={`${isSticky && "sticky"}`}>
        <nav className={`flex items-center justify-between h-14 sm:h-[5rem]`}>
          <div className="flex-shrink-0 flex h-full items-center mr-2">
            {/* <Link href="/" className="logo d-flex align-items-center">
              <Image
                className="w-22 hidden md:block"
                src={"/logo/dolphin-logo.png"}
              />
              <Image className="w-20 md:hidden" src={blackLogoPath} />
            </Link> */}
            <Link href="/" className="logo d-flex align-items-center">
              <h1 className="text-4xl font-extrabold text-black sm:text-2xl lg:text-3xl sm-center font-family2 order-1 text-left mw">
                Lowrise<span className="text-[#FF0000]">.</span>ca
              </h1>
            </Link>
            {/* <h1 className="w-20 md:hidden" src={blackLogoPath} /> */}
          </div>

          <div className="flex items-center border-2 h-[40px] rounded-md w-auto">
            <SearchBar />
            <button
              className="input-group-text h-full bg-gray-100 mybtn block  py-search"
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
          </div>

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={() => setHidden(!hidden)}
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                // strokeLinecap="round"
                // stroke-linejoin="round"
                // strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-5">
            {/* <Link
              href={generateURL({ saleLeaseVal: "sale" })}
              title=""
              className={`text-sm font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black hover:text-green-200 active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Buy{" "}
            </Link> */}
            <Dropdown
              name="Buy"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={buyOpts}
              width="auto"
            />
            <Dropdown
              name="Calculator"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={calculatorOpts}
            />
            <Dropdown
              name="Popular cities"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={cities}
            />
            <Link
              href="/blogs"
              title=""
              className={`text-sm font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Blog{" "}
            </Link>

            <Link
              href="/contact"
              title=""
              className={`text-sm font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Contact{" "}
            </Link>
            <Link
              href="#"
              title=""
              className={`text-sm font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
             ${!isHomePage && "text-black"}`}
            >
              <Link href="tel:4168458996" className="flex items-center">
                <img src="/contact.png" className="w-12"></img>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-sm font-bold">(419) 999-8999</div>
                  <div className="text-sm">Speak with Lowrise Team</div>
                </div>
              </Link>
            </Link>
          </div>
        </nav>

        {/* Mobile version */}
        <div
          className={`py-4 bg-white border border-gray-200 rounded-md ${
            hidden && "hidden"
          } lg:hidden`}
        >
          <div className="flow-root">
            <div className="flex flex-col px-6 space-y-3">
              <Dropdown
                name="Buy"
                text={isSticky || !isHomePage ? "black" : "white"}
                options={buyOpts}
                width="auto"
              />
              <Dropdown
                name="Calculator"
                text={isSticky || !isHomePage ? "black" : "white"}
                options={calculatorOpts}
              />
              <Dropdown
                name="Popular cities"
                text={isSticky || !isHomePage ? "black" : "white"}
                options={cities}
              />
              <Link
                href="/blogs"
                title=""
                className={`text-sm font-normal transition-all duration-200 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
               ${!isHomePage && "text-black"}`}
              >
                {" "}
                Blog{" "}
              </Link>
              <Link
                href="/contact"
                title=""
                className={`text-sm font-normal transition-all duration-200 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
               ${!isHomePage && "text-black"}`}
              >
                {" "}
                Contact{" "}
              </Link>
              <Link
                href="#"
                title=""
                className={`text-sm font-normal transition-all duration-200 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
             ${!isHomePage && "text-black"}`}
              >
                <Link href="tel:4168458996" className="flex items-center">
                  <img src="/portfolio-img/contact1.png" className="w-12"></img>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-sm font-bold">(416) 845-8996</div>
                    <div className="text-sm">Speak with Lowrise team</div>
                  </div>
                </Link>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
