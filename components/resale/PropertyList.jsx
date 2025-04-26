import Pagination from "@/components/resale/Pagination";
import ResaleCard from "./ResaleCard";

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
        {properties.map((property) => (
          <ResaleCard
            openHouse={openHouse}
            key={property.ListingKey}
            curElem={property}
            showDecreasedPrice={priceReduced}
          />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
