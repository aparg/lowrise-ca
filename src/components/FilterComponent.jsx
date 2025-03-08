"use client";
import React from "react";
import { FilterOpenProvider } from "./context/FilterOpenContext";
import FiltersWithSalesList from "./FiltersWithSalesList";

const FilterComponent = (props) => {
  return (
    <FilterOpenProvider>
      <FiltersWithSalesList {...props} />
    </FilterOpenProvider>
  );
};

export default FilterComponent;
