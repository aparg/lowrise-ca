import React from "react";
import { ChevronDown } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white mb-[10rem] mt-[3rem]">
      <img
        src="/contact-bottom.png"
        alt="Logo"
        className="mx-auto mb-8"
        width={400}
        height={400}
      />
      <h1 className="text-3xl font-bold text-center mb-2">
        Have any Questions ?
      </h1>
      <p className="text-xl text-center mb-8">
        Speak to our Homes expert today
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 py-4 bg-[#f8f9fa] rounded-md focus:outline-black"
        />

        <div className="flex space-x-4">
          <input
            type="email"
            placeholder="Your email"
            className="w-1/2 p-3 py-4 bg-[#f8f9fa] rounded-md focus:outline-black"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-1/2 p-3 py-4 bg-[#f8f9fa] rounded-md focus:outline-black"
          />
        </div>
        <div className="relative">
          <label className=" px-1 text-sm text-gray-600">
            Are you a realtor or working with one?
          </label>
          <select
            className="w-full p-3 py-4 bg-[#f8f9fa] rounded-md appearance-none focus:outline-black mt-5"
            defaultValue="No"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <ChevronDown className="absolute right-3 top-[4.5rem] transform -translate-y-1/2 text-gray-400" />
        </div>

        <textarea
          placeholder="Enter your message"
          className="w-full p-3 bg-[#f8f9fa] rounded-md h-32"
        />

        <p className="text-xs text-gray-500 text-center">
          Low rise is an online resale homes database for properties in Canada.
          Low rise curates the list of homes that are publicly available on the
          internet and does not take part in any real estate transactions. Be
          advised the information provided on this page could be outdated or
          inaccurate. By submitting the above form, you consent to real estate
          agents advertising on this page to connect with you. We may share your
          info with our partners or advertisers to help you with your questions.
          You can unsubscribe at any time by emailing us.
        </p>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-300"
        >
          Contact now
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
