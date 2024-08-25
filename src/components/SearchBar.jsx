// // SearchBar.js
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Autosuggest from "react-autosuggest";
// import { useRouter } from "next/navigation";
// import { searchProperties } from "../api/searchProperties";
// import { generateURL } from "@/helpers/generateURL";

// const SearchBar = ({ bigger }) => {
//   const [value, setValue] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const router = useRouter();

//   const citiesWithProvinces = [
//     { city: "Barrie", province: "Ontario" },
//     { city: "Belleville", province: "Ontario" },
//     { city: "Brampton", province: "Ontario" },
//     { city: "Brant", province: "Ontario" },
//     { city: "Brantford", province: "Ontario" },
//     { city: "Brockville", province: "Ontario" },
//     { city: "Burlington", province: "Ontario" },
//     { city: "Cambridge", province: "Ontario" },
//     { city: "Clarence-Rockland", province: "Ontario" },
//     { city: "Cornwall", province: "Ontario" },
//     { city: "Dryden", province: "Ontario" },
//     { city: "Elliot Lake", province: "Ontario" },
//     { city: "Greater Sudbury", province: "Ontario" },
//     { city: "Guelph", province: "Ontario" },
//     { city: "Haldimand County", province: "Ontario" },
//     { city: "Hamilton", province: "Ontario" },
//     { city: "Kawartha Lakes", province: "Ontario" },
//     { city: "Kenora", province: "Ontario" },
//     { city: "Kingston", province: "Ontario" },
//     { city: "Kitchener", province: "Ontario" },
//     { city: "London", province: "Ontario" },
//     { city: "Markham", province: "Ontario" },
//     { city: "Mississauga", province: "Ontario" },
//     { city: "Niagara Falls", province: "Ontario" },
//     { city: "Norfolk County", province: "Ontario" },
//     { city: "North Bay", province: "Ontario" },
//     { city: "Orillia", province: "Ontario" },
//     { city: "Oshawa", province: "Ontario" },
//     { city: "Ottawa", province: "Ontario" },
//     { city: "Owen Sound", province: "Ontario" },
//     { city: "Pembroke", province: "Ontario" },
//     { city: "Peterborough", province: "Ontario" },
//     { city: "Pickering", province: "Ontario" },
//     { city: "Port Colborne", province: "Ontario" },
//     { city: "Prince Edward County", province: "Ontario" },
//     { city: "Quinte West", province: "Ontario" },
//     { city: "Richmond Hill", province: "Ontario" },
//     { city: "Sarnia", province: "Ontario" },
//     { city: "Sault Ste Marie", province: "Ontario" },
//     { city: "St Catharines", province: "Ontario" },
//     { city: "St Thomas", province: "Ontario" },
//     { city: "Stratford", province: "Ontario" },
//     { city: "Temiskaming Shores", province: "Ontario" },
//     { city: "Thorold", province: "Ontario" },
//     { city: "Thunder Bay", province: "Ontario" },
//     { city: "Timmins", province: "Ontario" },
//     { city: "Toronto", province: "Ontario" },
//     { city: "Vaughan", province: "Ontario" },
//     { city: "Waterloo", province: "Ontario" },
//     { city: "Welland", province: "Ontario" },
//     { city: "Windsor", province: "Ontario" },
//     { city: "Woodstock", province: "Ontario" },
//     { city: "Ajax", province: "Ontario" },
//     { city: "Whitby", province: "Ontario" },
//     { city: "Courtice", province: "Ontario" },
//     { city: "Bowmanville", province: "Ontario" },
//     { city: "Innisfil", province: "Ontario" },
//     { city: "Bradford", province: "Ontario" },
//   ];

//   // Function to get suggestions based on user input
//   const getSuggestions = async (inputValue) => {
//     const inputValueLowerCase = inputValue?.trim()?.toLowerCase();
//     const filteredCities = citiesWithProvinces.filter((data) =>
//       data.city.toLowerCase().includes(inputValueLowerCase)
//     );
//     // return filteredCities;
//     const filteredProperties = await searchProperties(inputValue);
//     // const addressArray = filteredProperties.map((property, idx) => {
//     //   return property.Address;
//     // });
//     return [...filteredProperties, ...filteredCities];
//   };

