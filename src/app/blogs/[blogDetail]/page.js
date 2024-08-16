import React from "react";

//API
import {
  fetchBlogPostByCity,
  fetchBlogPostBySlug,
} from "../../../../api/blogs";

//LIB
import dayjs from "dayjs";

//COMPONENT
import BottomContactForm from "@/components/BottomContactForm";

//STYLES
import "../blog.css";
import Image from "next/image";
import Link from "next/link";
import SocialMediaShare from "@/components/SocialMediaShare";
import { endPoints } from "../../../../api/blogs/endpoints";
import BlogCard from "@/components/BlogCard";

export async function generateMetadata({ params }, parent) {
  const blogSlug = params?.blogDetail;

  const blog = await fetchBlogPostBySlug(blogSlug);

  return {
    ...parent,
    alternates: {
      canonical: `https://lowrise.ca/blogs/${blogSlug}`,
    },
    title: `${blog.news_title}`,
  };
}

const BlogDetails = async ({ params }) => {
  const blogSlug = params?.blogDetail;

  const blog = await fetchBlogPostBySlug(blogSlug);
  const relatedBlogPosts = await fetchBlogPostByCity(blog.city.slug);

  //filter out related blogs for the same city
  const filteredBlogPostsBasedOnCity = relatedBlogPosts.filter(
    (relatedBlog) => blog.slug !== relatedBlog.slug
  );

  return (
    <div className="blog__details">
      <div className="container">
        <div className="grid max-w-4xl mx-auto">
          <div className="cols-4 mx-auto">
            {/* <Breadcrumb
              homeElement={"Home"}
              separator={
                <span>
                  {" "}
                  <svg
                    className="svg minearr"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z"
                      fill={"#869099"}
                    ></path>
                  </svg>{" "}
                </span>
              }
              activeClasses="text-dark "
              containerClasses="flex align-items-center p-0 m-0 pt-4 breadcrumb"
              listClasses="mx-1"
              capitalizeLinks
            /> */}
            <div className="my-3 mt-4">
              <Link href={`/blogs/category/${blog.city.slug}`}>
                <div className="tag fw-bold">
                  <p>{blog.city.name}</p>
                </div>
              </Link>
            </div>

            <div className="blog-title">
              <h1 className="text-4xl font-bold py-3 mb-3 fs-1 leading-[3rem]">
                {blog.news_title}
              </h1>
            </div>
            <section className="blog__author flex items-center mt-3">
              <div className="">
                <img
                  className="rounded-full w-12"
                  src="https://api.homebaba.ca/media/agent_UGllzo7.jpg"
                  alt="blog-author"
                />
              </div>
              <div className="flex justify-between flex-grow-1 ps-3 w-full">
                <div className="blog__author-detail col-sm-12 col-md-9 ">
                  <div className="fw-bold">Milan Pandey</div>
                  <div className="text-gray-500">
                    Posted {dayjs(blog?.date_of_upload).format("MMMM DD, YYYY")}
                  </div>
                </div>

                <div className="text-gray-500">
                  <div className="blog-read__time-name">Blog</div>
                  <div>5 min read</div>
                </div>
              </div>
            </section>

            <div className="font-extrabold text-gray-500 my-4 flex items-center gap-4">
              <p className="fw-bold text-gray-500 ps-2">Share</p>
              <SocialMediaShare />
            </div>

            <div className="horizontal-row mt-4 mb-5" />
            <section className="blog__desc mt-4">
              <div className="banner-image">
                <img
                  src={endPoints.baseURL + blog.news_thumbnail}
                  alt={blog.news_title.slice(0, 10)}
                  loading="lazy"
                  width="100%"
                  height="100%"
                  className="img-fluid"
                />
              </div>

              <div
                className="mt-4"
                id="make-img-responsive"
                dangerouslySetInnerHTML={{
                  __html: blog.news_description,
                }}
              />
            </section>

            {filteredBlogPostsBasedOnCity.length > 0 ? (
              <>
                <section className="mt-20 sm:mt-40 mt-5">
                  <h3 className="text-4xl font-bold">
                    You might be interested in
                  </h3>
                  <article>
                    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-x-3 mt-4">
                      {filteredBlogPostsBasedOnCity.map((blog, index) => {
                        return (
                          <div className="mb-4" key={index}>
                            <BlogCard blog={blog} />
                          </div>
                        );
                      })}
                    </div>
                  </article>
                </section>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="py-20"></div>
      <div className="py-5 my-3 d-none d-md-block">
        <div className="container-fluid">
          {/* <div className="row justify-content-center">
            <div className="flex justify-center mb-3">
              <Image
                src="/portfolio-img/hero-img.png"
                alt="farah-abdollah-forogohi"
                className="rounded-lg w-full sm:w-1/5"
              />
            </div>
          </div> */}

          <h2 className="text-4xl font-extrabold text-center md:px-4 fs-4 mb-10">
            Contact Me Today
          </h2>
          <div className="grid grid-cols-1">
            <div className="mt-5">
              <BottomContactForm
                proj_name={blog.news_title}
                city="Blog Page"
              ></BottomContactForm>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
