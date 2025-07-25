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
  const transactionType =
    filters.transactionType === "For Lease" ? "for rent" : "for sale";

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `Condos by ${filters.condoCorp} in ${location}`;
  }

  // Handle open house case
  if (filters.isOpenHouse) {
    return `Open Houses ${transactionType} in ${location}`;
  }

  // Handle price dropped case
  if (filters.mlsStatus === "Price Change") {
    return `Price Dropped Homes ${transactionType} in ${location}`;
  }

  // Handle multiple filters
  let titleParts = [];

  // Add bed filter if present (first priority)
  if (filters.minBeds) {
    titleParts.push(`${filters.minBeds} Bedroom`);
  }

  // Add price range if present (second priority)
  if (filters.transactionType === "For Lease") {
    // Rental price ranges
    if (filters.maxPrice == "1500") {
      titleParts.push("Budget");
    } else if (filters.maxPrice == "2000") {
      titleParts.push("Affordable");
    } else if (filters.maxPrice == "3000") {
      titleParts.push("Mid-Range");
    } else if (filters.maxPrice == "4000") {
      titleParts.push("Premium");
    } else if (filters.minPrice == "4000") {
      titleParts.push("Luxury");
    }
  } else {
    // Sale price ranges
    if (filters.maxPrice == "500000") {
      titleParts.push("Cheapest");
    } else if (filters.maxPrice == "750000") {
      titleParts.push("Affordable");
    } else if (filters.maxPrice == "1000000") {
      titleParts.push("Mid-Range");
    } else if (filters.minPrice == "1500000") {
      titleParts.push("Expensive");
    }
  }

  // Add property type if present (last priority)
  if (filters.propertyType) {
    const propertyType =
      filters.propertyType === "Condo Townhome"
        ? "Townhomes"
        : filters.propertyType;
    // Capitalize the first letter of the property type
    const capitalizedPropertyType =
      propertyType.charAt(0).toUpperCase() +
      propertyType.slice(1).toLowerCase();
    titleParts.push(capitalizedPropertyType);
  }

  // If we have multiple filters, combine them
  if (titleParts.length > 0) {
    return `${titleParts.join(" ")} Homes ${transactionType} in ${location}`;
  }

  // Default case
  return `Homes ${transactionType} in ${location}`;
}

