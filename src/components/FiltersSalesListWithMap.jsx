import { useState, useCallback, useEffect } from 'react';
import { useClientFilter } from "@/hooks/useClientFilter";
import { usePropertyCount } from "@/hooks/usePropertyCount";
import ResaleMapDrawer from './ResaleMapDrawer';
import FiltersSalesList from './FiltersSalesList';

const FiltersSalesListWithMap = ({ data, city }) => {
  const [showMap, setShowMap] = useState(false);
  const [geocodedProperties] = useState(() => new Map());
  const [isMapDataReady, setIsMapDataReady] = useState(false);
  const { filteredData, ...filterProps } = useClientFilter(data);
  const { propertyCount } = usePropertyCount(filteredData);

  const handleGeocodeComplete = useCallback((listingId, position) => {
    geocodedProperties.set(listingId, position);
  }, [geocodedProperties]);

  useEffect(() => {
    // Pre-fetch map data when component mounts
    if (filteredData?.length > 0 && !isMapDataReady) {
      setIsMapDataReady(true);
    }
  }, [filteredData, isMapDataReady]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {propertyCount} Properties Found
        </h1>
        <button
          onClick={() => setShowMap(true)}
          disabled={!isMapDataReady}
          className={`px-4 py-2 rounded ${
            isMapDataReady
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isMapDataReady ? 'Show Map' : 'Loading...'}
        </button>
      </div>

      <FiltersSalesList data={filteredData} {...filterProps} />

      <ResaleMapDrawer
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        properties={filteredData}
        city={city}
        isLoading={!isMapDataReady}
        geocodedProperties={geocodedProperties}
        onGeocodeComplete={handleGeocodeComplete}
      />
    </div>
  );
};

export default FiltersSalesListWithMap;
