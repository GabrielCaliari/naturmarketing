"use client"

import { useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import ptBR from '@/i18n/pt-BR'
import enUS from '@/i18n/en-US'

export type Locale = 'pt' | 'en'

// ─── Global state (module-level, shared across all useLocale() calls) ──────────
const EVENT = 'reserve:locale'
let _locale: Locale = 'pt'

function broadcast(l: Locale) {
  _locale = l
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: l }))
  }
}

// ─── LocaleProvider reads cookie once on mount and broadcasts ─────────────────
export function LocaleProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = Cookies.get('locale') as Locale | undefined
    if (saved === 'en' || saved === 'pt') {
      broadcast(saved)
    } else if (navigator.language?.toLowerCase().startsWith('en')) {
      Cookies.set('locale', 'en', { expires: 365 })
      broadcast('en')
    }
  }, [])

  return <>{children}</>
}

// ─── useLocale: each component subscribes to locale events independently ──────
export function useLocale() {
  // init from module-level _locale so lazy-mounted components get correct value
  const [locale, setLocaleState] = useState<Locale>(_locale)

  useEffect(() => {
    // keep in sync with any future broadcasts (including the initial one)
    const handler = (e: Event) => {
      setLocaleState((e as CustomEvent<Locale>).detail)
    }
    window.addEventListener(EVENT, handler)
    return () => window.removeEventListener(EVENT, handler)
  }, [])

  function setLocale(l: Locale) {
    Cookies.set('locale', l, { expires: 365 })
    broadcast(l)
  }

  function t(key: string): string {
    const dict = locale === 'en' ? enUS : ptBR
    return dict[key] ?? ptBR[key] ?? key
  }

  return { locale, setLocale, t }
}
