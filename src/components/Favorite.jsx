import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { Heart } from "lucide-react";
import { useState } from "react";

const Favorite = ({ isFavorite, toggleFavorite, MLS, size = 6 }) => {
  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isFavorite
          ? "bg-red-100 hover:bg-red-200"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`w-${size} h-${size} ${
          isFavorite ? "text-red-500 fill-current" : "text-gray-500"
        }`}
      />
    </button>
  );
};

export default Favorite;
