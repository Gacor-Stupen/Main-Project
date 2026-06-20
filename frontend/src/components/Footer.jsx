import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import useNavScroll from "../hooks/useNavScroll";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#fitur", label: "Fitur" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#tim", label: "Tim" },
  { href: "#faq", label: "FAQ" },
];

const PRODUCT_LINKS = [
  { to: "/analyze", label: "Mulai Analisis" },
  { to: "/skill", label: "Cek Skill Kamu" },
  { to: "/login", label: "Masuk Akun" },
];

export default function Footer() {
  const handleNavClick = useNavScroll();

  return (
    <footer className="bg-text-main text-white/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-text-main to-text-main opacity-80 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl leading-none shadow-sm shadow-primary/20">
                R
              </div>
              <p className="font-black text-white text-lg tracking-tight font-heading">
                ResignAjaDulu
              </p>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-xs">
              Analisis karier & finansialmu sebelum resign. Keputusan besar butuh data, bukan cuma perasaan sesaat.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">
              Navigasi
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Produk */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">
              Produk
            </p>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm font-semibold hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <FiArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 text-center sm:text-left">
            © 2026 ResignAjaDulu · Tim CC26-PSU097
          </p>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
            Coding Camp powered by DBS Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}