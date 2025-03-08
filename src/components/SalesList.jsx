"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

//HELPERS
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { ImSpinner } from "react-icons/im";

//COMPONENT

//SERVER
import { getFilteredRetsData } from "@/_resale-api/getSalesData";

//CONSTANT
import { saleLease, bedCount, houseType, homeText } from "@/constant";
import ResaleCard from "./ResaleCard";
import CreateSchema from "@/helpers/CreateSchema";
import PageSelector from "./PageSelector";
import BedroomLinks from "./BedroomLinks";

const SalesList = ({
  salesData,
  city,
  INITIAL_LIMIT = 10,
  setSalesData = () => {},
  offset = 0,
  setOffset = () => {},
  filterState = {
    saleLease: "",
    bed: "",
    priceRange: { min: 0, max: 0 },
    type: [],
    Basement: false,
    sepEntrance: false,
    washroom: false,
    priceDecreased: false,
  },
  openHouse = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const _getMergedHouseType = (state) => {
    let mergedHouseType = [];
    const selectedHouseType = Object.values(houseType).filter((type) =>
      state.type.includes(type.value)
    );
    for (const type of selectedHouseType) {
      if (type.value === null) {
        mergedHouseType = null;
        break;
      } else {
        mergedHouseType.push(type.value);
      }
    }
    return mergedHouseType;
  };

  const loadMoreSalesData = async () => {
    // Only include filter params if not in openHouse mode
    const queryParams = openHouse
      ? {
          offset,
          limit: INITIAL_LIMIT,
        }
      : {
          offset,
          limit: INITIAL_LIMIT,
          city: capitalizeFirstLetter(city),
          saleLease: Object.values(saleLease).filter(
            (state) => state.name === filterState.saleLease
          )[0]?.value,
          bed: Object.values(bedCount).find(
            (bedObj) => bedObj.name === filterState.bed
          )?.value,
          minListPrice: Number(filterState.priceRange?.min ?? 0),
          maxListPrice: Number(filterState.priceRange?.max ?? 0),
          houseType: _getMergedHouseType(filterState),
          Basement: filterState.Basement,
          sepEntrance: filterState.sepEntrance,
          washroom: filterState.washroom,
          priceDecreased: filterState.priceDecreased,
        };

    setIsLoading(true);
    const moreSalesListData = await getFilteredRetsData(queryParams);
    setSalesData([...moreSalesListData]);
    setOffset((prev) => prev + INITIAL_LIMIT);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (inView) {
  //     loadMoreSalesData();
  //   }
  // }, [inView]);

  const setPage = () => {
    setSalesData([]);
    setIsLoading(true);
    loadMoreSalesData();
  };
  // Only show property type related content if not in openHouse mode
  const propertyTypeName = !openHouse
    ? Object.values(houseType).find(
        (obj) =>
          obj?.value?.toLowerCase() === filterState?.houseType?.toLowerCase()
      )?.name
    : null;
  return (
    <>
      {salesData?.length > 0 ? (
        <>
          {salesData?.map((curElem, index) => {
            return (
              <div key={curElem.ListingKey}>
                <script
                  key={curElem.Address}
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(CreateSchema(curElem)),
                  }}
                />
                <ResaleCard curElem={curElem} openHouse={openHouse} />
              </div>
            );
            // }
            // return null
          })}
          {/* <div ref={ref} className="flex justify-center items-center w-100">
            {isLoading ? <ImSpinner size={24} /> : null}
          </div> */}
        </>
      ) : (
        <div className="w-full fs-4 text-center flex w-100 flex-col items-center col-span-full">
          <Image
            src="/no-record-found.jpg"
            width="500"
            height="500"
            alt="no record found"
          />
          <p>No Records Found</p>
        </div>
      )}
    </>
  );
};

export default SalesList;
