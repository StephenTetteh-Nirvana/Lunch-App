import { useEffect, useState } from "react";
import Jollof from "../assets/images/jollof.jpg";
import Fries from "../assets/images/fries.jpg";

const slides = [
    
  { image: Jollof},
  { image: Fries },
  { image: Jollof},
  { image: Fries }

]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const startSlider = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000)

    return () => clearInterval(startSlider)
  }, []);

  return (
   <section className="flex flex-col overflow-hidden"> 
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex justify-center items-center min-w-full mobile:flex-col relative"
          >
            <div className="w-[400px] h-[250px] mobile:w-full mobile:h-[300px]">
              <img src={slide.image} alt="image" className="w-full h-full bg-center" />
            </div>
          </div>
        ))}
      </div>

      {/* <div className="absolute bottom-32 flex flex-row justify-center items-center gap-2 w-[98%]">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div> */}
    </section>
  );
};

export default Carousel;
