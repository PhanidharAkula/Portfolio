import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { cvs } from "../../data/profile";

type Props = {
  className?: string;
  label?: string;
  direction?: "up" | "down";
  align?: "left" | "right";
};

export function CVMenu({
  className = "btn-outline",
  label = "Download CV",
  direction = "down",
  align = "left",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        className={className}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={open}
        data-cursor="link"
        data-cursor-label="Choose CV"
      >
        <Download size={14} /> {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.7, 0, 0.2, 1] }}
          className="inline-flex"
        >
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: direction === "up" ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === "up" ? 8 : -8 }}
            transition={{ duration: 0.25, ease: [0.7, 0, 0.2, 1] }}
            className={`absolute z-[90] min-w-[300px] border border-line bg-ink/95 backdrop-blur-md shadow-2xl ${
              direction === "up" ? "bottom-full mb-3" : "top-full mt-3"
            } ${align === "right" ? "right-0" : "left-0"}`}
          >
            <div className="px-4 py-3 border-b border-line mono-mini text-bone/55">
              / CV · pick a focus
            </div>
            {cvs.map((cv) => (
              <a
                key={cv.id}
                role="menuitem"
                href={cv.file}
                download
                onClick={() => setOpen(false)}
                data-cursor="link"
                data-cursor-label="Download"
                className="group flex items-center justify-between gap-6 px-4 py-4 border-b border-line last:border-b-0 hover:bg-ink-50 transition-colors"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-bone group-hover:text-plasma transition-colors text-sm md:text-base">
                    {cv.label}
                  </span>
                  <span className="mono-mini text-bone/45">{cv.sublabel}</span>
                </span>
                <Download
                  size={14}
                  className="text-bone/45 group-hover:text-plasma transition-colors shrink-0"
                />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
