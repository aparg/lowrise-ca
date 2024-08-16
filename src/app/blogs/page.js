import React from "react";

import { fetchAllBlogPosts, fetchCities } from "../../../api/blogs";

import BlogCard from "@/components/BlogCard";
// import Breadcrumb from "@/components/Breadcrumb";
import BottomContactForm from "@/components/BottomContactForm";

// export async function generateMetadata({ params }, parent) {
//   return {
//     ...parent,
//     alternates: {
//       canonical: `https://lowrise.ca/blogs/`,
//     },
//     title: "Lowrise | Blogs",
//   };
// }

const page = async () => {
  const blogPosts = await fetchAllBlogPosts();
  const cities = await fetchCities();

  return (
    <div className="pages">
      {/* <div className="container-fluid justify-content-start">
        <Breadcrumb
          homeElement={"Home"}
          separator={
            <span>
              {" "}
              <svg
                className="svg minearr"
                viewBox="0 0 32 32"
                xmlns="http:www.w3.org/2000/svg"
              >
                <path
                  d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z"
                  fill={"#869099"}
                ></path>
              </svg>{" "}
            </span>
          }
          activeClasses="text-dark"
          containerClasses="flex align-items-center p-0 m-0 pt-4 breadcrumb"
          listClasses="mx-1"
          capitalizeLinks
        />
      </div> */}

      <div className="container-fluid mt-4">
        <div className="row mt-3">
          <div className=" mx-auto">
            <div className="blogs ">
              <div className="grid g-4">
                <div className="col-sm-12 col-lg-12 ">
                  <h1 className="text-4xl font-bold text-center text-md-start my-4">
                    The Lowrise Insights : Learn whats happening in your city
                  </h1>
                  <div className="grid grid-cols-4 gap-x-4">
                    {blogPosts.length > 0 ? (
                      <>
                        {blogPosts.map((blog, index) => {
                          return (
                            <div
                              className="col-span-4 sm:col-span-1 mb-4"
                              key={index}
                            >
                              <BlogCard blog={blog} />
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div>
                        <p className="text-start text-xs text-secondary">
                          No blog post found
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 my-5 hidden md:block">
          <div className="container-fluid">
            <h2 className="text-4xl font-extrabold text-center px-md-4 fs-4">
              Contact Me Today
            </h2>
            <div className="mt-5">
              <BottomContactForm
                proj_name="Blog"
                city="Blog Page"
              ></BottomContactForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
