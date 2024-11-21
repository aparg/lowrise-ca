"use server";
import { commercial, residential } from "./routes/fetchRoutes";
// import { houseType, saleLease } from "@/constant";

export const getSalesData = async (offset, limit, city, listingType) => {
  try {
    let selectQuery = `${
      city && `Municipality=${city || ""},`
    }SaleLease='Sale'`;
    const lowriseOnly = `TypeOwnSrch='.S.',TypeOwnSrch='.D.',TypeOwnSrch='.A.',TypeOwnSrch='.J.',TypeOwnSrch='.K.'`;
    const queriesArray = [
      `$select=${selectQuery}`,
      `$skip=${offset}`,
      `$limit=${limit}`,
      `$selectOr=${lowriseOnly}`,
    ];

    const url = residential.properties.replace(
      "$query",
      `?${queriesArray.join("&")}`
    );
    const options = {
      method: "GET",
    };

    if (listingType) {
      selectQuery += `,TypeOwnSrch=${listingType}`;
    }
    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    throw new Error(`An error happened in getSalesData: ${error}`);
  }
};

// export const getFilteredRetsData = async (queryParams) => {
//   try {
//     //all the necessary queries possible
//     let selectQuery = `${
//       queryParams.city ? `Municipality=${queryParams.city}` : ""
//     }${
//       queryParams.saleLease
//         ? `${queryParams.city ? "," : ""}SaleLease=${queryParams.saleLease}`
//         : ""
//     }${
//       queryParams.bed
//         ? `${queryParams.bed ? "," : ""}Bedrooms=${queryParams.bed}`
//         : ""
//     }`;
//     const skipQuery = `${queryParams.offset}`;
//     const limitQuery = `${queryParams.limit}`;
//     let rangeQuery = `minListPrice=${queryParams.minListPrice},minWashrooms=${queryParams.washroom}`;
//     let selectOrQuery = "";

//     if (queryParams.houseType) {
//       const houseTypeQuery = `,TypeOwnSrch='value'`;
//       queryParams.houseType.forEach((param, index) => {
//         if (param === houseType.condo.value) {
//           selectQuery += `,PropertyType='${param}'`;
//         } else selectQuery += houseTypeQuery.replace("value", param);

//         if (index !== queryParams.houseType.length - 1) {
//           selectQuery += ",";
//         }
//       });
//     }

//     if (queryParams.hasBasement) {
//       selectQuery += `,Basement1=Apartment`;
//     }

//     if (queryParams.sepEntrance) {
//       selectQuery += `,Basement2=Sep Entrance`;
//     }
//     if (queryParams.maxListPrice > queryParams.minListPrice) {
//       rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
//     }

//     if (queryParams.priceDecreased) {
//       selectQuery += `,PriceDecreased=true`;
//     }
//     const url = residential.properties.replace(
//       "$query",
//       `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}&$selectOr=${selectOrQuery}`
//     );

//     // console.log(url);
//     const options = {
//       method: "GET",
//       cache: "no-store",
//     };
//     const res = await fetch(url, options);
//     const data = await res.json();
//     return data.results;
//   } catch (error) {
//     throw new Error(`An error happened: ${error}`);
//   }
// };

//for portfolio
export const getFilteredRetsData = async (queryParams) => {
  const lowriseOnly = `TypeOwnSrch='.S.',TypeOwnSrch='.D.',TypeOwnSrch='.A.',TypeOwnSrch='.J.',TypeOwnSrch='.K.'`;
  try {
    //all the necessary queries possible
    let selectQuery = `${
      queryParams.city ? `Municipality=${queryParams.city}` : ""
    }${
      queryParams.saleLease
        ? `${queryParams.city ? "," : ""}SaleLease=${queryParams.saleLease}`
        : ""
    }${
      queryParams.bed
        ? `${queryParams.bed ? "," : ""}Bedrooms=${queryParams.bed}`
        : ""
    }`;
    const skipQuery = `${queryParams.offset}`;
    const limitQuery = `${queryParams.limit}`;
    let rangeQuery =
      queryParams.minListPrice || queryParams.washroom
        ? `minListPrice=${queryParams.minListPrice},minWashrooms=${queryParams.washroom}`
        : "";
    let selectOrQuery = lowriseOnly;

    if (queryParams.houseType) {
      const houseTypeQuery = `,TypeOwnSrch='value'`;
      queryParams.houseType.forEach((param, index) => {
        selectQuery += houseTypeQuery.replace("value", param);
        if (index !== queryParams.houseType.length - 1) {
          selectQuery += ",";
        }
      });
    }

    if (queryParams.hasBasement) {
      selectQuery += `,Basement1=Apartment`;
    }

    if (queryParams.sepEntrance) {
      selectQuery += `,Basement2=Sep Entrance`;
    }
    if (queryParams.maxListPrice > queryParams.minListPrice) {
      rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
    }

    if (queryParams.priceDecreased) {
      selectQuery += `,PriceDecreased=true`;
    }
    let url = "";

    if (queryParams.propertyType == "commercial") {
      url = commercial.properties.replace(
        "$query",
        `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}&$selectOr=${selectOrQuery}`
      );
    } else {
      url = residential.properties.replace(
        "$query",
        `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}&$selectOr=${selectOrQuery}`
      );
    }
    const options = {
      method: "GET",
      // cache: "no-store",
    };
    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(`An error happened in getFilteredRetsData: ${error}`);
  }
};

export const fetchDataFromMLS = async (listingID, statsOnly = false) => {
  const options = {
    method: "GET",
  };
  const queriesArray = [`$select=MLS=${listingID}`];
  const urlToFetchMLSDetail = residential.properties.replace(
    "$query",
    `?${queriesArray.join("&")}`
  );

  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();

  return data.results[0];
};

export const fetchStatsFromMLS = async ({
  listingType,
  municipality,
  saleLease,
}) => {
  const options = {
    method: "GET",
  };
  const queriesArray = [
    `$select=Municipality=${municipality},TypeOwnSrch=${listingType},SaleLease=${saleLease}`,
    `$metrics=avg,median,sd`,
  ];
  const urlToFetchMLSDetail = residential.statistics.replace(
    "$query",
    `?${queriesArray.join("&")}`
  );
  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();

  return data.results;
};
