import React from "react";

const CityCard = ({ name, imageUrl }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg group">
    <img
      src={imageUrl}
      alt={`${name} cityscape`}
      className="object-cover transition-transform duration-300 group-hover:scale-110 h-[250px] w-full"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
      {name}
    </h3>
  </div>
);

const CanadianCitiesShowcase = () => {
  const cities = [
    { name: "Toronto", imageUrl: "/images/toronto.jpg" },
    { name: "Vancouver", imageUrl: "/images/vancouver.jpg" },
    { name: "Montreal", imageUrl: "/images/montreal.jpg" },
    { name: "Calgary", imageUrl: "/images/calgary.jpg" },
    { name: "Ottawa", imageUrl: "/images/ottawa.jpg" },
    { name: "Edmonton", imageUrl: "/images/edmonton.jpg" },
  ];

  return (
    <div className="my-[10rem]">
      <div className="mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 mt-10">
          Where are you <span className="text-primary-green">moving to</span>
          <span className="text-primary-green relative">
            ?
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-gretext-primary-green rounded"></span>
          </span>
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore top cities across Canada
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <CityCard
              key={city.name}
              name={city.name}
              imageUrl={city.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanadianCitiesShowcase;
