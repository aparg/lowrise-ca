"use client";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, InfoWindowF } from "@react-google-maps/api";
import { X, ZoomIn, ZoomOut, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { geocodeAddress } from "@/utils/geocoding";
import MarkerInfoCard from "./MarkerInfoCard";
import { getImageUrls } from "@/_resale-api/getSalesData";
import MapPinMarker from "./MapPinMarker";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
  mapTypeId: "roadmap",
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  zoomControl: false,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#333333" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#C5E1EA" }, { visibility: "on" }],
    },
  ],
};

const libraries = ["places"];

const formatPrice = (price) => {
  if (!price) return "";

  // Convert price to number if it's a string or already a number
  const numPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.]/g, ""))
      : parseFloat(price);

  if (isNaN(numPrice)) return "";

  if (numPrice >= 1000000) {
    return `$${(numPrice / 1000000).toFixed(1)}M`;
  }
  return `$${(numPrice / 1000).toFixed(0)}K`;
};

const ResaleMap = ({ listings = [], onClose }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });
  const [listingsWithCoords, setListingsWithCoords] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedMarkerImage, setSelectedMarkerImage] = useState(null);

  useEffect(() => {
    const getCoordinates = async () => {
      setListingsWithCoords([]); // Clear existing markers during update
      const listingsWithValidCoords = [];
      let totalLat = 0;
      let totalLng = 0;
      let validCount = 0;

      for (const listing of listings) {
        let coords;
        if (listing.Latitude && listing.Longitude) {
          coords = {
            lat: parseFloat(listing.Latitude),
            lng: parseFloat(listing.Longitude),
          };
        } else {
          const address = `${listing.UnparsedAddress}, ${listing.City}, ${listing.Province} ${listing.PostalCode}`;
          coords = await geocodeAddress(address);
        }

        if (coords) {
          listingsWithValidCoords.push({
            ...listing,
            coordinates: coords,
          });
          totalLat += coords.lat;
          totalLng += coords.lng;
          validCount++;
        }
      }

      if (validCount > 0) {
        setCenter({
          lat: totalLat / validCount,
          lng: totalLng / validCount,
        });
      }

      setListingsWithCoords(listingsWithValidCoords);
    };

    getCoordinates();
    setSelectedMarker(null); // Clear selected marker when listings update
    setSelectedMarkerImage(null);

    // Cleanup function
    return () => {
      if (map) {
        setMap(null);
      }
    };
  }, [listings]);

  const onLoad = (map) => {
    setMap(map);
  };

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          map?.panTo(pos);
          map?.setZoom(15);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    }
  };

  const handleMarkerClick = async (listing) => {
    if (selectedMarker?.ListingId === listing.ListingId) {
      setSelectedMarker(null);
      setSelectedMarkerImage(null);
      return;
    }

    setSelectedMarker(listing);
    if (listing.ListingId) {
      const images = await getImageUrls({
        MLS: listing.ListingId,
        thumbnailOnly: true,
      });
      setSelectedMarkerImage(images?.[0] || null);
    }
    if (map) {
      map.panTo(listing.coordinates);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white/80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={handleLocate}
        >
          <Locate className="h-4 w-4" />
        </Button>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
        onLoad={onLoad}
        onClick={() => {
          setSelectedMarker(null);
          setSelectedMarkerImage(null);
        }}
      >
        {listingsWithCoords.map((listing) => (
          <MapPinMarker
            key={listing.ListingId}
            position={listing.coordinates}
            price={listing.ListPrice}
            isSelected={selectedMarker?.ListingId === listing.ListingId}
            onClick={() => handleMarkerClick(listing)}
          />
        ))}
        {selectedMarker && (
          <InfoWindowF
            position={selectedMarker.coordinates}
            onCloseClick={() => {
              setSelectedMarker(null);
              setSelectedMarkerImage(null);
            }}
          >
            <MarkerInfoCard
              listing={selectedMarker}
              image={selectedMarkerImage}
            />
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default ResaleMap;
