"use client";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

//CONSTANT
import {
  bedCount,
  saleLease,
  houseType,
  washroomCount,
  priceRangesSaleProperties,
  priceRangesLeaseProperties,
  basementType,
  Roads,
  roads,
  openHouse,
} from "@/constant";

import useDeviceView from "@/helpers/useDeviceView";
import { IndividualFilterButton } from "./filters/IndividualFilterButton";
import { DropdownFilter } from "./filters/DropdownFilter";
import { IndividualLinkedFilterButton } from "./filters/IndividualLinkedFilterButton";
import { OpenHouseFilter } from "./filters/OpenHouseFilter";
import { MoreFilter } from "./filters/MoreFilter";
// import Dropdown from "./Dropdown";
const Filters = ({ filterState, setFilterState, fetchFilteredData }) => {
  const [navbar, setNavbar] = useState(false);

  const { isMobileView } = useDeviceView();

  //options for lease or sale
  const saleLeaseOptions = Object.values(saleLease).map((item) => item.name);
  //options for bed count
  const bedCountOptions = Object.values(bedCount)
    .filter((opt) => opt.value > 0)
    .map((item) => item.name);
  //options for house type

  const houseTypeOptions = Object.values(houseType).map((item) => item.name);
  //options for washroom counts
  const washroomCountOptions = Object.values(washroomCount).map(
    (item) => item.name
  );

  const priceRangeOptionsSaleProperties = Object.keys(
    priceRangesSaleProperties
  );
  const priceRangeOptionsLeaseProperties = Object.keys(
    priceRangesLeaseProperties
  );

  const allPriceRanges = {
    ...priceRangesLeaseProperties,
    ...priceRangesSaleProperties,
  };
  const handleFilterChange = (name, value) => {
    const newFilterState = { ...filterState };
    newFilterState[name] = value;
    if (name === "saleLease") {
      //reset the price filter
      newFilterState["priceRange"] = {
        min: 0,
        max: 0,
      };
    }
    scrollToFilters();
    setFilterState({ ...newFilterState });
    if (name !== "Basement") fetchFilteredData(newFilterState);
  };

  const handlePriceChange = (name, value) => {
    const newFilterState = { ...filterState };
    const priceRange =
      filterState.saleLease == saleLease.sale.name
        ? priceRangesSaleProperties[value]
        : priceRangesLeaseProperties[value];
    newFilterState[name] = {
      min: priceRange?.min,
      max: priceRange?.max,
    };

    scrollToFilters();
    setFilterState({ ...newFilterState });
    fetchFilteredData(newFilterState);
  };

  const scrollToFilters = () => {
    //if window exists scroll to #contact smoothly
    if (window) {
      // Check for browser environment
      const contactElement = document.getElementById("filters");
      if (contactElement) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const additonalFilterChange = (filteredValue) => {
    const newFilterState = { ...filterState, ...filteredValue };

    setFilterState({ ...newFilterState });

    fetchFilteredData(newFilterState);
  };

  useEffect(() => {
    const rect = document.body.getBoundingClientRect();
    if (window) {
      window.addEventListener("scroll", () => {
        setNavbar(false);
      });

      document.addEventListener("DOMContentLoaded", function () {
        // Code to ensure that the Slider component receives focus when clicked directly
        document
          .querySelector(".price-range__slider")
          .addEventListener("click", function (event) {
            const slider = event.target.closest(".max-w-md.slider");
            if (slider) {
              slider.focus();
            }
          });
      });
    }
  }, []);

  const priceRangeKey = Object.keys(allPriceRanges).find(
    (key) =>
      allPriceRanges[key]?.max == filterState.priceRange.max &&
      allPriceRanges[key]?.min == filterState.priceRange.min
  );

  return (
    <div className="bg-white w-full">
      <div
        className={`flex flex-wrap sm:flex-row gap-1 md:gap-2 sm:my-2 items-center ${
          navbar ? `filter__scrolled mt-4 pb-2 container-fluid` : `top-[0px]`
        }`}
        id="filters"
      >
        <IndividualLinkedFilterButton
          options={saleLeaseOptions}
          name="saleLease"
          value={filterState.saleLease}
          handleFilterChange={handleFilterChange}
          city={filterState.city}
          type={filterState.houseType}
        />
        <div className="relative">
          <DropdownFilter
            options={bedCountOptions}
            defaultValue="Beds"
            name="bed"
            value={filterState.bed > 0 ? filterState.bed : "Beds"}
            setFilterState={setFilterState}
            handleFilterChange={handleFilterChange}
            isMulti={false}
            isMobileView={isMobileView}
            city={filterState.city}
            saleLease={filterState.saleLease}
            filterObj={bedCount}
            bedCount={filterState.bed}
            filterHouseType={filterState.houseType}
          />
        </div>

        <div className="relative">
          <DropdownFilter
            options={houseTypeOptions}
            defaultValue={
              Object.values(houseType).find((val) => val.value == null).name
            }
            name="type"
            value={filterState.houseType || "All Properties"}
            setFilterState={setFilterState}
            handleFilterChange={handleFilterChange}
            isMulti={false}
            isMobileView={isMobileView}
            city={filterState.city}
            saleLease={filterState.saleLease}
            filterObj={houseType}
            priceRange={priceRangeKey}
            filterBedCount={filterState.bed}
          />
        </div>
        <div className="relative">
          <DropdownFilter
            options={
              filterState.saleLease == saleLease.sale.name
                ? priceRangeOptionsSaleProperties
                : priceRangeOptionsLeaseProperties
            }
            defaultValue={"Price Range"}
            name="priceRange"
            value={priceRangeKey || "Price Range"}
            setFilterState={setFilterState}
            handleFilterChange={handlePriceChange}
            isMulti={false}
            isMobileView={isMobileView}
            city={filterState.city}
            saleLease={filterState.saleLease}
            filterObj={
              filterState.saleLease == saleLease.sale.name
                ? priceRangesSaleProperties
                : priceRangesLeaseProperties
            }
            filterBedCount={filterState.bed}
            filterHouseType={filterState.houseType}
          />
        </div>
        <div>
          <OpenHouseFilter city={filterState.city} />
        </div>
      </div>

      {/* <div className="rounded-full">
        <MoreFilter
          {...{ washroomCountOptions, additonalFilterChange, filterState }}
        />
      </div> */}
      <div className="flex">
        {/* <IndividualFilterButton
          name="Basement"
          options={Object.keys(basementType)}
          value={null}
          handleFilterChange={handleFilterChange}
          filterObj={basementType}
          isMulti={true}
        />
        <IndividualFilterButton
          name="Roads"
          options={Object.keys(roads)}
          value={null}
          handleFilterChange={handleFilterChange}
          filterObj={roads}
          isMulti={true}
        /> */}
      </div>
    </div>
  );
};

export default Filters;
