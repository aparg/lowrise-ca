"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import formatCurrency from "@/helpers/formatCurrency";

const FAQ = ({ main_data }) => {
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ") || "Not specified";
    }
    return value || "Not specified";
  };

  const questions = [
    {
      question: "What are the key features of this property?",
      answer: () => (
        <div className="space-y-2">
          <p>This {main_data.PropertySubType.toLowerCase()} offers:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>{main_data.BedroomsTotal} bedrooms</li>
            <li>{main_data.BathroomsTotalInteger} bathrooms</li>
            <li>{main_data.BuildingAreaTotal} square feet of living space</li>
            {main_data?.PropertyFeatures?.length > 0 && (
              <li>Features: {formatValue(main_data.PropertyFeatures)}</li>
            )}
          </ul>
        </div>
      ),
    },
    {
      question: "What are the parking and garage details?",
      answer: () => (
        <div className="space-y-2">
          <p>The property includes:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>{main_data.ParkingSpaces || 0} total parking spaces</li>
            {main_data.GarageType && (
              <li>Garage Type: {main_data.GarageType}</li>
            )}
            {main_data.GarageParkingSpaces && (
              <li>{main_data.GarageParkingSpaces} garage spaces</li>
            )}
            {main_data.ParkingFeatures && (
              <li>
                Additional features: {formatValue(main_data.ParkingFeatures)}
              </li>
            )}
          </ul>
        </div>
      ),
    },
    {
      question: "What are the heating and cooling systems?",
      answer: () => (
        <div className="space-y-2">
          <ul className="list-disc pl-4 space-y-1">
            {main_data.Cooling && (
              <li>Cooling: {formatValue(main_data.Cooling)}</li>
            )}
            {main_data.HeatType && <li>Heat Type: {main_data.HeatType}</li>}
            {main_data.HeatSource && (
              <li>Heat Source: {main_data.HeatSource}</li>
            )}
          </ul>
        </div>
      ),
    },
    {
      question: "Are there any maintenance fees or association fees?",
      answer: () => (
        <div className="space-y-2">
          {main_data.AssociationFee ? (
            <>
              <p>
                Yes, the maintenance fee is $
                {formatCurrency(main_data.AssociationFee)}.
              </p>
              {main_data.AssociationFeeIncludes && (
                <div>
                  <p className="font-medium mt-2">This fee includes:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {Array.isArray(main_data.AssociationFeeIncludes) ? (
                      main_data.AssociationFeeIncludes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>{main_data.AssociationFeeIncludes}</li>
                    )}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p>
              No maintenance or association fees are specified for this
              property.
            </p>
          )}
        </div>
      ),
    },
    {
      question: "What are the basement details?",
      answer: () => (
        <div>
          {main_data.Basement && main_data.Basement.length > 0 ? (
            <p>
              The property includes a basement with the following features:{" "}
              {formatValue(main_data.Basement)}
            </p>
          ) : (
            <p>This property does not have a basement.</p>
          )}
        </div>
      ),
    },
    {
      question: "What utilities and systems are available?",
      answer: () => (
        <div className="space-y-2">
          <ul className="list-disc pl-4 space-y-1">
            {main_data.WaterSource && (
              <li>Water Source: {formatValue(main_data.WaterSource)}</li>
            )}
            {main_data.Sewers && <li>Sewer System: {main_data.Sewers}</li>}
            {main_data.LaundryFeatures && (
              <li>Laundry: {formatValue(main_data.LaundryFeatures)}</li>
            )}
          </ul>
        </div>
      ),
    },
    {
      question: "What are the construction details?",
      answer: () => (
        <div className="space-y-2">
          <ul className="list-disc pl-4 space-y-1">
            {main_data.ConstructionMaterials && (
              <li>
                Construction Materials:{" "}
                {formatValue(main_data.ConstructionMaterials)}
              </li>
            )}
            {main_data.AssessmentYear && (
              <li>Year Built: {main_data.AssessmentYear}</li>
            )}
            {main_data.ArchitecturalStyle && (
              <li>Style: {main_data.ArchitecturalStyle}</li>
            )}
          </ul>
        </div>
      ),
    },
    {
      question: "What is the exact location and orientation?",
      answer: () => (
        <div className="space-y-2">
          <p>
            The property is located at{" "}
            {main_data.UnparsedAddress ||
              `${main_data.StreetNumber} ${main_data.StreetName} ${main_data.StreetSuffix}`}
            .
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {main_data.DirectionFaces && (
              <li>Faces: {main_data.DirectionFaces}</li>
            )}
            {main_data.CrossStreet && (
              <li>Cross Street: {main_data.CrossStreet}</li>
            )}
            {main_data.Area && <li>Area: {main_data.Area}</li>}
          </ul>
        </div>
      ),
    },
    {
      question: "Is there a virtual tour available?",
      answer: () => (
        <div>
          {main_data.VirtualTourURLBranded ? (
            <p>
              Yes, you can view the virtual tour{" "}
              <a
                href={main_data.VirtualTourURLBranded}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                here
              </a>
              .
            </p>
          ) : (
            <p>No virtual tour is currently available for this property.</p>
          )}
        </div>
      ),
    },
    {
      question: "What is the current status of this property?",
      answer: () => (
        <div className="space-y-2">
          <p>
            This property is currently{" "}
            {main_data.Status === "A" ? "Active" : "Inactive"} on the market.
            Last updated:{" "}
            <span className="font-medium">
              {new Date(main_data.OriginalEntryTimestamp).toLocaleDateString()}
            </span>
          </p>
          {main_data.ListPrice && (
            <p className="mt-2">
              List Price:{" "}
              <span className="font-medium">
                ${formatCurrency(main_data.ListPrice)}
              </span>
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-12 w-full">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50 transition-all duration-200 hover:bg-gray-100/50"
              >
                <AccordionTrigger className="text-left hover:no-underline px-4 sm:px-6 py-4">
                  <span className="text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors pr-8">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-gray-600 px-4 sm:px-6 pb-6 pt-2">
                  {item.answer()}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Can't find what you're looking for? Contact our support team for
              more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
