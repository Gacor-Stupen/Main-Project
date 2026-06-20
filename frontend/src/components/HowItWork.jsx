import { FiClipboard, FiCpu, FiCheckCircle } from "react-icons/fi";
import HowItWorkStepper from "./ui/HowItWorkStepper";

const STEPS = [
  {
    icon: <FiClipboard size={28} />,
    num: "01",
    title: "Isi Formulir",
    desc: "Masukkan data karier, kondisi kerja, dan situasi finansialmu. Hanya butuh 3-5 menit."
  },
  {
    icon: <FiCpu size={28} />,
    num: "02",
    title: "AI Menganalisis",
    desc: "Model AI kami memproses datamu dan menghitung skor potensi resign serta kesiapan finansial."
  },
  {
    icon: <FiCheckCircle size={28} />,
    num: "03",
    title: "Ambil Keputusan",
    desc: "Dapatkan rekomendasi objektif berbasis data. Bukan berdasarkan emosi sesaat."
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="px-6 lg:px-16 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-text-main tracking-tight mb-3 font-heading">
          Cara <span className="text-primary">Kerjanya</span>
        </h2>
        <p className="text-text-main/50 font-medium text-sm max-w-md mx-auto">
          Tiga langkah sederhana untuk keputusan karier yang lebih terukur
        </p>
      </div>

      <HowItWorkStepper steps={STEPS} />
    </section>
  );
}