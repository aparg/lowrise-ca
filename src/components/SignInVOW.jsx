"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

const SignInVOW = ({ setSignedIn }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);

  const submitCredentials = (e) => {
    e.preventDefault();
    isLocalStorageAvailable() &&
      localStorage.setItem(
        "sign-in-vow",
        JSON.stringify({ email: email, phone })
      );
    setOpen(false);
    setSignedIn(true);
  };
  return (
    <Dialog className="" open={open} onClick={(e) => e.stopPropagation()}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-black bg-black text-white border-2 rounded-full px-3 py-1 hover:scale-110 text-[0.5rem] sm:text-sm"
      >
        Sign in to view
      </DialogTrigger>

      <DialogDescription className="">
        <DialogContent className="bg-white">
          <DialogHeader
            className={`text-center font-normal text-2xl sm:text-3xl`}
          >
            <DialogTitle>Sign in</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col items-center"
            onSubmit={submitCredentials}
          >
            <div className="relative mb-1 mt-2 w-full">
              <input
                type="email"
                name="email"
                id="email-vow-signin"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none  border-2"
              />
              <label
                htmlFor="email-vow-signin"
                className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 "
              >
                Email
              </label>
            </div>
            <div className="relative mb-2 mt-0 w-full">
              <input
                type="text"
                name="phone"
                id="phone-vow-signin"
                placeholder=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
                className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none  border-2"
              />
              <label
                htmlFor="phone-vow-signin"
                className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 "
              >
                Phone Number
              </label>
            </div>
            <input
              type="submit"
              value={
                "Submit"
                // isSubmitting
                //   ? "Submitting..."
                //   : isSubmitted
                //   ? "Sent!"
                //   : "Schedule Tour"
              }
              // disabled={isSubmitting}
              className={`px-4 py-2 bg-black text-white md:py-2 w-40 mt-3 mb-3 rounded-full hover:cursor-pointer mx-auto text-md sm:text-lg opacity-70 cursor-not-allowed`}
              id="subbtn"
            />
          </form>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
};

export default SignInVOW;
