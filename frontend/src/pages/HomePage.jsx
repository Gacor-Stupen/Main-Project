import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiClock, FiLogOut, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import HowItWork from "../components/HowItWork";
import Features from "../components/Features";
import TeamGrid from "../components/ui/TeamGrid";
import PredictionCard from "../components/ui/PredictionCard";
const BASE_URL = import.meta.env.VITE_BACKEND_SERVICE_URL;

export default function HomePage() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isLoggedIn = !!user;

  // Data Tim
  const teamMembers = [
    { id: "CDCC009D6Y2672", name: "Arya Ivan Ghally", role: "Data Scientist", image: "/public/Team/ghally.png" },
    { id: "CDCC009D6Y2147", name: "Ananda Nashril Fikri B.", role: "Data Scientist", image: "/public/Team/nashril.png" },
    { id: "CACC009D6X0546", name: "Devi Oktaviani", role: "AI Engineer", image: "/public/Team/devi.png" },
    { id: "CACC009D6Y0560", name: "Feri Adiansah", role: "AI Engineer", image: "/public/Team/feri.png" },
    { id: "CFCC009D6Y1107", name: "Egi Prayogi", role: "Full-Stack Developer", image: "/public/Team/egi.png" },
    { id: "CFCC009D6Y1879", name: "Muhammad Rafi Putra Pati", role: "Full-Stack Developer", image: "/public/Team/rafi.jpg" },
  ];

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col font-sans relative">
      {/* Background Blobs Global */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/2 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl -z-10"></div>

      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="beranda" className="relative flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-80px)] px-6 lg:px-16 max-w-7xl mx-auto gap-12 py-12 lg:py-0">
          <div className="w-full lg:w-1/2 z-10 flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-text-main text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1] font-heading">
              Yakin Mau <span className="text-primary">Resign?</span>
              <br />
              Coba Analisis Dulu.
            </h1>
            <p className="text-lg text-text-main/70 mb-10 leading-relaxed font-medium max-w-lg">
              Jangan ambil keputusan impulsif. Sistem kami menganalisis kepuasan kerja, work-life balance, dan potensi
              burnout untuk memberikan prediksi dan rekomendasi yang objektif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => (isLoggedIn ? navigate("/analyze") : navigate("/login"))}
                className="w-full sm:w-auto px-10 py-4 rounded-full font-black text-xs bg-primary text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 uppercase tracking-widest hover:-translate-y-1 text-center"
              >
                Mulai Analisis
              </button>
              <button
                onClick={() => (isLoggedIn ? navigate("/skill") : navigate("/login"))}
                className="w-full sm:w-auto px-10 py-4 rounded-full font-black text-xs bg-white text-text-main hover:bg-secondary/10 transition-all uppercase tracking-widest border border-secondary/30 hover:-translate-y-1 text-center shadow-sm"
              >
                Cek Skill Kamu
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative z-10 flex justify-center mt-10 lg:mt-0 animate-in fade-in zoom-in-95 duration-700 delay-200">
            <PredictionCard />
          </div>
        </section>

        <Features />

        <HowItWork />

        {/* TEAM SECTION*/}
        <section id="tim" className="px-6 lg:px-16 py-24 flex flex-col items-center justify-center bg-text-main text-background relative overflow-hidden mt-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-text-main to-text-main opacity-80"></div>

          <div className="relative z-10 w-full max-w-6xl text-center">
            <span className="text-primary text-4xl md:text-5xl font-bold tracking-widest uppercase text-sm mb-2 block">
              Capstone CC26-PSU097
            </span>
            {/* <h2 className="text-4xl md:text-5xl font-black mb-6 font-heading text-white tracking-tight">
               Capstone CC26-PSU097
            </h2> */}
            {/* <p className="text-white/70 text-base md:text-lg mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              Proyek ini dikembangkan secara kolaboratif oleh 6 talenta dari learning path Data Science, AI Engineering,
              dan Full-Stack Web Development.
            </p> */}

            <TeamGrid members={teamMembers} />
          </div>
        </section>
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}