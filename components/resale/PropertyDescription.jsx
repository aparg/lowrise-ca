import formatCurrency from "@/helpers/formatCurrency";
import useDeviceView from "@/helpers/useDeviceView";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PropertyDescription = ({ main_data, fullAddress }) => {
  const { isMobileView } = useDeviceView();
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  const toggleShowMore = () => {
    setShowMoreDesc(!showMoreDesc);
  };

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [main_data.RemarksForClients]);

  const propertyDetails = [
    {
      label: "Property Type",
      value: main_data.PropertySubType || "N/A",
    },
    {
      label: "Lot Size",
      value: main_data.LotSizeRangeAcres
        ? `${main_data.LotSizeRangeAcres} acres`
        : "N/A",
    },
    {
      label: "Style",
      value: main_data.ArchitecturalStyle || "N/A",
    },
    {
      label: "Living Area",
      value: main_data.BuildingAreaTotal
        ? `${main_data.BuildingAreaTotal} sqft`
        : "N/A",
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-xl border">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            About This Property
          </h2>
          <p className="text-sm text-gray-600 mt-1">{fullAddress}</p>
        </div>

        <div
          ref={contentRef}
          className={`relative ${!showMoreDesc && "max-h-32"} overflow-hidden`}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            {main_data.RemarksForClients}
          </p>

          {!showMoreDesc && isOverflowing && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {isOverflowing && (
          <button
            onClick={toggleShowMore}
            className="mt-4 flex items-center gap-1 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors"
          >
            {showMoreDesc ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
          {propertyDetails.map((detail, index) => (
            <div key={index} className="space-y-1">
              <dt className="text-xs font-normal text-gray-500 uppercase tracking-wider">
                {detail.label}
              </dt>
              <dd className="text-sm font-normal text-gray-900">
                {detail.value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;
