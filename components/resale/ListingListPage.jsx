import FilterBar from "@/components/resale/FilterBar";
import PropertyList from "@/components/resale/PropertyList";
import PropertyLinksGrid from "@/components/resale/PropertyLinksGrid";
import citiesWithProvinces from "@/constant/cities";
import Link from "next/link";
import { getProperties } from "@/lib/properties";
import FilterStateManager from "./FilterStateManager";
import { parseSlug } from "@/helpers/parseResaleFilter";

const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function generateTitle(filters) {
  const location = filters.city ? `${filters.city}` : "Ontario";

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `Condos by ${filters.condoCorp} in ${location}`;
  }

  // Handle open house case
  if (filters.isOpenHouse) {
    return `Open Houses for sale in ${location}`;
  }

  // Handle price dropped case
  if (filters.mlsStatus === "Price Change") {
    return `Price Dropped Homes for sale in ${location}`;
  }

  if (filters.minBeds) {
    return `Homes with ${filters.minBeds} Bedroom For Sale in ${location}`;
  }

  // Handle property type specific cases
  if (filters.propertyType) {
    const propertyType =
      filters.propertyType === "Condo Townhome"
        ? "Townhomes"
        : filters.propertyType;
    return `${propertyType} for sale in ${location}`;
  }

  // Default case
  return `Homes For Sale in ${location}`;
}

