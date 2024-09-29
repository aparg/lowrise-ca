"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

const Map = ({ main_data }) => {
  const [isMounted, setIsMounted] = useState(false);

  const [state, setState] = useState({
    lat: null,
    lon: null,
  });
  const ACCESS_TOKEN =
    "pk.eyJ1IjoiZG9scGh5bWFwYm94IiwiYSI6ImNscTYwcXR5YTBqcG4yam51NDFtbTZkbjcifQ.BXRuDHFFdtNdKyhduH3icA";
  async function getLatLongForMap(listDetail) {
    const { Street, StreetAbbreviation, StreetName, Area, Province } =
      listDetail;
    const fullAddressForMap = encodeURIComponent(
      `${StreetName} ${StreetAbbreviation}, ${Area}, ${Province}, Canada`
    );
    // console.log(fullAddressForMap);
    // const url = latLong;
    const url = `https://api.mapbox.com/search/geocode/v6/forward?country=canada&place=${fullAddressForMap}&access_token=${ACCESS_TOKEN}`;
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   mode: "cors",
    //   body: JSON.stringify({
    //     id: userIP,
    //     locationToSearch: fullAddressForMap,
    //   }),
    // };
    // const res = await fetch(url, options);
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    // if (userIP) {
    const commonFunctionCall = async () => {
      // const latLngValue = await getLatLongForMap(main_data);

      // setState({
      //   lat: latLngValue.result.lat,
      //   lon: latLngValue.result.lon,
      // });
      const result = await getLatLongForMap(main_data);
      for (const feature of result?.features) {
        if (
          feature?.geometry?.coordinates[0] != undefined &&
          feature?.geometry?.coordinates[1] != undefined
        ) {
          setState({
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
          });
          break;
        }
      }
    };
    commonFunctionCall();
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* {console.log(state)} */}
      {state.lat && isMounted ? (
        <MapContainer
          center={[state.lat, state.lon]}
          zoom={14}
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "5px",
          }}
          attributionControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" />
          <Marker
            position={[state.lat, state.lon]}
            icon={L.icon({
              iconUrl: "/property-page-img/marker.svg",
            })}
          ></Marker>
        </MapContainer>
      ) : null}
    </>
  );
};

export default Map;