//   // Triggered when the input value changes
//   const onSuggestionsFetchRequested = async ({ value }) => {
//     if (value?.Address) {
//       value = value.Address;
//     }
//     const suggestions = await getSuggestions(value);
//     setSuggestions(suggestions);
//   };

//   // Triggered when the input value is cleared
//   const onSuggestionsClearRequested = () => {
//     setSuggestions([]);
//   };

//   // Render Each Option
//   const renderSuggestion = (suggestion) => (
//     <div>
//       <Link
//         href={
//           suggestion?.MLS
//             ? generateURL({
//                 listingIDVal: suggestion.MLS,
//                 cityVal: suggestion?.Municipality,
//               }) //for a listing
//             : `/${suggestion.province.toLowerCase()}/${suggestion.city.toLowerCase()}`
//         }
//         className="max-w-[300px]"
//       >
//         <div className="flex justify-between me-3">
//           <div className="flex gap-1 justify-start">
//             <div>
//               {suggestion?.Address ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="#00b5d6"
//                   className="bi bi-geo"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="#00b5d6"
//                   className="bi bi-geo"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
//                   />
//                 </svg>
//               )}
//             </div>

//             <span className="me-4">
//               {suggestion?.Address || suggestion.city}
//             </span>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );

//   // Autosuggest input props
//   const inputProps = {
//     placeholder: "Search city, address or province",
//     value,
//     onChange: (event, { newValue }) => {
//       if (!newValue) {
//         setValue("");
//       } else setValue(newValue);
//     },
//     onKeyDown: (event) => {
//       // Check if the pressed key is Enter (key code 13)
//       if (event.key === "Enter") {
//         // Get the first suggestion (if available)
//         const firstSuggestion = suggestions[0];

//         // If there is a suggestion, navigate to its link
//         if (firstSuggestion) {
//           router.push(
//             `/${firstSuggestion.province.toLowerCase()}/${firstSuggestion.city.toLowerCase()}`
//           );
//         }
//       }
//     },
//     //additional
//     // highlightFirstSuggestion: true,
//     // alwaysRenderSuggestions: true,
//   };

//   return (
//     <div className={bigger ? "fuller-search" : ""}>
//       <Autosuggest
//         suggestions={suggestions}
//         onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//         onSuggestionsClearRequested={onSuggestionsClearRequested}
//         getSuggestionValue={(suggestion) => suggestion?.city}
//         renderSuggestion={renderSuggestion}
//         inputProps={inputProps}
//       />
//     </div>
//   );
// };

// export default SearchBar;
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
  placeholderFont = 1.5,
}) => {
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debouncing
  const handleChange = async (e) => {
    await getSuggestions(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce((e) => handleChange(e), 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

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
        <div className="flex items-center pl-4 pr-0 justify-center bg-white">
          <CgSearch size="1.25rem" />
        </div>
        <input
          className={`w-full py-3 px-2 focus:outline-none placeholder:text-${placeholderFont}rem`}
          placeholder="Search by address, city, neighbourhood or postal code"
          onChange={(e) => {
            setDisplaySuggestions(true);
            setSearchTerm(e.target.value);
            debouncedResults(e);
          }}
          onFocus={() => {
            setDisplaySuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => setDisplaySuggestions(false), 500);
          }}
          value={searchTerm}
        />
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
                <div className="text-xs text-gray-600 font-bold">
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
                <section className="my-1">
                  <div className="text-xs text-gray-600 font-bold">
                    RECENT SEARCHES
                  </div>
                  <div>
                    {console.log(
                      JSON.parse(window.localStorage.getItem("searchValue"))
                    )}
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
      className="w-full py-4 flex items-center cursor-pointer rounded-lg hover:bg-lime-100 px-2"
      // key={suggestion?.MLS || suggestion?.city}
    >
      <div className="flex justify-between me-3">
        <div className="flex justify-start items-center">
          <div>
            <CgPin className="1.25rem"></CgPin>
          </div>

          <span className="ml-2">{suggestion?.Address || suggestion.city}</span>
        </div>
      </div>
    </Link>
  );
};

export default SearchBar;
