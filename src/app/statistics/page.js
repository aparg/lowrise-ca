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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Statistics for Townhomes in Brampton, ON
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">S.N.</th>
                <th className="py-2 px-4 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {dataFromThreeMonths.map((data, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 px-4">{idx + 1}</td>
                  <td className="py-1 px-4">
                    ${parseFloat(data.ListPrice).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Section */}
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Calculations</h2>
          <p className="text-lg mb-2">Total Properties: {totalProperties}</p>
          <p className="text-lg mb-2">
            Total Price: ${totalPrice.toLocaleString()}
          </p>
          {/* Mean Section */}
          <div className="mb-6 bg-slate-200 p-5 rounded-md">
            <h3 className="text-lg font-semibold">Mean Price</h3>

            <p className="text-lg mb-4">Mean Price: ${meanPrice}</p>
            <div className="border-t pt-2 mt-2">
              <h4 className="text-md font-semibold">Formula</h4>
              <p className="text-gray-700">
                <code>Mean Price = (Total Price) ÷ (Total Properties)</code>
              </p>
            </div>
          </div>

          {/* Median Section */}
          <div className="mb-6 bg-slate-200 p-5 rounded-md">
            <h3 className="text-lg font-semibold">Median Price</h3>
            <p className="text-lg mb-4">Median Price: ${medianPrice}</p>
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
            <h3 className="text-lg font-semibold">Standard Deviation</h3>
            <p className="text-lg mb-4">
              Standard Deviation: ${standardDeviation}
            </p>
            <div className="border-t pt-2 mt-2">
              <h4 className="text-md font-semibold">Formula</h4>
              <p className="text-gray-700">
                <code>σ = √(Σ(price - mean)² / N)</code>
              </p>
              <p className="text-gray-700 mt-1 italic">
                Calculate the squared differences from the mean, take their
                average, and then the square root to get the standard deviation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
