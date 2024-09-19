import React from "react";

const page = async () => {
  const response = await fetch(
    "https://rets.dolphy.ca/residential/Properties/?$range=minTimestampSql=2024-06-19,maxTimestampSql=2024-09-19&$limit=10000"
  );
  const dataFromThreeMonthsJson = await response.json();
  const dataFromThreeMonths = dataFromThreeMonthsJson.results;
  const totalProperties = dataFromThreeMonths.length;
  return (
    <div>
      <table>
        <tr>
          <th>S.N.</th>
          <th>Price</th>
        </tr>
        {dataFromThreeMonths.map((data, idx) => {
          return (
            <tr key={data.MLS}>
              <td>{idx + 1}.</td>
              <td>{data.ListPrice}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default page;
