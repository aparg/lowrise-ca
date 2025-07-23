import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Testimonial from "@/components/Testimonial";
import CallToAction from "@/components/CallToAction";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";
import ResaleCitiesSection from "@/components/resale/ResaleCitiesSection";
import BestExperience from "@/components/BestExperience";
import FeatureSection from "@/components/FeatureSection";
import PriceDropSection from "@/components/VirtualTourSection";

// Metadata configuration
export const metadata = {
  metadataBase: new URL("https://lowrise.ca/"),
  title: "Lowrise - Canadian Home for Sale and Rent",
  description:
    "Lowrise is a Canadian real estate marketplace that allows you to find homes for sale and rent in Canada.",
  authors: [{ name: "Lowrise", email: "info@lowrise.ca" }],
  openGraph: {
    type: "website",
    title: "Lowrise - Canadian Home for Sale and Rent",
    description:
      "Lowrise is a Canadian real estate marketplace that allows you to find homes for sale and rent in Canada.",
    url: "https://lowrise.ca/",
    siteName: "Lowrise.ca",
    images: [{ url: "/lowriselogo.svg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://lowrise.ca/" },
};

// export default async function Home() {
//   return (
//     <>
//       <HeroSection />
//       <BestExperience />
//       <PriceDropSection />
//       <div className="my-10 md:my-20"></div>
//       <ResaleCitiesSection />
//       <div className="my-10 md:my-20"></div>
//       <HomebabaAdvantage />
//       <FeatureSection />
//       {/* <CommunityGive /> */}
//       <CallToAction />
//       <Testimonial
//         testimonialText="Lowrise has been a game changer for me. I've found the perfect low-rise property in just a few clicks."
//         authorName="Joshua"
//         authorPosition="Software Engineer"
//         authorRole="Canada"
//         companyLogo="/testmonials/J.png"
//       />
//       <div className="flex flex-col items-center mb-4 md:mb-5">
//         <Image
//           src="/contact-bottom-2.png"
//           alt="Real Estate Agent"
//           width={300}
//           height={300}
//           className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
//           priority
//         />
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
//           Looking for Your Perfect Home?
//         </h2>
//         <p className="text-gray-600 text-center text-sm md:text-base">
//           Let us help you find the perfect home that matches your lifestyle
//         </p>
//       </div>
//       <ContactForm />
//       <div className="my-10 md:my-32"></div>
//     </>
//   );
// }

export default function NotFound() {
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="container mx-auto text-center p-8 max-w-lg bg-white rounded-xl shadow-2xl my-20">
      <h1 className="text-6xl font-bold text-red-500 mb-4 animate-bounce">
        Not Found!
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved. Try
        searching or return to the homepage.
      </p>

      {/* <a
        href="/"
        className="inline-block bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-all"
      >
        Back to Homepage
      </a> */}
    </div>
  );
}
