import React from "react";

//API
import { fetchBlogPostByCity, fetchBlogPostBySlug } from "@/api/blogs";

//LIB
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";

//COMPONENT
import SocialMediaShare from "@/components/SocialMediaShare";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

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

  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blogs",
      href: "/blogs",
    },
    {
      label: blog.news_title,
      href: null,
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-4/5 lg:w-2/3">
            <Breadcrumbs items={breadcrumbItems} />

            <div>
              <h1 className="text-4xl font-extrabold py-3 mb-3">
                {blog.news_title}
              </h1>
            </div>
            <section className="flex items-center mt-3">
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <div className="font-bold">The Lowrise Content Team</div>
                    <div className="text-gray-500">
                      Posted{" "}
                      {dayjs(blog?.date_of_upload).format("MMMM DD, YYYY")}
                    </div>
                  </div>
                  <div className="text-gray-500 mt-2 sm:mt-0 text-left sm:text-right">
                    <div>Blog</div>
                    <div>5 min read</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-4 my-4">
              <p className="font-bold text-gray-600 pl-2">Share</p>
              <SocialMediaShare />
            </div>

            <hr className="my-5" />

            <section className="mt-4">
              <div>
                <img
                  src={`https://api.dolphy.ca${blog.news_thumbnail}`}
                  alt={blog.news_title.slice(0, 10)}
                  width={800}
                  height={450}
                  className="object-cover"
                />
              </div>

              <div
                className="mt-4 prose max-w-none leading-9"
                dangerouslySetInnerHTML={{
                  __html: blog.news_description,
                }}
              />
            </section>
          </div>
        </div>
      </div>
      {filteredBlogPostsBasedOnCity.length > 0 && (
        <section className="mt-20 pt-20">
          <h3 className="text-3xl font-extrabold">
            You might be interested in
          </h3>
          <article>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
              {filteredBlogPostsBasedOnCity.map((blog, index) => (
                <BlogCard key={index} data={blog} />
              ))}
            </div>
          </article>
        </section>
      )}
      <ContactForm />
    </div>
  );
};

export default BlogDetails;