function generateSubtitle(filters, total) {
  const location = filters.city ? `${filters.city}` : "Ontario";
  const totalFormatted = total.toLocaleString();
  const transactionType =
    filters.transactionType === "For Lease" ? "for rent" : "for sale";

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `Lowrise has ${totalFormatted} condos ${transactionType} in ${filters.condoCorpNumber} located in ${location}. Instantly search and view photos of all homes ${transactionType} in ${location} updated every 10 to 15 minutes.`;
  }

  // Handle open house case
  if (filters.isOpenHouse) {
    return `Lowrise has open houses available in ${location}. Instantly search and view photos of all homes ${transactionType} in ${location} updated every 10 to 15 minutes.`;
  }

  // Handle price dropped case
  if (filters.mlsStatus === "Price Change") {
    return `Lowrise has ${totalFormatted} price-reduced homes ${transactionType} in ${location}. Instantly search and view photos of all homes ${transactionType} in ${location} updated every 10 to 15 minutes.`;
  }

  // Handle multiple filters
  let subtitleParts = [];

  // Add bed filter if present (first priority)
  if (filters.minBeds) {
    subtitleParts.push(`${filters.minBeds} bedroom`);
  }

  // Add price range if present (second priority)
  if (filters.transactionType === "For Lease") {
    // Rental price ranges
    if (filters.maxPrice == "1500") {
      subtitleParts.push("budget");
    } else if (filters.maxPrice == "2000") {
      subtitleParts.push("affordable");
    } else if (filters.maxPrice == "3000") {
      subtitleParts.push("mid-range");
    } else if (filters.maxPrice == "4000") {
      subtitleParts.push("premium");
    } else if (filters.minPrice == "4000") {
      subtitleParts.push("luxury");
    }
  } else {
    // Sale price ranges
    if (filters.maxPrice == "500000") {
      subtitleParts.push("cheapest");
    } else if (filters.maxPrice == "750000") {
      subtitleParts.push("affordable");
    } else if (filters.maxPrice == "1000000") {
      subtitleParts.push("mid-range");
    } else if (filters.minPrice == "1500000") {
      subtitleParts.push("expensive");
    }
  }

  // Add property type if present (last priority)
  if (filters.propertyType) {
    const propertyType =
      filters.propertyType === "Condo Townhome"
        ? "Townhomes"
        : filters.propertyType;
    // Capitalize the first letter of the property type
    const capitalizedPropertyType =
      propertyType.charAt(0).toUpperCase() +
      propertyType.slice(1).toLowerCase();
    subtitleParts.push(capitalizedPropertyType);
  }

  // If we have multiple filters, combine them
  if (subtitleParts.length > 0) {
    const filterDescription = subtitleParts.join(" ");
    return `Lowrise has ${totalFormatted} ${filterDescription} homes ${transactionType} in ${location}. Instantly search and view photos of all ${filterDescription} homes ${transactionType} in Ontario updated every 10 to 15 minutes.`;
  }

  // Default case
  return `Lowrise has ${totalFormatted} homes ${transactionType} in ${location}. Instantly search and view photos of all homes ${transactionType} in Ontario updated every 10 to 15 minutes.`;
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

  const title = generateTitle(filters);
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
          <PropertyLinksGrid
            currentCity={filters.city || "Ontario"}
            transactionType={filters.transactionType || "For Sale"}
          />
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

  const location = filters.city ? `${filters.city}` : "Ontario";
  const currentPage = searchParams.page || 1;
  const canonicalPath =
    currentPage > 1
      ? `/ontario/${params.slug1.join("/")}?page=${currentPage}`
      : `/ontario/${params.slug1.join("/")}`;

  const transactionType =
    filters.transactionType === "For Lease" ? "for rent" : "for sale";

  // Handle condo corporation metadata
  if (filters.condoCorpNumber) {
    const title = `Condos by ${filters.condoCorp} in ${location} | Lowrise`;
    const description = `Lowrise has ${total.toLocaleString()} condos ${transactionType} in ${
      filters.condoCorpNumber
    } located in ${location}. Instantly search and view photos of all homes ${transactionType} in ${location} updated every 10 to 15 minutes.`;

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
    const title = `Open Houses ${transactionType} in ${location} | Lowrise`;
    const description = `Lowrise has open houses available in ${location}. Instantly search and view photos of all homes ${transactionType} in ${location} updated every 10 to 15 minutes.`;

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
    const title = `Price Dropped Homes ${transactionType} in ${location} | Lowrise`;
    const description = `Lowrise has ${actualTotal.toLocaleString()} price-reduced homes ${transactionType} in ${location}. Instantly search and view photos of all homes ${transactionType} in ${location} updated every 10 to 15 minutes.`;

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

  // Handle multiple filters for metadata
  let titleParts = [];
  let subtitleParts = [];

  // Add bed filter if present (first priority)
  if (filters.minBeds) {
    titleParts.push(`${filters.minBeds} Bedroom`);
    subtitleParts.push(`${filters.minBeds} bedroom`);
  }

  // Add price range if present (second priority)
  if (filters.transactionType === "For Lease") {
    // Rental price ranges
    if (filters.maxPrice == "1500") {
      titleParts.push("Budget");
      subtitleParts.push("budget");
    } else if (filters.maxPrice == "2000") {
      titleParts.push("Affordable");
      subtitleParts.push("affordable");
    } else if (filters.maxPrice == "3000") {
      titleParts.push("Mid-Range");
      subtitleParts.push("mid-range");
    } else if (filters.maxPrice == "4000") {
      titleParts.push("Premium");
      subtitleParts.push("premium");
    } else if (filters.minPrice == "4000") {
      titleParts.push("Luxury");
      subtitleParts.push("luxury");
    }
  } else {
    // Sale price ranges
    if (filters.maxPrice == "500000") {
      titleParts.push("Cheapest");
      subtitleParts.push("cheapest");
    } else if (filters.maxPrice == "750000") {
      titleParts.push("Affordable");
      subtitleParts.push("affordable");
    } else if (filters.maxPrice == "1000000") {
      titleParts.push("Mid-Range");
      subtitleParts.push("mid-range");
    } else if (filters.minPrice == "1500000") {
      titleParts.push("Expensive");
      subtitleParts.push("expensive");
    }
  }

  // Add property type if present (last priority)
  if (filters.propertyType) {
    const propertyType =
      filters.propertyType === "Condo Townhome"
        ? "Townhomes"
        : filters.propertyType;
    // Capitalize the first letter of the property type
    const capitalizedPropertyType =
      propertyType.charAt(0).toUpperCase() +
      propertyType.slice(1).toLowerCase();
    titleParts.push(capitalizedPropertyType);
    subtitleParts.push(capitalizedPropertyType);
  }

  // If we have multiple filters, combine them
  if (titleParts.length > 0) {
    const titleText = `${titleParts.join(
      " "
    )} Homes ${transactionType} in ${location} | Lowrise`;
    const filterDescription = subtitleParts.join(" ");
    const description = `Lowrise has ${total.toLocaleString()} ${filterDescription} homes ${transactionType} in ${location}. Instantly search and view photos of all ${filterDescription} homes ${transactionType} in Ontario updated every 10 to 15 minutes.`;

    return {
      title: titleText,
      description,
      alternates: {
        canonical: `https://lowrise.ca${canonicalPath}`,
      },
      openGraph: {
        title: titleText,
        description,
        url: `https://lowrise.ca${canonicalPath}`,
        siteName: "Lowrise",
        type: "website",
        images: [
          {
            url: "https://lowrise.ca/ajax.jpg",
            width: 1200,
            height: 630,
            alt: `${titleParts.join(" ")} Homes in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: titleText,
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
  const title = `Homes ${transactionType} in ${location} | Lowrise`;
  const description = `Lowrise has ${total.toLocaleString()} homes ${transactionType} in ${location}. Instantly search and view photos of all homes ${transactionType} in Ontario updated every 10 to 15 minutes.`;

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
