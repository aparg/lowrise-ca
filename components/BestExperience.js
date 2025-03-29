import React from "react";
import Image from "next/image";

const BestExperience = () => {
  return (
    <div className="rounded-lg py-16 px-6 md:px-16 my-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
        {/* Phone Image - Left Side */}
        <div className="md:w-2/5 flex justify-center">
          <div className="relative w-60 md:w-64 lg:w-72">
            <Image
              src="/lowrise-screenshot.webp"
              alt="Lowrise mobile app"
              width={288}
              height={576}
              className="rounded-3xl shadow-md"
              priority
            />
          </div>
        </div>

        {/* Content - Right Side */}
        <div className="md:w-3/5 max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            A better experience
          </h2>
          <p className="text-md text-gray-600 max-w-md mb-7 mt-2 leading-normal">
            The lowrise platform offers a seamless homebuying search experience.
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Advanced Filters",
                description: "Refine your search with precision",
                icon: "✓",
              },
              {
                title: "Personalized Recommendations",
                description: "Find homes tailored to your needs",
                icon: "✓",
              },
              {
                title: "Real-Time Alerts",
                description: "Stay updated on pricing and availability",
                icon: "✓",
              },
              {
                title: "Virtual Tours & Online Applications",
                description: "Explore and secure your home effortlessly",
                icon: "✓",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white">
                    {feature.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-black hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-md transition duration-200 mt-10">
            Explore Homes in Ontario
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestExperience;
