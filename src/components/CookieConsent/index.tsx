"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
}

const STORAGE_KEY = "reserve-cookie-consent";

function getStoredConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePreferences) : null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (prefs: Omit<CookiePreferences, "savedAt">) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...prefs, savedAt: new Date().toISOString() })
      );
    } catch {
      // silently fail in private browsing
    }
    setVisible(false);
  };

  const acceptAll = () => save({ analytics: true, marketing: true });
  const acceptEssential = () => save({ analytics: false, marketing: false });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-4 z-50"
          style={{ width: "min(calc(100vw - 2rem), 320px)" }}
        >
          <div
            className="relative rounded-2xl border p-5"
            style={{
              background: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              borderColor: "rgba(0, 0, 0, 0.07)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            {/* Close */}
            <button
              onClick={acceptEssential}
              aria-label="Fechar"
              className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all duration-150"
            >
              <IconX size={12} strokeWidth={2} />
            </button>

            {/* Title */}
            <p className="text-[13px] font-semibold text-zinc-900 tracking-tight mb-1 pr-6">
              Cookies
            </p>

            {/* Body */}
            <p className="text-[11.5px] text-zinc-500 leading-relaxed mb-4">
              Usamos cookies essenciais e opcionais para melhorar sua
              experiência.{" "}
              <Link
                href="/public/privacy-policy"
                className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900 transition-colors"
              >
                Privacidade
              </Link>
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={acceptAll}
                className="w-full py-2.5 text-[12px] font-medium rounded-xl text-white transition-colors duration-200"
                style={{ background: "#1a1a1a" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#333")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a")
                }
              >
                Aceitar todos
              </button>
              <button
                onClick={acceptEssential}
                className="w-full py-2.5 text-[12px] font-medium rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-200"
              >
                Apenas essenciais
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
