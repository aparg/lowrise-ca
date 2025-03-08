"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
const StreetResaleMap = ({ address }) => {
  const [position, setPosition] = useState([]);
  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    )
      .then((value) => value.json())
      .then((decodedObj) => {
        const latitude = decodedObj.results[0].geometry.location.lat;
        const longitude = decodedObj.results[0].geometry.location.lng;
        setPosition([latitude, longitude]);
      });
  }, []);
  let DefaultIcon = L.icon({
    iconUrl: "/icons/home_address.png",
    iconSize: [41, 41],
    iconAnchor: [41, 41],
    popupAnchor: [1, -34],
  });
  return (
    position.length == 2 && (
      <div className="">
        {position.length > 0 && (
          <iframe
            src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${position[0]},${position[1]}&heading=210&pitch=10&fov=35`}
            width="100%"
            height="450"
          ></iframe>
        )}
      </div>
    )
  );
};

export default StreetResaleMap;
