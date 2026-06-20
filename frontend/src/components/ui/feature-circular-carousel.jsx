import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 50;
  const maxGap = 72;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const FeatureCircularCarousel = ({
  items,
  autoplay = true,
  autoplayInterval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const cardContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const itemsLength = useMemo(() => items.length, [items]);
  const activeItem = useMemo(() => items[activeIndex], [activeIndex, items]);

  useEffect(() => {
    function handleResize() {
      if (cardContainerRef.current) {
        setContainerWidth(cardContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % itemsLength);
      }, autoplayInterval);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, autoplayInterval, itemsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [itemsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [itemsLength]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  function getCardStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.7;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
    const isRight = (activeIndex + 1) % itemsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const contentVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  };

  return (
    <div className="w-full max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
      {/* Stack kartu 3D */}
      <div
        ref={cardContainerRef}
        className="relative w-full h-[220px] md:h-[200px] mb-10"
        style={{ perspective: "1000px" }}
      >
        {items.map((item, index) => (
          <div
            key={item.title}
            className="absolute inset-0 flex items-center justify-center"
            style={getCardStyle(index)}
          >
            <div className="w-full max-w-md bg-[#1A2438] border border-white/10 rounded-[32px] p-8 flex flex-col gap-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-black text-lg text-white font-heading">
                {item.title}
              </h3>
              <p className="text-sm text-white/60 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Indikator + kontrol */}
      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-center"
          >
            <span className="text-white/40 text-xs font-bold tracking-widest uppercase">
              {activeItem.title}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handlePrev}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            aria-label="Fitur sebelumnya"
            className="w-11 h-11 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors duration-300"
            style={{
              backgroundColor: hoverPrev ? "var(--color-primary)" : "rgba(255,255,255,0.1)",
            }}
          >
            <FiArrowLeft size={20} color="#f1f1f7" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ke fitur ${index + 1}`}
                onClick={() => {
                  setActiveIndex(index);
                  if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
                }}
                className="rounded-full transition-all duration-300 cursor-pointer border-none"
                style={{
                  width: index === activeIndex ? "20px" : "8px",
                  height: "8px",
                  backgroundColor:
                    index === activeIndex ? "var(--color-primary)" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            aria-label="Fitur berikutnya"
            className="w-11 h-11 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors duration-300"
            style={{
              backgroundColor: hoverNext ? "var(--color-primary)" : "rgba(255,255,255,0.1)",
            }}
          >
            <FiArrowRight size={20} color="#f1f1f7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCircularCarousel;
