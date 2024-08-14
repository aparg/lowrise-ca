"use client";
import Link from "next/link";
import { useState } from "react";

const Collapse = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      {collapse && (
        <Link
          data-bs-toggle="collapse"
          onClick={(e) => setCollapse(!collapse)}
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="font-bold"
        >
          See Less
        </Link>
      )}
      {!collapse && (
        <Link
          data-bs-toggle="collapse"
          onClick={(e) => setCollapse(!collapse)}
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="font-bold"
        >
          See More
        </Link>
      )}
    </>
  );
};

export default Collapse;
