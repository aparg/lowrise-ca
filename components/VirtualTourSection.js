import Image from "next/image";
import Link from "next/link";
import { TrendingDown, MapPin, ArrowRight } from "lucide-react";

const CityChip = ({ city, count }) => (
  <Link
    href={`/ontario/${city.toLowerCase()}/price-dropped`}
    className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full transition-all group"
  >
    <MapPin className="w-4 h-4" />
    <span>{city}</span>
    <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
      {count}
    </span>
  </Link>
);

const PriceDropSection = () => {
  const cities = [
    { name: "Toronto", count: "156" },
    { name: "Mississauga", count: "89" },
    { name: "Brampton", count: "124" },
    { name: "Milton", count: "67" },
    { name: "Oakville", count: "93" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-6 gap-4 p-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="relative">
              <div className="w-2 h-2 bg-white/10 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="text-black">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-normal bg-white shadow-large px-3 py-1 rounded-full flex items-center gap-2">
                <TrendingDown className="w-6 h-6" />
                Price Dropped Homes
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-[7rem]">
              your dream home might just be more affordable
            </h2>
            <p className="text-slate-800 text-lg mb-8">
              Discover properties that have recently dropped in price.
            </p>

            {/* City Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {cities.map((city) => (
                <CityChip key={city.name} city={city.name} count={city.count} />
              ))}
            </div>

            <Link
              href="/ontario/price-dropped"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-normal hover:bg-emerald-600 transition-colors group"
            >
              View all price drops
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Image Area */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 rounded-2xl" />
              <Image
                src="/priced.avif"
                alt="Price dropped home preview"
                fill
                className="object-cover rounded-2xl"
              />

              {/* Price Drop Tags */}
              {[
                { top: "20%", left: "20%", price: "-$50,000" },
                { top: "30%", right: "20%", price: "-$35,000" },
                { bottom: "30%", left: "30%", price: "-$42,000" },
              ].map((tag, index) => (
                <div
                  key={index}
                  className="absolute z-20 animate-bounce-slow"
                  style={tag}
                >
                  <div className="bg-emerald-500 text-white px-3 py-1 rounded-2xl text-sm font-normal shadow-lg flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    {tag.price}
                  </div>
                </div>
              ))}

              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-white text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-300">
                      529
                    </div>
                    <div className="text-xs">Price Drops</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-300">
                      15%
                    </div>
                    <div className="text-xs">Avg. Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-300">
                      24h
                    </div>
                    <div className="text-xs">Last Updated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceDropSection;
