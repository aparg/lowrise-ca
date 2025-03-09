import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { ChevronRight, File } from "lucide-react";

const GetStatusReport = () => {
  const [submitbtn, setSubmitbtn] = useState("Request now");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    cityy: "Ontario",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitbtn("Submitting...");
    try {
      // Get the root domain name
      const hostname = window.location.hostname || window.location.host;

      let source = "localhost";
      if (hostname !== "localhost") {
        const parts = hostname.split(".");
        source = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
      }
      console.log("Extracted source:", source);

      let form_data = new FormData();
      form_data.append("name", credentials.name);
      form_data.append("email", credentials.email);
      form_data.append("phone", credentials.phone);
      form_data.append("source", String(source));

      let url = "https://api.homebaba.ca/api/contact-form-submit/";
      await axios.post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        mode: "no-cors",
      });

      setSubmitbtn("Successfully Submitted");
      setTimeout(() => {
        setSubmitbtn("Contact now");
      }, 2000);

      await swal(
        `Thank You, ${credentials.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );

      setCredentials({
        ...credentials,
        name: "",
        phone: "",
        email: "",
        message: "Get Status Certificate",
      });
    } catch (error) {
      console.error(error);
      setSubmitbtn("Contact now");
      await swal("Message Failed", "Cannot send your message", "error");
    }
  };

  return (
    <Dialog>
      {" "}
      <DialogTrigger className=" rounded-md font-bold text-red-700 hover:text-red-600 text-sm flex items-center">
        Request for status certificate <ChevronRight className="w-4" />
        <br />
      </DialogTrigger>
      <DialogContent className="w-[40%] p-4">
        <DialogHeader className="font-bold text-xl">
          Request for a status certificate
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={credentials.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              id="phone"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={credentials.phone}
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
            value={credentials.email}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 sm:py-4 rounded-xl text-[15px] sm:text-[16px] font-medium hover:bg-gray-800 transition duration-200"
          >
            {submitbtn}
          </button>

          <p className="text-[10px] sm:text-[8px] text-[#6B7280] text-center leading-tight mt-4">
            I agree to receive marketing and customer service calls and text
            messages from Lowrise. Consent is not a condition of purchase.
            Msg/data rates may apply. Msg frequency varies. Reply STOP to
            unsubscribe. Privacy Policy & Terms of Service.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GetStatusReport;
