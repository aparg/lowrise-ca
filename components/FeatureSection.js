import Link from "next/link";

const FeatureCard = ({
  title,
  description,
  icon,
  link,
  bgColor = "bg-mint-50",
}) => (
  <Link
    href={link}
    className={`${bgColor} rounded-2xl p-8 transition-transform hover:-translate-y-1 group relative overflow-hidden`}
  >
    <div className="relative z-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        {description}
      </p>
      <span className="text-teal-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </div>
    <div className="absolute right-4 bottom-4 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
      {icon}
    </div>
  </Link>
);

const EstimateIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-teal-900">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-900">
    <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" />
    <path d="m16.511 16.511 5.489 5.489" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-green-900">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  </svg>
);

const FeatureSection = () => {
  return (
    <section className="px-4 md:px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="MyEstimate™"
            description="Find out how much your property is worth"
            link="/"
            bgColor="bg-mint-50"
          />
          <FeatureCard
            title="Search 2.0"
            description="Find homes by drive time"
            link="/"
            bgColor="bg-sky-50"
          />
          <FeatureCard
            title="Map View"
            description="Search for properties in preferred areas using a map"
            link="/"
            bgColor="bg-emerald-50"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
