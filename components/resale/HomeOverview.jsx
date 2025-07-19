"use client";
import useDeviceView from "@/helpers/useDeviceView";
import React, { useState } from "react";
import TimeAgo from "./TimeAgo";
import Link from "next/link";
import formatCurrency from "@/helpers/formatCurrency";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const HomeOverview = ({ main_data }) => {
  const { isMobileView } = useDeviceView();
  const [collapse, setCollapse] = useState(true);

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ") || "N/A";
    }
    return value || "N/A";
  };

  const sections = [
    {
      title: "Basic Information",
      alwaysShow: true,
      items: [
        {
          label: "Last Updated",
          value: (
            <TimeAgo modificationTimestamp={main_data.OriginalEntryTimestamp} />
          ),
        },
        {
          label: "Virtual Tour",
          value: main_data?.VirtualTourURLBranded ? (
            <Link
              href={main_data.VirtualTourURLBranded}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              View Tour <ExternalLink className="w-3 h-3" />
            </Link>
          ) : (
            "N/A"
          ),
        },
        { label: "Basement", value: formatValue(main_data?.Basement) },
        {
          label: "Building Size",
          value: main_data.BuildingAreaTotal
            ? `${main_data.BuildingAreaTotal} sqft`
            : "N/A",
        },
        {
          label: "Status",
          value: main_data.Status === "A" ? "Active" : "In-Active",
        },
        { label: "Property Type", value: main_data.PropertySubType },
        {
          label: "Maintenance Fee",
          value: main_data?.AssociationFee
            ? `$${formatCurrency(main_data.AssociationFee)}`
            : "N/A",
        },
        { label: "Year Built", value: main_data.AssessmentYear || "N/A" },
      ],
    },
    {
      title: "Interior Details",
      items: [
        { label: "Total Bathrooms", value: main_data.BathroomsTotalInteger },
        { label: "Full Baths", value: main_data.BathroomsTotalInteger },
        { label: "Above Grade Bedrooms", value: main_data.RoomsAboveGrade },
        {
          label: "Total Rooms",
          value:
            Number(main_data.RoomsAboveGrade) +
            Number(main_data.RoomsBelowGrade),
        },
        {
          label: "Family Room",
          value: main_data?.DenFamilyroomYN ? "Yes" : "No",
        },
        { label: "Laundry", value: formatValue(main_data?.LaundryFeatures) },
      ],
    },
    {
      title: "Exterior Features",
      items: [
        {
          label: "Construction",
          value: formatValue(main_data?.ConstructionMaterials),
        },
        {
          label: "Other Structures",
          value: formatValue(main_data?.OtherStructures),
        },
        {
          label: "Garage Spaces",
          value: main_data.GarageParkingSpaces || "N/A",
        },
        { label: "Parking Spaces", value: main_data.ParkingSpaces || "N/A" },
        {
          label: "Parking Features",
          value: formatValue(main_data?.ParkingFeatures),
        },
        { label: "Garage Type", value: main_data.GarageType || "N/A" },
      ],
    },
    {
      title: "Systems & Utilities",
      items: [
        { label: "Cooling", value: formatValue(main_data?.Cooling) },
        { label: "Heat Source", value: main_data?.HeatSource },
        { label: "Heat Type", value: main_data?.HeatType },
        { label: "Sewers", value: main_data?.Sewers },
        { label: "Water Source", value: formatValue(main_data?.WaterSource) },
      ],
    },
    {
      title: "Location & Community",
      items: [
        { label: "Area", value: main_data.Area },
        {
          label: "Community Features",
          value: formatValue(main_data?.PropertyFeatures),
        },
        { label: "Direction Faces", value: main_data.DirectionFaces },
        { label: "Cross Street", value: main_data.CrossStreet },
      ],
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-xl border">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Home Overview
        </h2>

        <div className="space-y-8">
          {sections.map(
            (section, index) =>
              (!collapse || section.alwaysShow) && (
                <div key={index} className="space-y-4">
                  <h3 className="text-sm font-normal text-gray-900 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between py-2 border-b border-gray-100"
                      >
                        <dt className="text-sm text-gray-500">{item.label}</dt>
                        <dd className="text-sm font-normal text-gray-900 text-right">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        <button
          onClick={() => setCollapse(!collapse)}
          className="mt-6 flex items-center gap-1 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors"
        >
          {collapse ? (
            <>
              Show More Details <ChevronDown className="w-4 h-4" />
            </>
          ) : (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomeOverview;
