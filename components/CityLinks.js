import Link from "next/link";
import Heading from "@/components/design/Heading";

const CityLinks = () => {
  const cities = [
    {
      name: "Toronto",
      featured: true,
    },
    {
      name: "Mississauga",
      featured: true,
    },
    {
      name: "Brampton",
      featured: true,
    },
    {
      name: "Vaughan",
      featured: true,
    },
    {
      name: "Markham",
      featured: false,
    },
    {
      name: "Oakville",
      featured: false,
    },
    {
      name: "Burlington",
      featured: false,
    },
    {
      name: "Milton",
      featured: false,
    },
    {
      name: "Ajax",
      featured: false,
    },
    {
      name: "Pickering",
      featured: false,
    },
    {
      name: "Whitby",
      featured: false,
    },
    {
      name: "Oshawa",
      featured: false,
    },
    {
      name: "Calgary",
      featured: true,
    },
    {
      name: "Edmonton",
      featured: true,
    },
    {
      name: "Barrie",
      featured: false,
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <Heading
          align="center"
          color="#1a1a1a"
          highlightColor="#FF0000"
          subtitle="Explore new construction homes across Canada"
          maxWidth="800px"
          className="mb-8"
        >
          New Construction Homes in <span className="text-red-600">Canada</span>
        </Heading>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cities.map((city) => (
              <div
                key={city.name}
                className={`
                  bg-white p-5 rounded-xl transition-all`}
              >
                <div className="flex items-center mb-3">
                  <Link
                    href={`/${city.name.toLowerCase()}`}
                    className="block text-base font-semibold text-gray-900 hover:underline underline-offset-2 transition-colors"
                  >
                    New Construction in {city.name}
                  </Link>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/${city.name.toLowerCase()}/pre-construction/townhomes`}
                    className="block text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    New Construction Townhomes in {city.name}
                  </Link>
                  <Link
                    href={`/${city.name.toLowerCase()}/condos`}
                    className="block text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    New Construction Condos in {city.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityLinks;
