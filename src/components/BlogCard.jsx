import React from "react";

//LIB
import Link from "next/link";
import dayjs from "dayjs";

//API
import { endPoints } from "../../api/blogs/endpoints";

//STYLES
import "../app/blogs/blog.css";

const BlogCard = ({ blog }) => {
  return (
    <div className="card border-0 my-3 my-md-0 blog-container shadow-lg relative">
      {/* Wrap the card in the Link component */}
      <Link href={`/blogs/${blog.slug}`} passHref className="h-100">
        <div className="w-100 h-[18rem] relative">
          <img
            loading="lazy"
            className="object-cover h-full w-full"
            src={endPoints.baseURL + blog.news_thumbnail}
            alt={blog.news_title.slice(0, 10)}
            style={{ filter: "brightness(0.8)" }}
          />
          <div className="absolute bottom-0 mb-3" style={{ left: "20px" }}>
            <Link href={`/blogs/category/${blog.city.slug}`}>
              <div className="tag">
                <p>{blog.city.name}</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-dark p-4">
          <h5 className="card-title font-bold text-dark mb-[3rem] h-[4.5rem] overflow-hidden leading-[1.5rem] text-ellipsis">
            {blog.news_title}
          </h5>

          <div className="text-black absolute bottom-0 mb-3">
            Posted {dayjs(blog?.date_of_upload).format("MMMM DD, YYYY")}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
