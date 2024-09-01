import Slider from "@/components/Slider";
import { getFilteredRetsData, getSalesData } from "../api/getSalesData";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import { generateURL } from "@/helpers/generateURL";
import { fetchAllBlogPosts } from "@/api/blogs";
import HeroSection from "@/components/HeroSection";
import CanadianCitiesShowcase from "@/components/CanadianCitiesShowcase";
import ContactForm from "@/components/ContactForm";
import PropertiesDisplayer from "@/components/PropertiesDisplayer";

export const metadata = {
  title: "Lowrise.ca | Resale Properties in Ontario",
  description:
    "Lowrise or Lowrise.ca is Canada's Top Destination for Lowrise homes such as Townhomes, Detached & Semi Detached homes. The home listings are updated every minutes. Check out 100s of properties listed in Canada.",
  keywords: "resale, properties, Ontario, Canada, low-rise, homes",
};

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
  const fetchFireplacesData = async () => {
    const response = await fetch(
      "https://rets.dolphy.ca/residential/Properties/?$range=minFireplacesTotal=1"
    );
    const data = await response.json();
    return data.results;
  };
  const HOUSEWITHFIREPLACES = await fetchFireplacesData();
  console.log(HOUSEWITHFIREPLACES);
  // const BLOGPOSTS = await fetchSomeBlogPosts({ pageSize: 4 });
  const BLOGPOSTS = await fetchAllBlogPosts();
  {
    /* pass property propertyType:"commercial" only for commercial card slider, default is residential */
  }

  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-[90%]">
        <PropertyDisplaySection
          title="Explore homes in Toronto"
          subtitle=""
          exploreAllLink={generateURL({ cityVal: "Toronto" })}
        >
          <Slider data={TORONTOHOMES} type="resale" />
        </PropertyDisplaySection>
        <CanadianCitiesShowcase />
        <PropertiesDisplayer data={HOUSEWITHFIREPLACES} />
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
        <PropertyDisplaySection
          title="The Lowrise Insights"
          subtitle=""
          exploreAllLink="/blogs"
        >
          <Slider data={BLOGPOSTS.slice(0, 4)} type="blog" />
        </PropertyDisplaySection>
        <div className="flex flex-col items-center mt-40 sm:mt-40"></div>
        <ContactForm />
      </section>
      {/* pass props type="commercial" only for commercial card slider, default is residential */}
    </>
  );
}
