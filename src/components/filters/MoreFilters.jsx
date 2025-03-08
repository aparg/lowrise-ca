import React, { useState } from "react";
import { IndividualFilterButton } from "./IndividualFilterButton";
import { OpenHouseFilter } from "./OpenHouseFilter";

export const MoreFilters = ({
  handleFilterChange,
  filterState,
  basementType,
  roads,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:outline-none flex items-center justify-between"
      >
        <span className="text-sm font-medium">All Properties</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-lg border-t transform transition-transform duration-300 ease-in-out">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">All Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <IndividualFilterButton
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
              />
              <OpenHouseFilter city={filterState.city} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
