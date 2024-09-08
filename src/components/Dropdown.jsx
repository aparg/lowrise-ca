import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaChevronDown } from "react-icons/fa";

const Dropdown = ({ name, options, width = "25rem" }) => {
  const [shown, setShown] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutId = useRef(null);

  const handleMouseEnter = () => {
    setShown(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setShown(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`font-normal text-sm text-black rounded-md bg-transparent hover:text-primary-green ${
          shown && "bg-white"
        }`}
        onClick={() => setShown(!shown)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex ">
          {name}
          <span className="ml-1 mt-2">
            <FaChevronDown size={8} />
          </span>
        </div>
      </button>

      <div
        className={`absolute left-[-1rem] sm:right-0 mt-6 bg-white rounded-md shadow-2xl border z-10 text-sm h-auto grid ${
          options.length > 5
            ? "grid-cols-3 sm:w-[30rem] w-[20rem] "
            : "grid-cols-1 w-[20rem]"
        } ${!shown && "hidden"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {options.map((option) => (
          <Link
            href={option.link}
            className="block sm:px-4 px-2 py-2 text-gray-800 hover:drop-shadow-2xl hover:font-bold hover:shadow-2xl hover:rounded-md text-start text-sm text-nowrap whitespace-nowrap"
            key={option.name}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
