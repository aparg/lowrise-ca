"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CgPin, CgSearch, CgTrack } from "react-icons/cg";
import { searchProperties } from "../api/searchProperties";
import Link from "next/link";
import { generateURL } from "@/helpers/generateURL";
import debounce from "lodash.debounce";

const SearchBar = ({
  numberOfSuggestions = 10,
  height = 50,
  placeholder = "Search by address, city, neighbourhood or postal code",
}) => {
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debouncing
  const handleChange = async (value) => {
    await getSuggestions(value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(async (value) => await handleChange(value), 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  const getSuggestions = async (searchTerm) => {
    const inputValueLowerCase = searchTerm?.trim()?.toLowerCase();
    const filteredCities = citiesWithProvinces.filter((data) =>
      data.city.toLowerCase().includes(inputValueLowerCase)
    );
    // return filteredCities;
    const filteredProperties = await searchProperties(searchTerm);
    // const addressArray = filteredProperties.map((property, idx) => {
    //   return property.Address;
    // });
    console.log("FIltered properties");
    setSuggestions([...filteredCities, ...filteredProperties]);
  };
  const citiesWithProvinces = [
    { city: "Barrie", province: "Ontario" },
    { city: "Belleville", province: "Ontario" },
    { city: "Brampton", province: "Ontario" },
    { city: "Brant", province: "Ontario" },
    { city: "Brantford", province: "Ontario" },
    { city: "Brockville", province: "Ontario" },
    { city: "Burlington", province: "Ontario" },
    { city: "Cambridge", province: "Ontario" },
    { city: "Clarence-Rockland", province: "Ontario" },
    { city: "Cornwall", province: "Ontario" },
    { city: "Dryden", province: "Ontario" },
    { city: "Elliot Lake", province: "Ontario" },
    { city: "Greater Sudbury", province: "Ontario" },
    { city: "Guelph", province: "Ontario" },
    { city: "Haldimand County", province: "Ontario" },
    { city: "Hamilton", province: "Ontario" },
    { city: "Kawartha Lakes", province: "Ontario" },
    { city: "Kenora", province: "Ontario" },
    { city: "Kingston", province: "Ontario" },
    { city: "Kitchener", province: "Ontario" },
    { city: "London", province: "Ontario" },
    { city: "Markham", province: "Ontario" },
    { city: "Mississauga", province: "Ontario" },
    { city: "Niagara Falls", province: "Ontario" },
    { city: "Norfolk County", province: "Ontario" },
    { city: "North Bay", province: "Ontario" },
    { city: "Orillia", province: "Ontario" },
    { city: "Oshawa", province: "Ontario" },
    { city: "Ottawa", province: "Ontario" },
    { city: "Owen Sound", province: "Ontario" },
    { city: "Pembroke", province: "Ontario" },
    { city: "Peterborough", province: "Ontario" },
    { city: "Pickering", province: "Ontario" },
    { city: "Port Colborne", province: "Ontario" },
    { city: "Prince Edward County", province: "Ontario" },
    { city: "Quinte West", province: "Ontario" },
    { city: "Richmond Hill", province: "Ontario" },
    { city: "Sarnia", province: "Ontario" },
    { city: "Sault Ste Marie", province: "Ontario" },
    { city: "St Catharines", province: "Ontario" },
    { city: "St Thomas", province: "Ontario" },
    { city: "Stratford", province: "Ontario" },
    { city: "Temiskaming Shores", province: "Ontario" },
    { city: "Thorold", province: "Ontario" },
    { city: "Thunder Bay", province: "Ontario" },
    { city: "Timmins", province: "Ontario" },
    { city: "Toronto", province: "Ontario" },
    { city: "Vaughan", province: "Ontario" },
    { city: "Waterloo", province: "Ontario" },
    { city: "Welland", province: "Ontario" },
    { city: "Windsor", province: "Ontario" },
    { city: "Woodstock", province: "Ontario" },
    { city: "Ajax", province: "Ontario" },
    { city: "Whitby", province: "Ontario" },
    { city: "Courtice", province: "Ontario" },
    { city: "Bowmanville", province: "Ontario" },
    { city: "Innisfil", province: "Ontario" },
    { city: "Bradford", province: "Ontario" },
  ];

  return (
    <div className={`flex flex-col relative h-[${height}px]`}>
      <div
        className={`w-full h-full flex overflow-hidden border-[1px] border-[#dfe1e5] ${
          displaySuggestions ? "rounded-t-[28px]" : "rounded-[28px]"
        }`}
      >
        <input
          className={`w-full py-3 px-2 focus:outline-none text-center placeholder:text-[1rem] placeholder:text-center`}
          placeholder={placeholder}
          onChange={(e) => {
            setDisplaySuggestions(true);
            setSearchTerm(e.target.value);
            debouncedResults(e.target.value);
          }}
          onFocus={() => {
            setDisplaySuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => setDisplaySuggestions(false), 500);
          }}
          value={searchTerm}
        />
        <div className="flex items-center pr-4 pl-0 justify-center bg-white">
          <CgSearch size="1.25rem" />
        </div>
      </div>
      <div className="relative">
        {displaySuggestions && (
          <div className="absolute top-0 rounded-b-[28px] border-[1px] border-[#dfe1e5] w-full bg-white p-4">
            {/* <section className="my-1 flex items-center cursor-pointer rounded-lg hover:bg-lime-100 px-2">
              <CgTrack size="1.25rem" />
              <div className="ml-2 py-4">Current Location</div>
            </section> */}

            {/* SUGGESTIONS */}
            {searchTerm && suggestions.length > 0 && (
              <section className="my-1">
                <div className="text-xs text-center text-gray-600 font-bold">
                  SUGGESTIONS
                </div>
                <div>
                  {suggestions
                    .slice(0, numberOfSuggestions)
                    .map((suggestion) => {
                      return (
                        <SearchOption
                          suggestion={suggestion}
                          setSearchTerm={setSearchTerm}
                        />
                      );
                    })}
                </div>
                <span className="text-gray-700"></span>
              </section>
            )}

            {/* RECENT SEARCHES */}
            {window &&
              window.localStorage.getItem("searchValue") &&
              JSON.parse(window.localStorage.getItem("searchValue")).length >
                0 && (
                <section
                  className={`my-1 ${
                    suggestions.length > 0 &&
                    searchTerm &&
                    "border-t-1 mt-2 pt-2"
                  }`}
                >
                  <div className="text-xs text-gray-600 font-bold text-center">
                    RECENT SEARCHES
                  </div>
                  <div>
                    {window &&
                      JSON.parse(
                        window.localStorage.getItem("searchValue")
                      )?.map((suggestion) => (
                        <SearchOption
                          suggestion={JSON.parse(suggestion)}
                          key={suggestion?.MLS || suggestion?.city}
                        />
                      ))}
                  </div>
                </section>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchOption = ({ suggestion, setSearchTerm }) => {
  const addToLocalStorage = () => {
    if (window) {
      let searchesArray =
        JSON.parse(window.localStorage.getItem("searchValue")) || [];
      if (suggestion?.MLS) {
        const searchObj = JSON.stringify({
          Address: suggestion?.Address,
          Municipality: suggestion?.Municipality,
          MLS: suggestion?.MLS,
        });
        searchesArray.unshift(searchObj);
        if (searchesArray.length > 3) searchesArray = searchesArray.slice(0, 3);
        window.localStorage.setItem(
          "searchValue",
          JSON.stringify(searchesArray)
        );
      } else {
        const searchObj = JSON.stringify({
          province: suggestion?.province,
          city: suggestion?.city,
        });
        searchesArray.unshift(searchObj);
        if (searchesArray.length > 3) searchesArray = searchesArray.slice(0, 3);
        window.localStorage.setItem(
          "searchValue",
          JSON.stringify(searchesArray)
        );
      }
    }
  };
  return (
    <Link
      href={
        suggestion?.MLS
          ? generateURL({
              listingIDVal: suggestion.MLS,
              cityVal: suggestion?.Municipality,
            }) //for a listing
          : `/${suggestion.province.toLowerCase()}/${suggestion.city.toLowerCase()}`
      }
      onClick={() => {
        setSearchTerm("");
        addToLocalStorage();
      }}
      className="w-full py-4 flex justify-center items-center cursor-pointer rounded-lg hover:bg-lime-100 px-2"
      // key={suggestion?.MLS || suggestion?.city}
    >
      <div className="flex justify-between me-3">
        <div className="flex justify-center items-center">
          <div>
            <CgPin className="1.25rem"></CgPin>
          </div>

          <span className="ml-2 text-center">
            {suggestion?.Address || suggestion.city}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchBar;
