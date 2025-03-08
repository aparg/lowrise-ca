import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import React from "react";
import { MapPin } from "lucide-react"; // Using Lucide icons for consistency

const Autosuggest = ({
  displaySuggestions,
  searchTerm,
  suggestions,
  loadingSuggestions,
  numberOfSuggestions,
  setSearchTerm,
}) => {
  const recentSearchArray =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("searchValue")) || []
      : [];

  return (
    <div
      className={`
        absolute z-[999] w-full bg-white
        rounded-xl shadow-lg border border-gray-100
        overflow-hidden transition-all duration-200
        ${
          displaySuggestions
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }
      `}
    >
      {/* Suggestions Section */}
      <div className="p-4">
        <div className="text-xs font-semibold text-gray-500 mb-2">
          SUGGESTIONS
        </div>

        {loadingSuggestions ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : searchTerm && suggestions.length > 0 ? (
          <div className="space-y-1">
            {suggestions.slice(0, numberOfSuggestions).map((suggestion) => (
              <SearchOption
                key={suggestion?.ListingKey || suggestion?.city}
                suggestion={suggestion}
                setSearchTerm={setSearchTerm}
              />
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400 py-4">
            No search results found.
          </div>
        )}
      </div>

      {/* Recent Searches Section */}
      {recentSearchArray.length > 0 && (
        <div
          className={`p-4 bg-gray-50 ${
            searchTerm && suggestions.length > 0
              ? "border-t border-gray-100"
              : ""
          }`}
        >
          <div className="text-xs font-semibold text-gray-500 mb-2">
            RECENT SEARCHES
          </div>
          <div className="space-y-1">
            {[...new Set(recentSearchArray)].map((suggestion) => (
              <SearchOption
                key={
                  JSON.parse(suggestion)?.ListingKey ||
                  JSON.parse(suggestion)?.city
                }
                suggestion={JSON.parse(suggestion)}
                setSearchTerm={setSearchTerm}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchOption = ({ suggestion, setSearchTerm }) => {
  const addToLocalStorage = () => {
    if (typeof window === "undefined") return;

    const searchesArray = JSON.parse(localStorage.getItem("searchValue")) || [];
    const searchObj = suggestion?.ListingKey
      ? {
          UnparsedAddress: suggestion?.UnparsedAddress,
          CountyOrParish: suggestion?.City,
          ListingKey: suggestion?.ListingKey,
        }
      : {
          province: suggestion?.province,
          city: suggestion?.city,
        };

    searchesArray.unshift(JSON.stringify(searchObj));
    if (searchesArray.length > 3) searchesArray.length = 3;
    localStorage.setItem("searchValue", JSON.stringify(searchesArray));
  };

  const href = suggestion?.ListingKey
    ? generateURL({
        listingIDVal: suggestion.ListingKey,
        cityVal: suggestion?.City,
      })
    : generateURL({ cityVal: suggestion?.city });

  return (
    <Link
      href={href}
      onClick={() => {
        setSearchTerm("");
        addToLocalStorage();
      }}
      className={`
        group flex items-center w-full p-3
        rounded-md transition-colors duration-200
        hover:bg-gray-100 focus:bg-gray-100
        focus:outline-none
      `}
    >
      <MapPin size={16} className="text-gray-400" />
      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">
        {suggestion?.UnparsedAddress || suggestion.city}
      </span>
    </Link>
  );
};

export default Autosuggest;
