"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import TimingList from "./TimingList";
import BookingType from "./BookingType";
import { sendEmail } from "@/api/resend";
import DateSelector from "./DateSelector";
const BookShowingForm = ({ address }) => {
  return (
    <div className="sticky top-20 z-0 w-full rounded-md bg-very-light-gray flex items-center sm:pt-8 sm:mt-0 shadow-2xl">
      <div className="flex sm:flex-row flex-col w-full overflow-hidden">
        {/* <div className="w-full sm:w-1/2">
          <img
            src={bannerImage}
            alt="property-img"
            className="object-cover w-full h-full"
          />
        </div> */}
        <div className="w-full sm:mx-2 p-4 flex flex-col justify-center items-center">
          {/**Schedule a viewing form */}
          <h1 className="font-bold text-2xl sm:text-3xl my-2 text-center">
            Book a Showing
          </h1>
          <DateSelector showBookingType={false} />
          <span className="my-4">{address}</span>
        </div>
      </div>
    </div>
  );
};

export default BookShowingForm;
