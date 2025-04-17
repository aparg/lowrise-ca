"use client";
import React from "react";
import DateSelector from "./DateSelector";
const BookShowingForm = ({ address }) => {
  return (
    <div className="sticky top-20 z-0 w-full rounded-md bg-very-light-gray flex items-center sm:pt-2 sm:mt-0 shadow-2xl">
      <div className="flex sm:flex-row flex-col w-full overflow-hidden">
        <div className="w-full flex flex-col justify-center items-center">
          <DateSelector showBookingType={false} address={address} />
        </div>
      </div>
    </div>
  );
};

export default BookShowingForm;