function generateSubtitle(filters, total) {
  const location = filters.city ? `${filters.city} ON` : "Ontario";

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `Lowrise has ${total} condos for sale in ${filters.condoCorpNumber} located in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;
  }

  // Handle open house case
  if (filters.isOpenHouse) {
    return `Lowrise has open houses available in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;
  }

  // Handle price dropped case
  if (filters.mlsStatus === "Price Change") {
    return `Lowrise has ${total.toLocaleString()} price-reduced homes for sale in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;
  }

  // Handle property type specific cases
  if (filters.propertyType) {
    const propertyType =
      filters.propertyType === "Condo Townhome"
        ? "Townhomes"
        : filters.propertyType;
    return `Lowrise has ${total.toLocaleString()} ${propertyType.toLowerCase()} for sale in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;
  }

  // Default case
  return `Lowrise has ${total.toLocaleString()} homes for sale in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;
}

export default async function ListingListPage({ slug, searchParams }) {
  const filters = parseSlug(slug);

  if (!filters) {
    notFound();
  }

  const {
    properties: allProperties,
    total,
    currentPage,
  } = await getProperties({
    ...filters,
    ...searchParams,
  });

  // If this is a price drop page, filter out properties without a price drop
  const filteredProperties =
    filters.mlsStatus === "Price Change"
      ? allProperties.filter(
          (property) =>
            property.PreviousListPrice &&
            property.ListPrice < property.PreviousListPrice
        )
      : allProperties;

  const actualTotal =
    filters.mlsStatus === "Price Change" ? filteredProperties.length : total;

  const title = generateTitle(filters, actualTotal);
  const subtitle = generateSubtitle(filters, total);

  return (
    <>
      <FilterStateManager filters={filters} />
      <div className="max-w-9xl mx-auto px-2 md:px-3 mt-0 md:mt-2">
        <div className="block md:flex md:justify-between md:items-start md:gap-0">
          <div className="px-1 mt-0 flex-1">
            <h1 className="font-bold text-xl md:text-3xl text-left sm:text-left pt-2 sm:pt-0 text-gray-800">
              {title}
            </h1>
            <h2 className="text-xs mt-1 mb-2 md:mb-1 text-left sm:text-left text-gray-600">
              {subtitle}
            </h2>
          </div>
        </div>
        <div className="sticky top-0 bg-white py-2 md:py-1 flex justify-between items-center mb-2 z-20 ps-0">
          <FilterBar currentFilters={filters} />
          <div className="bg-[#f2f4f5] p-1 rounded-full hidden md:flex">
            <button className="px-3 text-sm py-1 rounded-full bg-white shadow-sm">
              List
            </button>
            <button className="px-3 text-sm py-1 rounded-full">Map</button>
          </div>
        </div>

        <PropertyList
          properties={filteredProperties}
          total={actualTotal}
          priceReduced={filters.mlsStatus === "Price Change"}
          currentPage={currentPage}
          openHouse={filters.isOpenHouse}
          totalPages={Math.ceil(actualTotal / 30)}
        />
        {filters.mlsStatus === "Price Change" && (
          <div className="w-full bg-white mt-20 col-span-full">
            <div className="text-left mb-8">
              <h2 className="text-xl sm:text-3xl font-bold w-[100%] sm:w-auto">
                Buy Price Dropped Homes in Ontario
              </h2>
              <p className="text-black">
                Buy homes that have seen a price reduction in the last 24 hours
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-0 gap-x-2 gap-y-2 md:gap-x-2">
              {citiesWithProvinces.map((city) => (
                <div key={city.city}>
                  <h4 className="text-xs font-normal text-gray-800 hover:underline underline-offset-2">
                    <Link href={`/ontario/${slugify(city.city)}/price-dropped`}>
                      Price Dropped Homes in {city.city}
                    </Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full bg-white mt-20 col-span-full">
          <PropertyLinksGrid currentCity={filters.city || "Ontario"} />
        </div>
      </div>
    </>
  );
}

ListingListPage.generateMetadata = async function ({ params, searchParams }) {
  const slug = params.slug1;
  const filters = parseSlug(slug);
  const { properties, total } = await getProperties({
    ...filters,
    ...searchParams,
  });

  const location = filters.city ? `${filters.city} ON` : "Ontario";
  const currentPage = searchParams.page || 1;
  const canonicalPath =
    currentPage > 1
      ? `/ontario/${params.slug1.join("/")}?page=${currentPage}`
      : `/ontario/${params.slug1.join("/")}`;

  // Handle condo corporation metadata
  if (filters.condoCorpNumber) {
    const title = `Condos For Sale by ${filters.condoCorpNumber} in ${location} | Lowrise`;
    const description = `Lowrise has ${total.toLocaleString()} condos for sale in ${
      filters.condoCorpNumber
    } located in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://lowrise.ca${canonicalPath}`,
      },
      openGraph: {
        title,
        description,
        url: `https://lowrise.ca${canonicalPath}`,
        siteName: "Lowrise",
        type: "website",
        images: [
          {
            url: "https://lowrise.ca/ajax.jpg",
            width: 1200,
            height: 630,
            alt: `${filters.condoCorpNumber} Condos in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://lowrise.ca/ajax.jpg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  const priceReducedProperties =
    filters.mlsStatus === "Price Change"
      ? properties.filter(
          (p) => p.PreviousListPrice && p.ListPrice < p.PreviousListPrice
        )
      : properties;

  const actualTotal =
    filters.mlsStatus === "Price Change"
      ? priceReducedProperties.length
      : total;

  // Handle open house metadata
  if (filters.isOpenHouse) {
    const title = `Open Houses for sale in ${location} | Lowrise`;
    const description = `Lowrise has open houses available in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://lowrise.ca${canonicalPath}`,
      },
      openGraph: {
        title,
        description,
        url: `https://lowrise.ca${canonicalPath}`,
        siteName: "Lowrise",
        type: "website",
        images: [
          {
            url: "https://lowrise.ca/ajax.jpg",
            width: 1200,
            height: 630,
            alt: `Open Houses in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://lowrise.ca/ajax.jpg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  // Handle price dropped metadata
  if (filters.mlsStatus === "Price Change") {
    const title = `Price Dropped Homes for sale in ${location} | Lowrise`;
    const description = `Lowrise has ${actualTotal} price-reduced homes for sale in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://lowrise.ca${canonicalPath}`,
      },
      openGraph: {
        title,
        description,
        url: `https://lowrise.ca${canonicalPath}`,
        siteName: "Lowrise",
        type: "website",
        images: [
          {
            url: "https://lowrise.ca/ajax.jpg",
            width: 1200,
            height: 630,
            alt: `Price Dropped Homes in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://lowrise.ca/ajax.jpg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  // Handle property type specific metadata
  if (filters.propertyType) {
    const propertyType =
      filters.propertyType === "Condo Townhome"
        ? "Townhomes"
        : filters.propertyType;
    const title = `${propertyType} For Sale in ${location} | Lowrise`;
    const description = `Lowrise has ${total} ${propertyType.toLowerCase()} for sale in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://lowrise.ca${canonicalPath}`,
      },
      openGraph: {
        title,
        description,
        url: `https://lowrise.ca${canonicalPath}`,
        siteName: "Lowrise",
        type: "website",
        images: [
          {
            url: "https://lowrise.ca/city-images/milton.jpeg",
            width: 1200,
            height: 630,
            alt: `${propertyType} in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://lowrise.ca/ajax.jpg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  // Default case
  const title = `Homes For Sale in ${location} | Lowrise`;
  const description = `Lowrise has ${total} homes for sale in ${location}. Instantly search and view photos of all homes for sale in ${location} updated every 10 to 15 minutes.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://lowrise.ca${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `https://lowrise.ca${canonicalPath}`,
      siteName: "Lowrise",
      type: "website",
      images: [
        {
          url: "https://lowrise.ca/ajax.jpg",
          width: 1200,
          height: 630,
          alt: `Real Estate Listings in ${location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://lowrise.ca/ajax.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "og:locale": "en_CA",
      "og:type": "website",
    },
  };
};
