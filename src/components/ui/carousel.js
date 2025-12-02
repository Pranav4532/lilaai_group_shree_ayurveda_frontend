import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Simple Carousel (React + Bootstrap)
 * -----------------------------------
 * Props:
 * - items: array of elements or JSX slides
 * - autoPlay: boolean (default false)
 * - interval: number (ms, default 4000)
 * - showControls: boolean (default true)
 * - showIndicators: boolean (default true)
 * - height: string (default "400px")
 */

export function Carousel({
  items = [],
  autoPlay = false,
  interval = 4000,
  showControls = true,
  showIndicators = true,
  height = "400px",
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % items.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  // Auto-play logic
  React.useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  if (items.length === 0) return null;

  return (
    <div className={`position-relative overflow-hidden rounded shadow ${className}`}>
      {/* Carousel Inner */}
      <div
        className="d-flex transition-all"
        style={{
          width: `${items.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex-grow-0 w-100 d-flex align-items-center justify-content-center bg-light"
            style={{ height }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Controls */}
      {showControls && items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-circle border-0 ${
                currentIndex === index ? "bg-success" : "bg-secondary"
              }`}
              style={{ width: "10px", height: "10px", opacity: 0.7 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
