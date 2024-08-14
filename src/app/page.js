import Slider from "@/components/Slider";
import Image from "next/image";
import { getSalesData } from "../../api/getSalesData";
import Link from "next/link";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import { generateURL } from "@/helpers/generateURL";

export default async function Home() {
  const INITIAL_LIMIT = 4;
  const INITIAL_OFFSET = 0;
  const TORONTOHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Toronto"
  );
  const BRAMPTONHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Brampton"
  );
  const MISSISAUGAHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Mississauga"
  );
  const OAKVILLEHOMES = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    "Oakville"
  );
  {
    /* pass property propertyType:"commercial" only for commercial card slider, default is residential */
  }

  return (
    <>
      <div
        className="max-w-full mx-auto relative justify-center sm:h-[92vh] h-[140vh] grid grid-cols-2 gap-x-0 flex items-center"
        id="hero"
      >
        <div className="col-span-2 sm:col-span-1 flex flex-col sm:justify-start justify-center mb-8 sm:mb-0 order-2 sm:order-1">
          {/* <span className="d-block mb-2 text-white">Find Your Next </span>{" "}
                <span className="text-white">Commercial Property </span> */}
          <h1 className="text-4xl/[2.5rem] font-extrabold text-black sm:text-5xl/[4.5rem] lg:text-6xl/[5rem] sm-center font-family2 mt-5 order-1 text-left">
            Lowrise<span className="text-[#FF0000]">.</span>ca
          </h1>
          <div className="order-2 mt-2">
            {/* <h2 className="mt-3 text-2xl text-black font-bold ">Lowrise.ca</h2> */}
            <div className="text-[#000000] leading-7">
              Lowrise.ca is your go-to platform for buying low-rise homes across
              Canada. We specialize in connecting you with a curated selection
              of townhomes, bungalows, and other low-rise properties in prime
              locations. With a user-friendly interface and comprehensive
              listings, finding your dream home has never been easier. Trust
              Lowrise.ca to guide you to the perfect low-rise home that suits
              your lifestyle and budget. Start your home-buying journey with us
              today!
            </div>
          </div>
          <div className="order-3 mt-4 flex flex-row relative">
            <Link href="#">
              <button className="border-black font-bold border-2 bg-black inline sm:px-5 px-3 py-2 rounded-md mr-4 text-white">
                Contact Us
              </button>
            </Link>

            <Link href="#">
              <button className="border-black font-bold border-2 inline px-3 py-2 rounded-md ">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="sm:col-span-1 col-span-2 order-1 my-4 sm:my-2">
          <div className="flex items-center justify-end">
            <Image
              src="/hero-img.png"
              alt="hero-img"
              className="rounded-lg w-full sm:w-10/12"
              width="400"
              height="600"
            />
          </div>
        </div>
      </div>
      <PropertyDisplaySection
        title="Explore homes in Toronto"
        subtitle=""
        exploreAllLink={generateURL({ cityVal: "Toronto" })}
      >
        <Slider data={TORONTOHOMES} type="resale" />
      </PropertyDisplaySection>
      <PropertyDisplaySection
        title="Explore homes in Brampton"
        subtitle=""
        exploreAllLink={generateURL({ cityVal: "Brampton" })}
      >
        <Slider data={BRAMPTONHOMES} type="resale" />
      </PropertyDisplaySection>
      <PropertyDisplaySection
        title="Explore homes in Mississauga"
        subtitle=""
        exploreAllLink={generateURL({ cityVal: "Mississauga" })}
      >
        <Slider data={MISSISAUGAHOMES} type="resale" />
      </PropertyDisplaySection>
      <PropertyDisplaySection
        title="Explore homes in Oakville"
        subtitle=""
        exploreAllLink={generateURL({ cityVal: "Oakville" })}
      >
        <Slider data={OAKVILLEHOMES} type="resale" />
      </PropertyDisplaySection>

      <div className="flex flex-col items-center mt-40 sm:mt-40"></div>
      {/* pass props type="commercial" only for commercial card slider, default is residential */}
    </>
  );
}
