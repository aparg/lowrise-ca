import React from "react";

const NewsletterSignup = () => {
  return (
    <section className="py-12 bg-red-50 sm:py-16 lg:py-20 xl:py-24 mt-[10rem]">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-48">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Stay updated on Canada's homes market
            </h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-700 lg:text-lg lg:mt-6 lg:leading-8">
              Subscribe to our free weekly newsletter for the latest
              pre-construction projects, market insights, and exclusive offers
              across Canada.
            </p>

            <div className="mt-8 sm:mt-12 xl:mt-16">
              <p className="text-base font-semibold text-black">
                Trusted by 50k+ home buyers
              </p>
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base font-normal text-black">4.4/5</p>
                <p className="text-base font-normal text-gray-700">•</p>
                <p className="text-base font-normal text-gray-700">
                  3,841 Reviews
                </p>
              </div>
            </div>
          </div>

          <div>
            <form action="#" method="POST" className="space-y-5">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="block w-full px-6 py-4 text-base text-start text-gray-700 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:primary-green focus:outline-black"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-medium text-white transition-all duration-200 bg-primary-green border border-transparent rounded-xl "
              >
                Subscribe Now
              </button>
            </form>

            <p className="mt-5 text-sm font-normal text-center text-gray-700">
              Your email is secure and we don't send spam. See our privacy
              policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
