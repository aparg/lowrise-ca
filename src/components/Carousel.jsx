"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ urls }) => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToImage = (index) => {
    scrollContainerRef.current.scrollTo({
      left: index * scrollContainerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const index = Math.round(
      scrollContainerRef.current.scrollLeft /
        scrollContainerRef.current.offsetWidth
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % urls.length;
    scrollToImage(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + urls.length) % urls.length;
    scrollToImage(newIndex);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto flex snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {urls.map((url, index) => (
          <div key={index} className="w-full flex-shrink-0 snap-center">
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
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
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
