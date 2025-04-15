import { useEffect, useState } from "react";

const Ar = () => {
  const slides = [
    {
      id: 1,
      img: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    },
    {
      id: 2,
      img: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    },
    {
      id: 3,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      id: 4,
      img: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  return (
    <div className="carousel w-full relative">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-item relative w-full transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.img} className="w-full" alt={`/#Slide ${slide.id}`} />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button
              className="btn btn-circle"
              onClick={() =>
                setCurrentSlide(
                  (currentSlide - 1 + slides.length) % slides.length
                )
              }
            >
              ❮
            </button>
            <button
              className="btn btn-circle"
              onClick={() =>
                setCurrentSlide((currentSlide + 1) % slides.length)
              }
            >
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ar;
