import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring, animate } from "framer-motion";

function AnimatedStat({ label, value, color, inView, delay = 0 }) {
  const count = useMotionValue(0);
  const width = useTransform(count, (v) => `${v}%`);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.2,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay, count]);

  return (
    <div>
      <div className="flex justify-between text-xs mb-2 font-black uppercase tracking-wider">
        <span className="text-text-main/60">{label}</span>
        <span className={color}>{displayValue}%</span>
      </div>
      <div className="w-full bg-secondary/10 rounded-full h-3 overflow-hidden border border-secondary/20">
        <motion.div
          className={`${color === "text-primary" ? "bg-primary" : "bg-secondary"} h-full rounded-full`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default function PredictionCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  // Posisi mouse relatif terhadap kartu, dinormalisasi -0.5 s/d 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Sumbu Y mouse mengontrol rotateX, sumbu X mouse mengontrol rotateY
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-2xl shadow-secondary/10 border border-secondary/20 w-full max-w-md"
    >
      <div className="flex justify-between items-center mb-6 border-b border-secondary/10 pb-4">
        <h3 className="font-black text-xs uppercase tracking-widest text-text-main flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          Prediction
        </h3>
      </div>

      <div className="space-y-6">
        <AnimatedStat label="Stress Level" value={35} color="text-primary" inView={inView} delay={0} />
        <AnimatedStat label="Keahlian Kerja" value={60} color="text-secondary" inView={inView} delay={0.2} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
        className="mt-8 bg-background/60 p-5 rounded-3xl border border-secondary/10"
      >
        <p className="font-black text-[10px] text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
          Rekomendasi:
        </p>
        <p className="text-[13px] font-semibold text-text-main/70 leading-relaxed italic">
          "Pertimbangkan untuk mengambil cuti sebelum memutuskan resign. Kondisi saat ini sangat dipengaruhi
          oleh kelelahan kronis."
        </p>
      </motion.div>
    </motion.div>
  );
}
