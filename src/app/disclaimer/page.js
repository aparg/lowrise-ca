import React from "react";

const page = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      <h1 className="font-extrabold text-4xl my-4">
        Disclaimer: Understanding Average Price Calculations for Resale Homes
      </h1>
      <ol className="list-decimal">
        <li className="my-3">
          How We Calculate the Average Price The average prices displayed on
          Lowrise.ca are calculated using the sales data of properties within
          specific categories (Townhomes, Detached homes, Triplexes, and
          Duplexes) over a defined period. We take the total sum of the sale
          prices of all properties in a given category and divide it by the
          number of properties to arrive at an average price. This average gives
          a general indication of the market trend within each property
          category.{" "}
        </li>
        <li className="my-3">
          Number of Properties Considered To provide a reliable average, we
          include a substantial number of property sales in our calculations.
          The number of properties considered may vary depending on the
          availability of data for each category during the selected timeline.
          The larger the sample size, the more representative the average price
          is of the current market conditions.
        </li>
        <li className="my-3">
          Disclaimer: Limitations of Average Price Data While we strive to
          provide accurate data, it is important to note that average prices can
          be influenced by various factors. Certain properties, such as those
          with unique features, exceptionally high or low sale prices, or
          located in particularly desirable or less desirable areas, may skew
          the average price data. Therefore, the average prices provided should
          be considered as general market indicators rather than precise
          reflections of every property’s value.
        </li>
        <li className="my-3">
          Timeline of Data The average prices presented on Lowrise.ca are based
          on sales data from the past [insert timeframe, e.g., "6 months," "12
          months"]. This timeline allows us to account for recent market changes
          while providing a broad overview of price trends. Please note that
          market conditions can change rapidly, and past averages may not
          accurately predict future prices.
        </li>
      </ol>
    </div>
  );
};

export default page;
