import React from "react";
import { cn } from "../../lib/utils";

const TeamMemberCard = React.forwardRef(
  ({ className, imageUrl, role, name, index, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative grid h-80 w-full transform-gpu overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        {/* Foto latar dengan animasi zoom saat hover */}
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x800/0F172A/ffffff?text=" + encodeURIComponent(name);
          }}
        />

        {/* Overlay gradient gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Nomor urut anggota, pojok kanan atas */}
        {typeof index === "number" && (
          <span className="absolute top-4 right-4 z-20 text-xs text-white/50 font-mono">
            _0{index + 1}
          </span>
        )}

        {/* Konten teks, naik saat hover */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            {role}
          </p>
          <h3 className="mt-1 text-xl font-black leading-tight tracking-tight text-white font-heading md:text-2xl">
            {name}
          </h3>
        </div>
      </div>
    );
  }
);
TeamMemberCard.displayName = "TeamMemberCard";

export { TeamMemberCard };
export default TeamMemberCard;
