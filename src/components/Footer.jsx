"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { allCities } from "@/constant/cities";
import { generateURL } from "@/helpers/generateURL";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import NewsletterSignup from "./NewsletterSignup";

const Footer = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/Linkdmin")) {
    return null;
  }

  return (
    <>
      <NewsletterSignup />
      <footer className="text-black mt-10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {/* New homes section */}
            <div>
              <h3 className="text-5xl font-extrabold text-center mb-12 font-family2">
                Explore New Homes For Sale In Canada
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm">
                {allCities.map((val, idx) => (
                  <li key={idx} className="text-center">
                    <Link
                      href={generateURL({ cityVal: val.city })}
                      className="hover:text-blue-600 transition-colors"
                    >
                      New homes in {val.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main footer content */}
            <div className="flex flex-col items-center text-center">
              <div className="max-w-3xl">
                <div className="flex justify-center">
                  <Link href="/">
                    <div className="flex justify-center">
                      <Image
                        src="/lowriselogo.svg"
                        alt="Lowrise Logo"
                        width={200}
                        height={200}
                      />
                    </div>
                  </Link>
                </div>
                <p className="text-sm leading-relaxed mb-8">
                  Lowrise is Canada's one of the largest databases of new
                  pre-construction homes. Our comprehensive database is
                  populated by our research and analysis of publicly available
                  data. Lowrise strives for accuracy and we make every effort to
                  verify the information. The information provided on Lowrise.ca
                  may be outdated or inaccurate. Lowrise is not liable for the
                  use or misuse of the site's information. The information
                  displayed on Lowrise.ca is for reference only. Please contact
                  a licensed real estate agent or broker to seek advice or
                  receive updated and accurate information.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                    <address className="not-italic text-sm">
                      <p>4 Robert Speck Parkway, Mississauga, ONTARIO</p>
                      <p>Phone: 647 527 4970</p>
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:info@lowrise.ca"
                          className="text-blue-600 hover:underline"
                        >
                          info@lowrise.ca
                        </a>
                      </p>
                    </address>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                    <div className="flex justify-center space-x-4">
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <FaFacebook size={24} />
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <FaInstagram size={24} />
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-blue-800 transition-colors"
                      >
                        <FaLinkedin size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo and copyright */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col items-center space-y-4">
              <Link href="/">
                <div className="flex justify-center">
                  <Image
                    src="/lowriselogo.svg"
                    alt="Lowrise Logo"
                    width={200}
                    height={200}
                  />
                </div>
              </Link>
              <p className="text-xs text-gray-500 max-w-2xl text-center">
                This representation is based in whole or part on data generated
                by the Toronto Regional Real Estate Board. The Toronto Regional
                Real Estate Board and the page owner assumes no responsibility
                for its accuracy. The materials contained on this page may not
                be reproduced without the express written consent of the Toronto
                Regional Real Estate Board and the page owner.
              </p>
              <img src="/logo/trebb.png" alt="TREBB Logo" className="w-28" />
              <p className="text-sm">
                ©2024 Copyright Lowrise All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
