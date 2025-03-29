import Image from "next/image";
import UnifiedSearchBar from "@/components/UnifiedSearchBar";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative min-h-[92vh] w-full overflow-hidden">
      <div className="absolute z-0 inset-0 rounded-xl">
        <Image
          src="/homes.jpg"
          alt="Beautiful homes in Canada"
          fill
          className="object-cover rounded-xl"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 md:px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-6 animate-fade-in-down">
            <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block shadow-lg transform hover:scale-105 transition-transform">
              Updated Daily
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-7 leading-tight tracking-tight animate-fade-in">
            Canadian Home
            <br />
            you'll love to live
          </h1>

          {/* Search Container */}
          <div className="mt-8 w-full max-w-3xl mx-auto animate-fade-in-up">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
              <UnifiedSearchBar
                width="w-full"
                height="h-16"
                center={true}
                placeholder="Search by city or address (e.g., Toronto, 123 Main St)"
              />

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Link
                  href="/ontario/toronto/homes-for-sale"
                  className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full border border-transparent hover:border-emerald-500 hover:text-emerald-800 cursor-pointer transition-colors"
                >
                  Toronto
                </Link>
                <Link
                  href="/ontario/vancouver/homes-for-sale"
                  className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full border border-transparent hover:border-emerald-500 hover:text-emerald-800 cursor-pointer transition-colors"
                >
                  Vancouver
                </Link>
                <Link
                  href="/ontario/montreal/homes-for-sale"
                  className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full border border-transparent hover:border-emerald-500 hover:text-emerald-800 cursor-pointer transition-colors"
                >
                  Montreal
                </Link>
                <Link
                  href="/ontario/calgary/homes-for-sale"
                  className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full border border-transparent hover:border-emerald-500 hover:text-emerald-800 cursor-pointer transition-colors"
                >
                  Calgary
                </Link>
                <Link
                  href="/ontario/ottawa/homes-for-sale"
                  className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full border border-transparent hover:border-emerald-500 hover:text-emerald-800 cursor-pointer transition-colors"
                >
                  Ottawa
                </Link>
              </div>
            </div>

            <div className="mt-8 text-white/80 text-sm flex justify-center gap-8 animate-fade-in">
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <span className="text-emerald-400 font-bold">50,000+</span>{" "}
                Properties
              </span>
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <span className="text-emerald-400 font-bold">100+</span> Cities
              </span>
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <span className="text-emerald-400 font-bold">24/7</span> Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
