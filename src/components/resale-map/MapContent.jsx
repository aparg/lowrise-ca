"use client";
import { useMap } from "./MapContext";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import MapDrawer from "./MapDrawer";

const MapContent = ({ listings }) => {
  const { isMapOpen, setIsMapOpen } = useMap();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10"
        onClick={() => setIsMapOpen(!isMapOpen)}
      >
        <Map className="h-4 w-4" />
      </Button>
      <MapDrawer
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        listings={listings}
      />
    </>
  );
};

export default MapContent;
