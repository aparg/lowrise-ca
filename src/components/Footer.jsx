// "use client";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { Image } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { generateURL } from "@/helpers/generateURL";

// const Footer = ({ cities }) => {
//   const [centered, setCentered] = useState(false);
//   const pathname = usePathname();

//   if (pathname.startsWith("/admin")) {
//     return <></>;
//   }
//   useEffect(() => {
//     if (pathname.includes("/listings")) {
//       setCentered(true);
//     }
//   }, []);

//   const [formValues, setFormValues] = useState({ name: "", email: "" });
//   return (
//     <>
//       <footer className="bg-gray-50 mt-40 container-fluid py-20 sm:p-30">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-y-0 sm:gap-x-20 text-[14px]">
//           <div className="flex flex-col justify-around">
//             {/* <img src="/logo/dolphin-logo.png" className="w-60" alt="logo"></img> */}
//             <Link href="/" className="d-flex align-items-end">
//               <h3
//                 // className="w-20 hidden md:block"
//                 className={`w-42 font-extrabold text-2xl text-black text-center mr-5  mb-0`}
//               >
//                 Lowrise
//               </h3>
//             </Link>
//             <Link href="https://www.dolphinrealty.ca/">
//               <img src="/logo/dolphin-logo.png" className="mt-4 w-28"></img>
//             </Link>
//             <div className="my-4 leading-7">
//               Thank you for visiting my website. With over a decade of
//               experience in residential, commercial, and pre-construction real
//               estate, I'm committed to providing personalized service and expert
//               guidance. Let's work together to achieve your real estate goals.
//             </div>
//             <div className="">
//               Website designed by{" "}
//               <b>
//                 <Link href="https://sixdesign.ca" target="_blank">
//                   SixDesign
//                 </Link>
//               </b>
//             </div>
//           </div>
//           <div className="flex justify-start sm:justify-end">
//             <div className="flex flex-col justify-end leading-7 h-[70%]">
//               <h2 className="font-bold text-2xl mb-4">Contact Me</h2>
//               <div className="flex flex-col justify-start">
//                 <span>Fara Abdollah-Foroghi</span>
//                 <span>Dolphin Realty Inc.</span>
//                 <span>905-909-0101</span>
//                 <span>8300 Woodbine Ave , #403, Markham, L3R 9Y7</span>
//                 <span>faranakforoghi@gmail.com</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col justify-start sm:justify-center">
//             <div className="w-full sm:w-1/3 flex items-center h-full justify-around mt-4">
//               <Link href="#">
//                 <img
//                   src="/portfolio-icons/fb.svg"
//                   className="inline mr-2 w-6 sm:w-4"
//                   alt="facebook"
//                 />
//               </Link>
//               <Link href="https://www.instagram.com/faranakforoghi/">
//                 <img
//                   src="/portfolio-icons/insta.svg"
//                   className="inline mr-2 w-6 sm:w-4"
//                   alt="instagram"
//                 />
//               </Link>
//               <Link href="https://ca.linkedin.com/in/fara-foroghi-a0a24997">
//                 <img
//                   src="/portfolio-icons/linkedin.svg"
//                   className="inline mr-2 w-6 sm:w-4"
//                   alt="linkedin"
//                 />
//               </Link>
//               {/* <Link href="#">
//                 <img
//                   src="/portfolio-icons/twitter.svg"
//                   className="inline mr-2 w-4"
//                   alt="twitter"
//                 />
//               </Link> */}
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 text-xs">
//           The listing data is provided under copyright by the Toronto Regional
//           Real Estate Board (TRREB). The information provided herein must only
//           be used by consumers that have a bona fide interest in the purchase,
//           sale or lease of real estate and may not be used for any commercial
//           purpose or any other purpose. The data is deemed reliable but is not
//           guaranteed accurate by the Toronto Regional Real Estate Board
//           <br />
//           <br />
//           The REALTOR® trademark is controlled by The Canadian Real Estate
//           Association (CREA) and identifies real estate professionals who are
//           members of CREA. The trademarks MLS®, Multiple Listing Service® and
//           the associated logos identify professional services rendered by
//           REALTOR® members of CREA to effect the purchase, sale and lease of
//           real estate as part of a cooperative selling system. 0.11 index
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { allCities } from "@/constant/cities";
import { generateURL } from "@/helpers/generateURL";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/Linkdmin")) {
    return <></>;
  }
  return (
    <div className="pt-5 bg-gray-100 w-full">
      <footer className="footer mt-5">
        <div className="container">
          <div className=" container pt-5 mt-md-5 mt-0">
            <div className="container footer-links">
              <h3 className="text-center font-bold pb-2 text-2xl font-family2">
                {" "}
                New homes in Canada
              </h3>
              <div className="footer-listcontainer text-center max-w-4xl mx-auto">
                <ul className=" text-center">
                  <div className="text-center grid grid-cols-2 sm:grid-cols-3 justify-center">
                    {allCities &&
                      allCities.map((val, idx) => (
                        <li
                          key={idx}
                          className="text-center flex justify-center"
                        >
                          {console.log(val)}
                          <Link
                            href={generateURL({ cityVal: val.city })}
                            className="text-center"
                          >
                            <span className="text-center">
                              New homes in {val.city}
                            </span>
                          </Link>
                        </li>
                      ))}
                  </div>
                </ul>
              </div>
            </div>
            <div className="container mx-auto px-4 py-8"></div>
          </div>
        </div>

        <footer className="text-gray-800 py-8 px-4 md:px-8 max-w-5xl mx-auto">
          <div className="mx-auto">
            {/* <h2 className="text-3xl font-bold mb-6">FaraForoghi</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/" className="flex justify-center">
                <h1 className="text-4xl font-extrabold text-black sm:text-2xl lg:text-3xl sm-center font-family2 order-1 text-left mw">
                  Lowrise<span className="text-[#FF0000]">.</span>ca
                </h1>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="max-w-2xl">
                <p className="text-sm my-4 text-center">
                  Lowrise is Canada's one of the largest database of new pre
                  construction homes. Our comprehensive database is populated by
                  our research and analysis of publicly available data. Lowrise
                  strives for accuracy and we make every effort to verify the
                  information. The information provided on Lowrise.ca may be
                  outdated or inaccurate. Lowrise is not liable for the use or
                  misuse of the site's information.The information displayed on
                  Lowrise.ca is for reference only. Please contact a liscenced
                  real estate agent or broker to seek advice or receive updated
                  and accurate information.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p>4 Robert speck parkway,</p>
                <p>Mississauga, ONTARIO</p>
                <p className="mt-2">Phone: 647 527 4970</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@faraforoghi.ca"
                    className="text-blue-600 hover:underline"
                  >
                    info@lowrise.ca
                  </a>
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Link href="" className="text-gray-600 hover:text-gray-800">
                  <FaFacebook size={24} />
                </Link>
                <Link href="" className="text-gray-600 hover:text-gray-800">
                  <FaInstagram size={24} />
                </Link>
                <Link href="" className="text-gray-600 hover:text-gray-800">
                  <FaLinkedin size={24} />
                </Link>
              </div>
            </div>

            <div className="text-xs text-[#ACAAAA] mt-10 sm:mt-0">
              This representation is based in whole or part on data generated by
              the Toronto Regional Real Estate Board. The Toronto Regional Real
              Estate Board and the page owner assumes no responsibility for its
              accuracy. The materials contained on this page may not be
              reproduced without the express written consent of the Toronto
              Regional Real Estate Board and the page owner.
            </div>
            <div className="flex flex-row w-28 mx-auto">
              <img src="/logo/trebb.png"></img>
            </div>
            <div className="mt-8 text-center text-sm">
              ©2024 Copyright Lowrise All Rights Reserved
            </div>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default Footer;
