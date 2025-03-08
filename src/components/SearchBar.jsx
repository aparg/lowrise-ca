"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react"; // Using Lucide icons for better consistency
import { searchProperties } from "@/_resale-api/getSalesData";
import debounce from "lodash.debounce";
import Autosuggest from "./Autosuggest";
import useDeviceView from "@/helpers/useDeviceView";
import citiesWithProvinces from "@/constant/cities";
import { usePathname } from "next/navigation";

const ResaleSearchBar = ({
  numberOfSuggestions = 10,
  small = false,
  placeholder = "Toronto",
}) => {
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isMobileView } = useDeviceView();

  const getSuggestions = async (searchTerm) => {
    if (!searchTerm?.trim()) {
      setSuggestions([]);
      return;
    }

    const inputValueLowerCase = searchTerm.trim().toLowerCase();
    const filteredCities = citiesWithProvinces.filter((data) =>
      data.city.toLowerCase().includes(inputValueLowerCase)
    );

    const filteredProperties = await searchProperties(searchTerm);
    setSuggestions([...filteredCities, ...filteredProperties]);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value) => {
        setLoading(true);
        await getSuggestions(value);
        setLoading(false);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setDisplaySuggestions(true);
    debouncedSearch(value);
  };

  const handleInputFocus = () => {
    setDisplaySuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDisplaySuggestions(false), 200);
  };

  const pathname = usePathname();
  const cities = citiesWithProvinces.map((obj) => obj.city.toLowerCase());
  const cityName = cities.find((city) => !!pathname?.match(city));

  return (
    <div className="w-full max-w-2xl mx-auto px-0 sm:px-4">
      <div
        className={`
          relative flex items-center w-full
          bg-gray-100 
          ${displaySuggestions ? "border-blue-500" : "border-gray-200"}
          rounded-full transition-all duration-200
          ${small ? "h-10" : "h-12 sm:h-14"}
        `}
      >
        <div className="flex items-center justify-center pl-4">
          <Search
            size={small ? 18 : 20}
            className={`
              ${loading ? "animate-bounce" : "text-gray-400"}
              transition-colors duration-200
            `}
          />
        </div>

        <input
          className={`
            w-full h-full px-3
            text-gray-800 bg-transparent
            focus:outline-none
            placeholder:text-black
            text-left
            ${small ? "text-sm" : "text-base"}
          `}
          placeholder={cityName || "Toronto"}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={searchTerm}
          aria-label="Search properties"
        />
      </div>

      {displaySuggestions && (
        <div className="relative mt-1">
          <Autosuggest
            displaySuggestions={displaySuggestions}
            searchTerm={searchTerm}
            suggestions={suggestions}
            numberOfSuggestions={numberOfSuggestions}
            setSearchTerm={setSearchTerm}
            loadingSuggestions={loading}
          />
        </div>
      )}
    </div>
  );
};

export default ResaleSearchBar;
