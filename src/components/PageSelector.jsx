"use client";
// import { PageNotFoundError } from "next/dist/shared/lib/utils";
import React, { useState } from "react";
import PageSelectorElement from "./PageSelectorElement";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PageSelector = ({ numberOfPages, batchSize, selected, setSelected }) => {
  const [startsFrom, setStartsFrom] = useState(selected > 1 ? selected - 1 : 1);
  const selectPage = (page) => {
    setSelected(page);
  };
  const moveLeft = () => {
    if (startsFrom > 1) setStartsFrom(startsFrom - 3);
  };
  const moveRight = () => {
    setStartsFrom(startsFrom + 3);
  };
  return (
    <div className="flex flex-row ">
      <button
        className={`rounded-md mr-1 border-grey-200 border-2 w-8 h-8 flex items-center justify-center`}
        onClick={moveLeft}
        // disabled={page === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {Array(batchSize)
        .fill(0)
        .map((x, idx) => (
          <div key={idx}>
            <PageSelectorElement
              selected={selected === startsFrom + idx}
              value={startsFrom + idx}
              setSelected={() => selectPage(startsFrom + idx)}
            />
          </div>
        ))}
      <button
        className={`rounded-md mr-1 border-grey-200 border-2 w-8 h-8 flex items-center justify-center`}
        onClick={moveRight}
        // disabled={page === 1}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PageSelector;
