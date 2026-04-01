"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CardCarouselProps {
  children: React.ReactNode[];
}

export function CardCarousel({ children }: CardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el || isAnimating) return;
    setIsAnimating(true);
    const cardWidth = el.clientWidth;
    el.scrollBy({ left: dir === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  return (
    <div className="card-carousel">
      <motion.button
        onClick={() => scroll("left")}
        whileTap={{ scale: 0.9 }}
        disabled={!canScrollLeft}
        aria-label="Anterior"
        className="card-carousel-btn"
      >
        <ArrowLeft size={18} />
      </motion.button>

      <motion.div
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        className="card-carousel-track"
        animate={{ opacity: isAnimating ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children.map((child, i) => (
          <div key={i} className="card-carousel-item">
            {child}
          </div>
        ))}
      </motion.div>

      <motion.button
        onClick={() => scroll("right")}
        whileTap={{ scale: 0.9 }}
        disabled={!canScrollRight}
        aria-label="Próximo"
        className="card-carousel-btn"
      >
        <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}
