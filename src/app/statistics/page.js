import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";

// Helper function to calculate the median
const calculateMedian = (prices) => {
  const sortedPrices = prices.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedPrices.length / 2);

  if (sortedPrices.length % 2 === 0) {
    // If even number of prices, return the average of the two middle values
    return (
      (sortedPrices[middleIndex - 1] + sortedPrices[middleIndex]) /
      2
    ).toFixed(2);
  } else {
    // If odd, return the middle value
    return sortedPrices[middleIndex].toFixed(2);
  }
};

// Helper function to calculate standard deviation
const calculateStandardDeviation = (prices, mean) => {
  const squaredDifferences = prices.map((price) => Math.pow(price - mean, 2));
  const avgSquaredDifference =
    squaredDifferences.reduce((acc, curr) => acc + curr, 0) / prices.length;
  return Math.sqrt(avgSquaredDifference).toFixed(2);
};

const page = async () => {
  const response = await fetch(
    "https://rets.dolphy.ca/residential/Properties/?$limit=1000&$range=minTimestampSql=2024-06-20&$select=Municipality=Brampton,TypeOwnSrch=.A.,SaleLease=Sale"
  );
  const dataFromThreeMonthsJson = await response.json();
  const dataFromThreeMonths = dataFromThreeMonthsJson.results;

  const prices = dataFromThreeMonths.map((property) =>
    parseFloat(property.ListPrice)
  );
  const totalProperties = prices.length;
  const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
  const meanPrice = (totalPrice / totalProperties).toFixed(2);

  const medianPrice = calculateMedian(prices);
  const standardDeviation = calculateStandardDeviation(prices, meanPrice);
  const basisClass =
    dataFromThreeMonths.length > 4
      ? "basis-1/4"
      : `basis-1/${Math.ceil(dataFromThreeMonths.length / 60)}`;
  const minPrice = Math.min(...prices);
  const minPriceIndex = prices.indexOf(minPrice);
  const maxPrice = Math.max(...prices);
  const maxPriceIndex = prices.indexOf(maxPrice);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-left">
        Statistics for Townhomes in Brampton, ON
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table Section */}
        <div className="flex flex-row justify-around rounded-md overflow-hidden">
          {Array(Math.ceil(dataFromThreeMonths.length / 60))
            .fill()
            .map((_, columnIndex) => (
              <div className={basisClass} key={columnIndex}>
                <div className="bg-white p-0 h-fit-content">
                  <table
                    className={`min-w-full ${
                      columnIndex % 2 == 0 ? "bg-gray-400" : "bg-gray-200"
                    } overflow-hidden border-0`}
                  >
                    <thead className="">
                      <tr>
                        <th className="py-[1.5px] px-1 text-left text-md border-b-1 border-black">
                          S.N.
                        </th>
                        <th className="py-[1.5px] px-1 text-left text-md border-b-1 border-black">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataFromThreeMonths
                        .slice(columnIndex * 60, (columnIndex + 1) * 60)
                        .map((data, idx) => (
                          <tr key={idx + columnIndex * 60} className="border-b">
                            <td className="py-[1px] px-1 text-xs">
                              {idx + 1 + columnIndex * 60}
                            </td>
                            <td className="py-[1px] px-1 text-xs">
                              ${parseFloat(data.ListPrice).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>

        {/* Calculation Section */}
        <div>
          <div className="bg-gray-50 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Calculations</h2>
            <p className="text-lg mb-2">
              Total Properties: Sample {totalProperties}
            </p>
            {/* <p className="text-lg mb-2">
              Total Price: ${totalPrice.toLocaleString()}
            </p> */}
            {/* Mean Section */}
            <div className="mb-6 bg-slate-200 p-5 rounded-md">
              <h3 className="text-lg font-semibold">
                Average Pricing for townhomes in Brampton
              </h3>

              <p className="text-lg mb-4">
                Average Price: ${parseFloat(meanPrice).toLocaleString()}
              </p>
              <div className="border-t pt-2 mt-2">
                <h4 className="text-md font-semibold">Formula</h4>
                <p className="text-gray-700">
                  <code>
                    Average Price = (Total Price) ÷ (Total Properties)
                  </code>
                </p>
              </div>
            </div>

            {/* Median Section */}
            <div className="mb-6 bg-slate-200 p-5 rounded-md">
              <h3 className="text-lg font-semibold">
                Median Price for townhomes in Brampton
              </h3>
              <p className="text-lg mb-4">
                Median Price: ${parseFloat(medianPrice).toLocaleString()}
              </p>
              <div className="border-t pt-2 mt-2">
                <h4 className="text-md font-semibold">Formula</h4>
                <p className="text-gray-700">
                  <code>Median = Middle value when prices are sorted</code>
                </p>
                <p className="text-gray-700 mt-1 italic">
                  If the number of properties is odd, the median is the middle
                  value. If even, it's the average of the two middle values.
                </p>
              </div>
            </div>

            {/* Standard Deviation Section */}
            <div className="mb-6 bg-slate-200 p-5 rounded-md">
              <h3 className="text-lg font-semibold">
                Standard Deviation for townhomes in Brampton
              </h3>
              <p className="text-lg mb-4">
                Standard Deviation: $
                {parseFloat(standardDeviation).toLocaleString()}
              </p>
              <div className="border-t pt-2 mt-2">
                <h4 className="text-md font-semibold">Formula</h4>
                <p className="text-gray-700">
                  <code>σ = √(Σ(price - mean)² / N)</code>
                </p>
                <p className="text-gray-700 mt-1 italic">
                  Calculate the squared differences from the mean, take their
                  average, and then the square root to get the standard
                  deviation.
                </p>
              </div>
            </div>

            {/* Cheapest and Most expensive */}
            <div className="mb-6 bg-slate-200 p-5 rounded-md">
              <h3 className="text-lg font-semibold">
                Cheapest and Most expensive townhomes in Brampton
              </h3>
              <p className="text-lg mt-4">
                <span className="font-medium">Cheapest:</span>
                <br />
                {dataFromThreeMonths[minPriceIndex].Address},{" "}
                {dataFromThreeMonths[maxPriceIndex].Municipality}, Ontario{" "}
                <Link
                  href={generateURL({
                    listingIDVal: dataFromThreeMonths[minPriceIndex].MLS,
                    cityVal: dataFromThreeMonths[minPriceIndex].Municipality,
                  })}
                  className="underline text-blue-600 text-sm hover:text-blue-800 inline-flex items-center ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Now
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
                <br />
                Price: ${minPrice.toLocaleString()}
              </p>
              <p className="text-lg mt-4 mb-4">
                <span className="font-medium">Most Expensive:</span>
                <br />
                {dataFromThreeMonths[maxPriceIndex].Address},{" "}
                {dataFromThreeMonths[maxPriceIndex].Municipality}, Ontario{" "}
                <Link
                  href={generateURL({
                    listingIDVal: dataFromThreeMonths[maxPriceIndex].MLS,
                    cityVal: dataFromThreeMonths[maxPriceIndex].Municipality,
                  })}
                  className="underline text-blue-600 text-sm hover:text-blue-800 inline-flex items-center ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Now
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
                <br />
                Price: ${maxPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
