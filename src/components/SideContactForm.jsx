"use client";
import React, { useRef, useState } from "react";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import swal from "sweetalert";
import { sendEmail } from "@/api/resend";

const SideContactForm = ({ showBookingType = true, address, city }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);

  //slide right and left code for cardref and containerref
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [timing, setTiming] = useState({
    type: "",
    date: "",
    email: "",
    time: "",
    phoneNumber: "",
    name: "",
    message: "",
  });
  const [submitbtn, setSubmitbtn] = useState("Book a showing");
  const [loading, setLoading] = useState(false);
  const slideLeft = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };
  function getDaysInMonth(year, month) {
    // Get the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  function getSevenDaysStartingTomorrow() {
    const today = new Date();
    const daysArray = [];

    for (let i = 1; i <= 8; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      const day = date.getDate();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      const monthName = date
        .toLocaleDateString("default", { month: "long" })
        .slice(0, 3);
      const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1 to get the correct month
      const year = date.getFullYear();

      daysArray.push({
        day,
        dayName,
        month: monthName,
        monthNumber: month,
        year,
        selected: false,
      });
    }

    // daysArray.unshift({
    //   day: "Any",
    //   month: "",
    //   dayName: "",
    //   selected: false,
    //   time: "",
    // });

    return daysArray;
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const [daysArray, setDaysArray] = useState(
    getSevenDaysStartingTomorrow(year, month)
  );
  const selectOption = (e, data) => {
    const updatedDaysArray = daysArray.map((day) => {
      if (day.day === data.day) {
        return { ...day, selected: true };
      } else {
        return { ...day, selected: false };
      }
    });
    setDaysArray(updatedDaysArray);
    handleChange(e);
  };

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    setTiming((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitbtn("Submitting...");

    e.preventDefault();
    // Collect form data into credentials object
    console.log(address);
    const credentials = {
      username: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phoneNumber.value,
      // realtor: e.target.realtor.value,
      message: e.target.message.value,
      // Add other form fields as needed
    };

    // Update button state and show loading
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = "Submitting...";

    try {
      // Your form submission logic here
      await sendEmail({
        content: credentials,
        page: address,
        title: "Inquiry from Listing page",
      });

      // Handle successful submission
      submitButton.innerHTML = "Submitted!";
    } catch (error) {
      // Handle error
      submitButton.disabled = false;
      submitButton.innerHTML = "Submit";
      console.error("Submission error:", error);
    }
  };
  return (
    <div className="sticky top-20 z-0 w-full rounded-md bg-very-light-gray flex items-center sm:pt-2 sm:mt-0 shadow-2xl">
      <div className="bg-white rounded-[10px] shadow-large p-3 sm:p-4 w-full">
        <div className="flex items-center justify-center space-x-4 mb-3 sm:mb-3">
          <div className="w-[90px] h-[90px] sm:w-[80px] sm:h-[80px] relative">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src="/shally.jpeg"
                alt="Default Agent"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-2xl sm:text-[14px] sm:text-xl font-bold text-black leading-none text-center">
              Book a Showing
            </h2>
            <p className="text-xs sm:text-xs text-[#2C2C2C] flex items-center text-center justify-center">
              Tour this home with Shally
            </p>
          </div>
        </div>

        <form onSubmit={submitData} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={timing.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone"
              id="phoneNumber"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={timing.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Your email"
            name="email"
            id="email"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
            value={timing.email}
            onChange={handleChange}
            required
          />

          {/* <div className="relative">
            <select
              id="realtor"
              className="w-full px-3 sm:px-4 py-4 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-xs sm:text-xs placeholder:text-xs"
              value={timing.realtor}
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <div className="absolute top-0 left-4 -translate-y-2 px-1 bg-white">
              <span className="text-[11px] sm:text-xs text-[#6B7280]">
                Are you a realtor or working with a realtor?
              </span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B7280]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div> */}

          <textarea
            name="message"
            id="message"
            placeholder={`Please send me additional information about ${address}. Thank you`}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] h-[100px] sm:h-[120px] resize-none text-[14px] sm:text-base placeholder:text-xs"
            value={timing.message}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#d93c23] text-white py-3 sm:py-4 rounded-xl text-[15px] sm:text-[20px] font-bold hover:bg-[#e74f36] transition duration-200 shadow-large"
          >
            {loading ? "Sending..." : submitbtn}
          </button>

          <p className="text-[10px] sm:text-[8px] text-[#6B7280] text-center leading-tight mt-4">
            I agree to receive marketing and customer service calls and text
            messages from Homebaba Technologies. Consent is not a condition of
            purchase. Msg/data rates may apply. Msg frequency varies. Reply STOP
            to unsubscribe. Privacy Policy & Terms of Service.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SideContactForm;
