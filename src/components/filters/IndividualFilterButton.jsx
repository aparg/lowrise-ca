import { useState } from "react";

export const IndividualFilterButton = ({
  options,
  name,
  value,
  handleFilterChange,
  filterObj,
  isMulti,
  city,
  type,
}) => {
  const [activeFilter, setActiveFilter] = useState([]);
  const handleClick = (name, option) => {
    if (activeFilter.includes(option)) {
      const filteredActiveFilter = activeFilter.filter((opt) => opt !== option);
      setActiveFilter(filteredActiveFilter);
      handleFilterChange(name, filteredActiveFilter);
    } else {
      setActiveFilter([...activeFilter, option]);
      let filteredActiveFilter;
      isMulti
        ? (filteredActiveFilter = [...activeFilter, filterObj[option]])
        : (filteredActiveFilter = filterObj[option]);

      handleFilterChange(name, filteredActiveFilter);
    }
  };

  return (
    <div className="inline-flex sm:justify-normal justify-center sm:mr-4 flex-nowrap gap-y-2 py-1 sm:py-0 sm:mx-2 my-0 sm:my-2 bg-white">
      {options.map((option, index) => {
        return (
          <div
            key={index}
            className={`mx-[2px] px-2 sm:px-3 h-8 border-[1px] tracking-[0.01125] cursor-pointer text-nowrap flex justify-center items-center rounded-full hover:shadow-lg text-xs font-semibold
              ${
                activeFilter.includes(option)
                  ? `border-black bg-[#f2f4f5] text-black`
                  : "border-[#e8e8e8] text-gray-500 bg-white"
              }`}
            onClick={() => handleClick(name, option)}
            // style={{ border: "2px solid #e5e7eb" }}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};
