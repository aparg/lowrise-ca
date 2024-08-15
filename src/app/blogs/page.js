import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchAllBlogPosts, fetchCities } from "@/api/blogs";
import BlogCard from "@/components/BlogCard";

export default async function Home() {
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blogs",
      href: null,
    },
  ];

  const blogPosts = await fetchAllBlogPosts();
  const cities = await fetchCities();

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      <main className="mx-auto py-1">
        <div className="flex overflow-x-auto space-x-2 mb-8 pb-4 scrollbar-hide">
          {cities.map((city, index) => (
            <button
              key={index}
              className={`px-6 py-0 rounded-full border transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                index === 0
                  ? "bg-primary-green text-white hover:bg-blue-600 focus:ring-primary-green"
                  : "bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <BlogCard data={post} key={post.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
