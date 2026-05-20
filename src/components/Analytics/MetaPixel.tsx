"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CONSENT_KEY = "reserve-cookie-consent";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function initPixel(pixelId: string) {
  if (window.fbq) {
    window.fbq("track", "PageView");
    return;
  }

  type FbqFn = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    loaded: boolean;
    version: string;
    push: (...args: unknown[]) => void;
  };

  const fbqFn: FbqFn = function (...args: unknown[]) {
    fbqFn.callMethod ? fbqFn.callMethod(...args) : fbqFn.queue.push(args);
  } as FbqFn;

  window._fbq = fbqFn;
  window.fbq = fbqFn;
  fbqFn.push = fbqFn;
  fbqFn.loaded = true;
  fbqFn.version = "2.0";
  fbqFn.queue = [];

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  fbqFn("init", pixelId);
  fbqFn("track", "PageView");
}

function hasMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    return JSON.parse(raw)?.marketing === true;
  } catch {
    return false;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID) return;

    if (hasMarketingConsent()) {
      initPixel(PIXEL_ID);
      return;
    }

    // Listen for consent being granted after the banner
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY && hasMarketingConsent()) {
        initPixel(PIXEL_ID!);
      }
    };

    // Also poll once after user interaction (for same-tab consent)
    const onConsent = () => {
      if (hasMarketingConsent()) initPixel(PIXEL_ID!);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("reserve:consent", onConsent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("reserve:consent", onConsent);
    };
  }, []);

  // Track page changes once pixel is loaded
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
