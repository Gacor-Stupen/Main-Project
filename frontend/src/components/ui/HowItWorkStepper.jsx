import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { cn } from "../../lib/utils";

export default function HowItWorkStepper({ steps = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepCount = steps.length;
  const activeStep = steps[activeIndex];

  const goTo = (index) => setActiveIndex(index);
  const goNext = () => setActiveIndex((prev) => Math.min(prev + 1, stepCount - 1));
  const goPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === stepCount - 1;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Indikator step + garis penghubung */}
      <div className="flex items-center w-full mb-12">
        {steps.map((step, i) => {
          const isCompleted = i < activeIndex;
          const isActive = i === activeIndex;
          const isLastItem = i === stepCount - 1;

          return (
            <div key={i} className={cn("flex items-center", !isLastItem && "flex-1")}>
              {/* Lingkaran nomor step, bisa diklik */}
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ke langkah ${i + 1}: ${step.title}`}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex items-center justify-center rounded-full border-2 font-black font-heading text-sm shrink-0 cursor-pointer transition-all duration-300",
                  "w-11 h-11 md:w-12 md:h-12",
                  isActive &&
                    "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110",
                  isCompleted &&
                    !isActive &&
                    "bg-secondary border-secondary text-white",
                  !isActive &&
                    !isCompleted &&
                    "bg-white border-secondary/30 text-text-main/40 hover:border-primary/50 hover:text-primary"
                )}
              >
                {isCompleted && !isActive ? <FiCheck size={18} /> : i + 1}
              </button>

              {/* Garis penghubung ke step berikutnya */}
              {!isLastItem && (
                <div className="flex-1 h-[3px] mx-2 md:mx-4 rounded-full bg-secondary/15 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={false}
                    animate={{ width: i < activeIndex ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Kartu detail step aktif */}
      <div className="relative min-h-[280px] sm:min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white border border-secondary/20 rounded-[32px] p-8 md:p-10 flex flex-col gap-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                {activeStep.icon}
              </div>
              <span className="font-black text-5xl text-secondary/20 font-heading">
                {activeStep.num}
              </span>
            </div>
            <h3 className="font-black text-2xl text-text-main font-heading">
              {activeStep.title}
            </h3>
            <p className="text-sm md:text-base text-text-main/60 font-medium leading-relaxed">
              {activeStep.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigasi Prev/Next */}
      <div className="flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all",
            isFirst
              ? "bg-secondary/5 text-text-main/30 cursor-not-allowed"
              : "bg-white border border-secondary/30 text-text-main hover:bg-secondary/10 hover:-translate-y-0.5 shadow-sm"
          )}
        >
          <FiArrowLeft size={16} />
          Sebelumnya
        </button>

        <span className="text-xs font-bold text-text-main/40 font-mono">
          {activeIndex + 1} / {stepCount}
        </span>

        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all",
            isLast
              ? "bg-secondary/5 text-text-main/30 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 shadow-lg shadow-primary/25"
          )}
        >
          Selanjutnya
          <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}