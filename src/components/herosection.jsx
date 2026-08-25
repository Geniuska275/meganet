import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "./1st.jpg"
import img2 from "./2nd.jpg"
import img3 from "./3rd.jpg"
import img4 from "./4th.jpg"
import img5 from "./5th.jpg"

const SLIDES = [
  {
    place: "NYSC",
    country: "Registration",
    img: img1
  },
  {
    place: "NERD",
    country: "Registration",
    img:img2
  },
  {
    place: "CAC",
    country: "Registration",
    img: img3
  },
  {
    place: "Cv/Resume",
    country: "Registration",
    
    img: img4
  },
  {
    place: "Personal",
    country: "Statement",
   
    img: img5}
];

const SLIDE_DURATION = 5500; // ms each slide stays before auto-advancing

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps whenever the timer restarts, to replay the progress bar
  const touchStartX = useRef(null);

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
    setCycle((c) => c + 1);
  }, []);

  const goTo = (i) => {
    setIndex(i);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, go, cycle]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) go(-1);
    if (dx < -50) go(1);
    touchStartX.current = null;
  };

  const slide = SLIDES[index];

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ aspectRatio: "16 / 9", fontFamily: "Georgia, 'Times New Roman', serif" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.place}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            pointerEvents: i === index ? "auto" : "none",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${s.img})`,
              transform: i === index ? "scale(1.06)" : "scale(1)",
              transition: "transform 6s ease-out",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.05) 35%, rgba(10,10,10,0.75) 100%)",
            }}
          />
        </div>
      ))}

      {/* content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white">
        <div
          className="text-xs sm:text-sm tracking-[0.25em] uppercase mb-2"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", color: "#E8C468" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")} — {slide.coords}
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal leading-tight mb-1">
          {slide.place}
          <span className="opacity-60">, {slide.country}</span>
        </h2>
        <p
          className="text-sm sm:text-base opacity-80 max-w-md"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          {slide.note}
        </p>

        {/* progress segments: fill automatically while autoplay runs */}
        <div className="flex items-center gap-2 mt-6">
          {SLIDES.map((s, i) => (
            <button
              key={s.place}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.place}`}
              className="relative h-1 w-10 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            >
              {i === index && (
                <span
                  key={cycle}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    backgroundColor: "#E8C468",
                    animation: `carousel-fill ${SLIDE_DURATION}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
              {i < index && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#E8C468", opacity: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>
        <style>{`
          @keyframes carousel-fill {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>

      {/* arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
        style={{ backgroundColor: "rgba(10,10,10,0.35)" }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
        style={{ backgroundColor: "rgba(10,10,10,0.35)" }}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}