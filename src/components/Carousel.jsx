"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);

  useEffect(() => {
    // Ensure the current image is always within the visible thumbnails
    if (currentIndex < thumbnailStart) {
      setThumbnailStart(currentIndex);
    } else if (currentIndex >= thumbnailStart + 4) {
      setThumbnailStart(currentIndex - 3);
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + urls.length) % urls.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextThumbnails = () => {
    setThumbnailStart((prev) => Math.min(prev + 1, urls.length - 4));
  };

  const prevThumbnails = () => {
    setThumbnailStart((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-16/14 mb-4 rounded-lg overflow-hidden">
        <img
          src={urls[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {urls.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="relative flex justify-center">
        {thumbnailStart > 0 && (
          <button
            onClick={prevThumbnails}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-gray-800" />
          </button>
        )}
        <div className="flex space-x-2 overflow-hidden">
          {urls.slice(thumbnailStart, thumbnailStart + 4).map((url, index) => (
            <div
              key={thumbnailStart + index}
              className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${
                currentIndex === thumbnailStart + index
                  ? "border-4 border-blue-500"
                  : ""
              }`}
              onClick={() => goToSlide(thumbnailStart + index)}
            >
              <img
                src={url}
                alt={`Thumbnail ${thumbnailStart + index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {thumbnailStart < urls.length - 4 && (
          <button
            onClick={nextThumbnails}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-all"
          >
            <ChevronRight className="w-4 h-4 text-gray-800" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
