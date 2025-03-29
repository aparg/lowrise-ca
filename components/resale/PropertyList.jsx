import Pagination from "@/components/resale/Pagination";
import ResaleCard from "./ResaleCard";
import AlbertaResaleCard from "./AlbertaResaleCard";

export default function PropertyList({
  properties,
  total,
  currentPage,
  totalPages,
  openHouse,
  priceReduced,
  province = "ontario",
}) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-y-3">
        {province == "ontario" &&
          properties.map((property) => (
            <ResaleCard
              openHouse={openHouse}
              key={property.ListingKey}
              curElem={property}
              showDecreasedPrice={priceReduced}
            />
          ))}
        {province == "alberta" &&
          properties.map((property) => (
            <AlbertaResaleCard key={property.ListingId} curElem={property} />
          ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
