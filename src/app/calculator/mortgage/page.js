import MortgageCalculator from "@/components/MortgageCalculator";
import React from "react";

export const metadata = {
  title: "Mortgage Calculator | Lowrise.ca",
  description:
    "Calculate your potential mortgage payments for properties in Ontario.",
  keywords: "mortgage calculator, Ontario mortgages, home loan estimator",
};

const page = () => {
  return (
    <div className="container-fluid mt-2">
      <MortgageCalculator price="" />
    </div>
  );
};

export default page;
