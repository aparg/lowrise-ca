import PropertyTax from "@/components/PropertyTax";
import React from "react";

export const metadata = {
  title: "Property Calculators | Lowrise.ca",
  description:
    "Use our calculators to estimate mortgage payments and property taxes for Ontario properties.",
  keywords: "property calculator, mortgage calculator, Ontario real estate",
};

const page = () => {
  return (
    <div className="container-fluid mt-2">
      <PropertyTax />
    </div>
  );
};

export default page;
