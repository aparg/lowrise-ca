import Slider from "@/components/Slider";
import { getSalesData } from "../api/getSalesData";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import { generateURL } from "@/helpers/generateURL";
import HeroSection from "@/components/HeroSection";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";
import ContactForm from "@/components/ContactForm";

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
      <HeroSection />
      <PropertyDisplaySection
        title="Explore homes in Toronto"
        subtitle=""
        exploreAllLink={generateURL({ cityVal: "Toronto" })}
      >
        <Slider data={TORONTOHOMES} type="resale" />
      </PropertyDisplaySection>
      <CanadianCitiesShowcase />
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
      <ContactForm />
      {/* pass props type="commercial" only for commercial card slider, default is residential */}
    </>
  );
}
