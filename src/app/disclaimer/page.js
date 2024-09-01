import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const page = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-[0_0_50px_#EE426680] shadow-xl rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Understanding Average Price Calculations for Resale Homes
          </h2>
          <ol className="list-decimal list-outside ml-6 space-y-6 marker:font-bold">
            <li>
              <h3 className="font-bold text-lg mb-2">
                How We Calculate the Average Price
              </h3>
              <p className="text-gray-600">
                The average prices on Lowrise.ca are calculated using sales data
                of properties within specific categories (Townhomes, Detached
                homes, Triplexes, and Duplexes) over a defined period. We take
                the total sum of sale prices and divide it by the number of
                properties to arrive at an average price, giving a general
                indication of market trends within each category.
              </p>
            </li>
            <li>
              <h3 className="font-bold text-lg mb-2">
                Number of Properties Considered
              </h3>
              <p className="text-gray-600">
                To provide reliable averages, we include a substantial number of
                property sales in our calculations. The sample size may vary
                depending on data availability for each category during the
                selected timeline. Larger sample sizes provide more
                representative average prices of current market conditions.
              </p>
            </li>
            <li>
              <h3 className="font-bold text-lg mb-2">
                Limitations of Average Price Data
              </h3>
              <p className="text-gray-600">
                Average prices can be influenced by various factors. Properties
                with unique features, exceptionally high or low sale prices, or
                those in particularly desirable or less desirable areas may skew
                the data. Consider these averages as general market indicators
                rather than precise reflections of every property's value.
              </p>
            </li>
            <li>
              <h3 className="font-bold text-lg mb-2">Timeline of Data</h3>
              <p className="text-gray-600">
                Average prices are based on sales data from the past [insert
                timeframe, e.g., "6 months," "12 months"]. This timeline
                accounts for recent market changes while providing a broad
                overview of price trends. Note that market conditions can change
                rapidly, and past averages may not accurately predict future
                prices.
              </p>
            </li>
            <li>
              <h3 className="font-bold text-lg mb-2">
                Accuracy of Calculations and User Responsibility
              </h3>
              <p className="text-gray-600">
                While we strive for accuracy in our calculations, data may
                sometimes be incomplete, outdated, or inaccurate. We strongly
                recommend users conduct their own research and consult with real
                estate professionals before making decisions based on
                information from Lowrise.ca. Our data should be used as a
                general guide rather than the sole basis for financial or real
                estate transactions.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default page;
