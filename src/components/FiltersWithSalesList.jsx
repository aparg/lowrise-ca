"use client";
import React, { useEffect, useMemo, useState } from "react";

import SalesList from "./SalesList";
import Filters from "./Filters";

//HELPERS
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";

//CONSTANT
import { bedCount, saleLease, houseType, washroomCount } from "@/constant";
import { getFilteredRetsData } from "../api/getSalesData";
import useDeviceView from "@/helpers/useDeviceView";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { ImSpinner } from "react-icons/im";
import HotListings from "./HotListings";
import PageSelector from "./PageSelector";
import Image from "next/image";
// import FilterSubmit from "../FilterSubmit";

const FiltersWithSalesList = ({
  salesListData,
  INITIAL_LIMIT,
  city = undefined,
  requiredType = undefined,
  saleLeaseVal = undefined,
  filter,
}) => {
  // const leadEmail = user?.emailAddresses[0].emailAddress;

  const initialState = {
    saleLease:
      saleLease[
        Object.keys(saleLease).find((val) => val === saleLeaseVal) || "sale"
      ]?.name || saleLease.sale.name,
    bed: bedCount.any.name,
    priceRange: {
      min: 0,
      max: 0,
    },
    type:
      Object.values(houseType).find((val) => val.name === requiredType)?.name ||
      houseType.all.name,
    hasBasement: false,
    sepEntrance: false,
    washroom: washroomCount.any.value,
    priceDecreased: false,
  };

  const [filterState, setFilterState] = useState(null);
  const [salesData, setSalesData] = useState(salesListData);
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [selected, setSelected] = useState(1); //the page that is selected

  const { hotSales, remainingSales } = useMemo(() => {
    if (selected == 1) {
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the date and time 24 hours ago
      const twentyFourHoursAgo = new Date(
        currentDate.getTime() - 24 * 60 * 60 * 1000
      );

      // Function to check if the data is from 24 hours ago
      const is24HoursAgo = (timestampSql) => {
        const timestampDate = new Date(timestampSql);
        return (
          timestampDate > twentyFourHoursAgo && timestampDate <= currentDate
        );
      };

      // Separate sales data for 24 hours ago and remaining days
      const hotSales = [];
      const remainingSales = [];
      {
        console.log(salesData);
      }
      salesData?.forEach((data) => {
        if (is24HoursAgo(data.TimestampSql) && hotSales.length < 5) {
          hotSales.push(data);
        } else {
          remainingSales.push(data);
        }
      });
      console.log(hotSales, remainingSales);
      return { hotSales, remainingSales };
    } else {
      return { hotSales: [], remainingSales: salesData };
    }
  }, [salesData]);

  const _getMergedHouseType = (state) => {
    let mergedHouseType = [];
    const selectedHouseType = Object.values(houseType).filter((type) =>
      state.type.includes(type.name)
    );
    for (const type of selectedHouseType) {
      if (type.value === null) {
        mergedHouseType = null;
        break;
      } else {
        mergedHouseType.pop();
        mergedHouseType.push(type.value);
      }
      return mergedHouseType;
    }
  };

  const fetchFilteredData = async (
    params,
    limit = INITIAL_LIMIT,
    offset = 0
  ) => {
    const payload = {
      saleLease: Object.values(saleLease).find(
        (saleLeaseObj) => saleLeaseObj.name === params.saleLease
      )?.value,
      bed: Object.values(bedCount).find((bedObj) => bedObj.name === params.bed)
        ?.value,
      minListPrice: Number(params.priceRange?.min ?? 0),
      maxListPrice: Number(params.priceRange?.max ?? 0),
      houseType: _getMergedHouseType(params),
      hasBasement: params.hasBasement,
      sepEntrance: params.sepEntrance,
      washroom: params.washroom,
      priceDecreased: params.priceDecreased,
    };
    const queryParams = {
      limit: limit,
      offset: offset,
      city: capitalizeFirstLetter(city),
      ...payload,
    };
    console.log(queryParams);
    setLoading(true);
    // console.log(payload);
    const filteredSalesData = await getFilteredRetsData(queryParams);
    if (filteredSalesData?.length == 0) {
      setNoData(true);
    } else {
      setLoading(false);
      setSalesData(filteredSalesData);
      setOffset(offset);
    }
  };

  useEffect(() => {
    // store data in session storage whenever it changes
    if (isLocalStorageAvailable() && filterState) {
      localStorage.setItem("filterState", JSON.stringify(filterState));
      localStorage.setItem("selectedCity", capitalizeFirstLetter(city));
      /* console.log(JSON.stringify(filterState), city, "filterState");
      console.log(city); */
      // FilterSubmit(city, filterState, leadEmail);
    }

    if (window !== undefined) {
      window.scrollY = 0;
    }
  }, [filterState]);

  useEffect(() => {
    //component can be loaded in three ways, either it is provided a pre-defined filter, have a stored state or
    const storedState = localStorage.getItem("filterState");
    if (city || saleLeaseVal || requiredType) {
      fetchFilteredData(initialState);
      setFilterState(initialState);
    } else if (storedState) {
      const newFilterState = JSON.parse(storedState);
      setFilterState(newFilterState);
      fetchFilteredData(newFilterState);
    } else {
      setFilterState(initialState);
    }

    // fetchFilteredData(initialState);
  }, []);

  useEffect(() => {
    async function getUpdatedData() {
      console.log("the page was changed");
      await fetchFilteredData(
        {
          ...initialState,
        },
        20,
        selected * 20 - 20
      );
    }
    getUpdatedData();
  }, [selected]);

  return (
    <>
      {filterState && (
        <div className="">
          <h2
            className={`font-extrabold text-2xl ${
              isMobileView ? "pt-2" : "pt-2"
            }`}
          >
            {filter
              ? filter
              : city
              ? capitalizeFirstLetter(decodeURIComponent(city))
              : "Ontario"}{" "}
            Homes {filterState.saleLease} | Real Estate Updated Daily Listings
          </h2>
          <p
            className="text-sm mb-5 mt-1"
            style={isMobileView ? { fontSize: "0.9rem" } : {}}
          >
            Refine your{" "}
            <span className="text-capitalize">
              {city
                ? capitalizeFirstLetter(decodeURIComponent(city))
                : "Ontario"}
            </span>{" "}
            real estate search by price, bedroom, or type (house, townhouse, or
            condo). View up-to-date MLS® listings in{" "}
            <span className="text-capitalize">
              {city
                ? capitalizeFirstLetter(decodeURIComponent(city))
                : "Ontario"}
            </span>
            .
          </p>

          <div
            className="flex sticky top-0 z-[998] bg-white items-center w-full flex-wrap overflow-visible"
            id="filter"
          >
            <Filters {...{ filterState, setFilterState, fetchFilteredData }} />
          </div>

          {!loading ? (
            <>
              {selected === 1 && <HotListings salesData={hotSales} />}
              <div
                className={`${
                  isMobileView ? "pt-1" : "pt-3"
                } grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-0 gap-x-2 gap-y-4 md:gap-x-2 sm:gap-y-[40px]`}
              >
                <SalesList
                  {...{
                    city,
                    INITIAL_LIMIT,
                    salesData: remainingSales,
                    setSalesData,
                    offset,
                    setOffset,
                    filterState,
                  }}
                />
              </div>
              <div className="flex justify-center mt-10">
                <PageSelector
                  numberOfPages={40}
                  batchSize={3}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </>
          ) : noData ? (
            <div className="fs-4 text-center flex w-100 flex-col items-center">
              <Image
                src="/no-record-found.jpg"
                width="500"
                height="500"
                alt="no record found"
              />
              <p>No Records Found</p>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <ImSpinner size={24} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FiltersWithSalesList;
