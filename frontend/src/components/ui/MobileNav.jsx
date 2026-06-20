import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { cn } from "../../lib/utils";

export function MobileNav({ nav, onItemClick }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <button
          aria-label="Buka menu navigasi"
          className={cn(
            "relative flex size-10 items-center justify-center rounded-full md:hidden",
            "hover:bg-secondary/10 transition-colors"
          )}
        >
          <div className="relative size-4">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-text-main transition-all duration-200",
                open ? "top-[0.4rem] -rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-text-main transition-all duration-200",
                open ? "top-[0.4rem] rotate-45" : "top-2.5"
              )}
            />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen rounded-none border-none bg-white/95 backdrop-blur-md p-0 shadow-none"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={12}
      >
        <div className="flex flex-col gap-10 overflow-auto px-6 py-8">
          {nav.map((category, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <p className="text-text-main/40 text-xs font-black uppercase tracking-widest">
                {category.name}
              </p>
              <div className="flex flex-col gap-1">
                {category.items.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="py-2.5 text-2xl font-black text-text-main font-heading hover:text-primary transition-colors"
                    onClick={(e) => {
                      onItemClick?.(e, item.href);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MobileNav;
