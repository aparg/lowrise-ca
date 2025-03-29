"use client";

import * as React from "react";
import { cn, slugify } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import citiesWithProvinces from "@/constant/cities";
import { searchProperties } from "@/app/_resale-api/getSalesData";

const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const LocationIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const UnifiedSearchBar = ({
  width = "w-full md:w-[350px]",
  height = "h-11",
  className,
  placeholder,
}) => {
  const [showResults, setShowResults] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState({
    cities: [],
    properties: [],
  });
  const searchRef = React.useRef(null);
  const debouncedSearch = useDebounce(searchQuery, 150);

  // Get initial popular cities
  const getInitialCities = () => {
    return citiesWithProvinces
      .filter(
        (city) =>
          city.province === "Ontario" &&
          [
            "Toronto",
            "Mississauga",
            "Brampton",
            "Hamilton",
            "Ottawa",
            "London",
            "Windsor",
          ].includes(city.city)
      )
      .slice(0, 5);
  };

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search effect
  React.useEffect(() => {
    const fetchResults = async () => {
      if (!showResults) return;

      setLoading(true);
      try {
        // If no search query, show initial cities
        if (!debouncedSearch) {
          setResults({
            cities: getInitialCities(),
            properties: [],
          });
          setLoading(false);
          return;
        }

        // Search cities first (only Ontario)
        const matchedCities = citiesWithProvinces
          .filter(
            (city) =>
              city.province === "Ontario" &&
              (city.city
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()) ||
                city.province
                  .toLowerCase()
                  .includes(debouncedSearch.toLowerCase()))
          )
          .slice(0, 5);

        // Only search properties if no cities match
        let properties = [];
        if (matchedCities.length === 0) {
          properties = await searchProperties(debouncedSearch);
          properties = properties
            .filter((property) => property.UnparsedAddress)
            .slice(0, 3);
        }

        setResults({
          cities: matchedCities,
          properties: properties,
        });
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch, showResults]);

  const generateCityUrl = (city) => {
    return `/${city.province.toLowerCase()}/${slugify(
      city.city
    )}/homes-for-sale`;
  };

  const generatePropertyUrl = (property) => {
    const citySlug = slugify(property.City || "");
    const address = property.UnparsedAddress?.split(",")[0] || "";
    return `/ontario/${citySlug}/listings/${slugify(address)}-${
      property.ListingKey
    }`;
  };

  return (
    <div className={cn("relative", width, className)} ref={searchRef}>
      {/* Search Input Group */}
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className={cn(
            "w-full pl-9 pr-20",
            height,
            "bg-white hover:bg-white focus:bg-white",
            "rounded-lg border border-gray-300",
            "focus:outline-none focus:ring-0 focus:ring-gray-400 focus:border-gray-400",
            "text-sm placeholder:text-gray-400",
            "shadow-sm"
          )}
          placeholder={placeholder || "Search by city or postal code..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setShowResults(true);
            // Show initial cities when focused
            setResults({
              cities: getInitialCities(),
              properties: [],
            });
          }}
        />
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 w-full bg-white rounded-lg shadow-lg border border-gray-200 mt-1 overflow-hidden">
          <div className="p-1">
            {loading ? (
              <div className="text-xs text-gray-500 p-2">Searching...</div>
            ) : (
              <>
                {/* Cities Section */}
                {results.cities.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-xs font-medium text-gray-500">
                      {searchQuery ? "Cities" : "Popular Cities"}
                    </div>
                    {results.cities.map((city, index) => (
                      <Link
                        key={`city-${index}`}
                        href={generateCityUrl(city)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md group transition-colors"
                      >
                        <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                          <LocationIcon className="h-3 w-3 text-gray-500" />
                        </div>
                        <span className="text-xs text-gray-700 group-hover:text-gray-900">
                          {city.city}, {city.province}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Properties Section */}
                {results.properties.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-xs font-medium text-gray-500">
                      Properties
                    </div>
                    {results.properties.map((property, index) => (
                      <Link
                        key={`property-${index}`}
                        href={generatePropertyUrl(property)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md group transition-colors"
                      >
                        <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                          <HomeIcon className="h-3 w-3 text-gray-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-700 group-hover:text-gray-900">
                            {property.UnparsedAddress}
                          </span>
                          {property.ListPrice && (
                            <span className="text-xs text-gray-500">
                              ${property.ListPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!loading &&
                  results.cities.length === 0 &&
                  results.properties.length === 0 && (
                    <div className="text-xs text-gray-500 p-2">
                      No results found
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedSearchBar;
