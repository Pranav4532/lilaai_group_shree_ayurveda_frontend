import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "Kaveri Herbals has completely transformed my family's approach to wellness. The Ashwagandha capsules helped me manage stress naturally, and the quality is exceptional. I trust their products completely.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b5c26b8a?auto=format&fit=crop&w=600&q=80",
    product: "Ashwagandha Capsules",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "As an Ayurvedic practitioner, I recommend Kaveri Herbals to all my patients. Their commitment to authenticity and traditional preparation methods is evident in every product. Truly outstanding quality.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
    product: "Turmeric Powder",
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Ahmedabad, Gujarat",
    rating: 4,
    text: "The Triphala churna from Kaveri Herbals has been a game-changer for my digestive health. The taste is authentic, and I can feel the difference in my energy levels. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    product: "Triphala Churna",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Delhi, NCR",
    rating: 5,
    text: "I've been using Kaveri Herbals products for over 2 years now. The consistency in quality and the traditional preparation methods make all the difference. My entire family swears by their products.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    product: "Giloy Juice",
  },
  {
    id: 5,
    name: "Meera Krishnan",
    location: "Chennai, Tamil Nadu",
    rating: 4,
    text: "The herbal hair oil has been incredible for my hair health. Being made with traditional methods and pure ingredients, it's gentle yet effective. I'm amazed by the results!",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    product: "Herbal Hair Oil",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-5 bg-light position-relative overflow-hidden">
      <div className="container text-center">
        <h2 className="fw-bold mb-3">What Our Customers Say</h2>
        <p className="text-muted mb-5">
          Real stories from families who have experienced the transformative
          power of authentic Ayurvedic wellness
        </p>

        <div
          className="card shadow-lg mx-auto p-4 border-0"
          style={{ maxWidth: "700px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <div className="position-relative mb-3">
                <img
                  src={current.image}
                  alt={current.name}
                  className="rounded-circle object-fit-cover"
                  style={{ width: "120px", height: "120px" }}
                />
                <div
                  className="position-absolute bg-success rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    bottom: "0",
                    right: "0",
                  }}
                >
                  <Quote size={20} color="white" />
                </div>
              </div>

              <div className="mb-3">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="gold" color="gold" />
                ))}
              </div>

              <blockquote className="fst-italic mb-3 px-3">
                “{current.text}”
              </blockquote>

              <h5 className="fw-semibold">{current.name}</h5>
              <p className="text-muted mb-1">{current.location}</p>
              <small className="text-success">
                Verified Purchase: {current.product}
              </small>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="btn btn-outline-secondary rounded-circle position-absolute top-50 start-0 translate-middle-y ms-4"
          onClick={goToPrevious}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="btn btn-outline-secondary rounded-circle position-absolute top-50 end-0 translate-middle-y me-4"
          onClick={goToNext}
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-circle border-0 ${
                index === currentIndex
                  ? "bg-success"
                  : "bg-secondary bg-opacity-25"
              }`}
              style={{ width: "10px", height: "10px" }}
            ></button>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="row text-center mt-5 gy-3">
          <div className="col-md-4">
            <h4 className="fw-bold">10,000+</h4>
            <p className="text-muted">Happy Customers</p>
          </div>
          <div className="col-md-4">
            <h4 className="fw-bold">4.9 / 5</h4>
            <p className="text-muted">Average Rating</p>
          </div>
          <div className="col-md-4">
            <h4 className="fw-bold">35+ Years</h4>
            <p className="text-muted">of Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
