import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React, { useRef } from "react";
import { CSSTransition, Transition } from "react-transition-group";
import { CgPin } from "react-icons/cg";
import useFirstRender from "@/hooks/useFirstRender";

const Autosuggest = ({
  displaySuggestions,
  searchTerm,
  suggestions,
  numberOfSuggestions,
  setSearchTerm,
}) => {
  //For enter & exit animation
  // const [inProp, setInProp] = useState(false);
  const firstRender = useFirstRender();
  return (
    <div
      className={`absolute top-0 rounded-b-[28px] border-[1px] border-[#dfe1e5] w-full bg-white p-4 overflow-hidden ${
        firstRender
          ? "hidden"
          : displaySuggestions
          ? "searchbar-animation-open"
          : "searchbar-animation-close"
      }`}
    >
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
            {suggestions.slice(0, numberOfSuggestions).map((suggestion) => {
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
        JSON.parse(window.localStorage.getItem("searchValue")).length > 0 && (
          <section
            className={`my-1 ${
              suggestions.length > 0 && searchTerm && "border-t-1 mt-2 pt-2"
            }`}
          >
            <div className="text-xs text-gray-600 font-bold text-center">
              RECENT SEARCHES
            </div>
            <div>
              {window &&
                JSON.parse(window.localStorage.getItem("searchValue"))?.map(
                  (suggestion) => (
                    <SearchOption
                      suggestion={JSON.parse(suggestion)}
                      key={suggestion?.MLS || suggestion?.city}
                    />
                  )
                )}
            </div>
          </section>
        )}
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

export default Autosuggest;