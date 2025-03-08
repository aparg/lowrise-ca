"use client";
import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import { Cross, CrossIcon, X, ChevronDown } from "lucide-react";
import { FilterOpenContext } from "@/components/context/FilterOpenContext";
import {
  bedCount,
  houseType,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
} from "@/constant";

const CustomDropdown = ({
  options,
  name,
  value,
  handleFilterChange,
  isMobileView,
  isMulti = false,
  defaultValue,
  city,
  saleLease,
  filterObj,
  priceRange,
  filterHouseType = null,
  filterBedCount = null,
}) => {
  const { setIsFilterOpen } = useContext(FilterOpenContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    isMulti ? [...value] : [value]
  );
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
  const handleSelect = (option) => {
    let newValues;
    if (isMulti) {
      newValues = selectedValues.includes(option)
        ? selectedValues.filter((val) => val !== option)
        : [...selectedValues, option];
    } else {
      if (name != "priceRange") {
        newValues = [
          Object.values(filterObj).find((obj) => {
            if (obj.name == option) return obj.value;
          }).value,
        ];
      } else {
        newValues = [priceRange == option];
      }
      setIsOpen(false);
    }
    setSelectedValues(newValues);
    handleFilterChange(name, newValues.join(", ").replaceAll("_", " "));
  };
  const optionSelected =
    selectedValues.length > 0 && selectedValues[0] !== defaultValue;
  const label = () => {
    if (name == "priceRange") {
      return selectedValues[0] || defaultValue;
    } else {
      return (
        Object.values(filterObj).find((obj) => obj.value == selectedValues[0])
          ?.name || defaultValue
      );
    }
  };
  const houseTypeName = Object.values(houseType).find(
    (val) => filterHouseType == val.value
  )?.name;
  const clearFilter = (name) => {
    setSelectedValues([]);
    handleFilterChange(
      name,
      Object.values(filterObj).find((obj) => !obj.value).value
    );
  };

  useEffect(() => {
    isOpen ? setIsFilterOpen(true) : setIsFilterOpen(false);
  }, [isOpen]);
  return (
    <div className="inline-block relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            flex items-center justify-between
            capitalize text-xs h-8 border-[#b2b2b2] tracking-[0.01125]
            rounded-full px-3 border-[1px] font-semibold 
            ${isMobileView ? "px-s gap-1 min-w-[40px]" : "min-w-[120px]"}
            ${
              optionSelected
                ? `bg-[#f2f4f5] text-black border-black`
                : "border-[#e8e8e8] text-gray-600 bg-white "
            }
            hover:shadow-md transition-all text-center
          `}
      >
        <span className="truncate">{label()}</span>
        {!selectedValues.includes(defaultValue) ? (
          <Link
            href={generateURL({
              bedCount: name == "bed" ? null : filterBedCount,
              priceRange: name == "priceRange" ? null : priceRange,
              city: city,
              houseTypeVal: name == "houseType" ? null : houseTypeName,
              embeddedSite: true,
            })}
          >
            <X className="w-3 h-3 ml-2 hover:scale-125 hover:font-bold duration-200" />
          </Link>
        ) : (
          <FaChevronDown
            size={10}
            className={`ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>
      {isOpen && (
        <div
          className={`
              absolute left-0 top-full min-w-[120px] sm:min-w-[180px] max-h-[300px] overflow-y-auto
              bg-white rounded-lg shadow-lg
              border border-gray-200
              mt-2 py-2 z-[1000]
            `}
        >
          {options.map((option) => {
            if (name === "type" || name == "bed") {
              const url = generateURL({
                cityVal: city,
                houseTypeVal: name == "type" ? option : houseTypeName,
                saleLeaseVal: saleLease,
                priceRange: priceRange,
                bedCount:
                  Object.values(bedCount).find((val) => val.name == option)
                    ?.value ||
                  filterBedCount ||
                  null,
              });

              return (
                <Link
                  key={option}
                  href={url}
                  className="
                      block px-4 py-2
                      hover:bg-gray-100 
                      text-sm text-gray-700
                      cursor-pointer hover:font-bold
                    "
                >
                  {option}
                </Link>
              );
            }
            if (name === "priceRange") {
              const url = generateURL({
                cityVal: city,
                priceRange: option,
                saleLeaseVal: saleLease,
                bedCount:
                  Object.values(bedCount).find((val) => val.name == option)
                    ?.value ||
                  filterBedCount ||
                  null,
                houseTypeVal: houseTypeName,
              });

              return (
                <Link
                  key={option}
                  href={url}
                  className="
                      block px-4 py-2
                      hover:bg-gray-100 
                      text-sm text-gray-700
                      cursor-pointer hover:font-bold
                    "
                >
                  {option}
                </Link>
              );
            }
            return (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`
                    px-4 py-2
                    hover:bg-gray-100 
                    text-sm cursor-pointer
                    ${
                      selectedValues.includes(option)
                        ? "bg-gray-50 text-black font-medium"
                        : "text-gray-700"
                    }
                  `}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Replace the IndividualFilter component with CustomDropdown
export const DropdownFilter = (props) => {
  return <CustomDropdown {...props} />;
};
