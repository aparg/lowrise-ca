import { endPoints } from "@/api/endpoints";
import Link from "next/link";
import React from "react";

const NewBlogCard = ({ blog }) => {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      passHref
      className="shadow-lg rounded-md"
    >
      <div>
        <img
          className="object-cover w-full h-full rounded-t-md"
          src={endPoints.baseURL + blog.news_thumbnail}
          alt=""
        />
        <span className="inline-flex px-2 py-1 text-xs font-normal rounded-md text-sky-800 border border-sky-800 mt-4 mx-2">
          {" "}
          {blog.city.name}
        </span>
        <p className="text-md font-semibold leading-6 px-2 mt-2 mb-2">
          <div className="text-black"> {blog.news_title}</div>
        </p>
      </div>
    </Link>
  );
};

export default NewBlogCard;
