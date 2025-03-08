export async function getPropertiesAnalytics({
  city,
  propertySubType,
  minBeds,
  minBaths,
  minPrice,
  maxPrice,
  transactionType,
  ...searchParams
}) {
  const baseUrl = "https://query.ampre.ca/odata/".replace(/;$/, "");

  // Build filter string
  const filterClauses = [];

  // Base filters
  filterClauses.push("ContractStatus eq 'Available'");

  // Transaction Type
  if (transactionType) {
    filterClauses.push(`TransactionType eq '${transactionType}'`);
  }

  // City
  if (city) {
    filterClauses.push(`contains(UnparsedAddress, '${city}')`);
  }

  if (propertySubType) {
    filterClauses.push(`PropertySubType eq '${propertySubType}'`);
  }

  // Add bed and bath filters
  if (minBeds) {
    filterClauses.push(`BedroomsTotal ge ${minBeds}`);
  }

  // Only select the fields we need for analytics
  const queryString = [
    `$filter=${filterClauses.join(" and ")}`,
    `$select=ListingKey,ListPrice,PropertySubType,BedroomsTotal,BathroomsTotalInteger,OriginalEntryTimestamp`, // Minimal fields
    `$count=true`,
    `$top=50000`,
    `$skip=0`,
  ].join("&");

  const url = `${baseUrl}Property?${queryString}`;

  /* console.log(url); */

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.BEARER_TOKEN_FOR_API,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      properties: data.value,
      total: data["@odata.count"] || 0,
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return {
      properties: [],
      total: 0,
    };
  }
}
