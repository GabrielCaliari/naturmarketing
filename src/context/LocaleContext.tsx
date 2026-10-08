"use client"

import { useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import ptBR from '@/i18n/pt-BR'

export type Locale = 'pt' | 'en'

// ─── Global state (module-level, shared across all useLocale() calls) ──────────
const EVENT = 'reserve:locale'
let _locale: Locale = 'pt'

// O dicionário en-US (~16 KB) só entra no bundle de quem troca para EN.
// Import estático aqui colocava PT+EN no chunk compartilhado de TODAS as
// páginas — o Lighthouse apontava isso como "JavaScript não usado".
let _enUS: Record<string, string> | null = null

function loadEnUS(): Promise<void> {
  if (_enUS) return Promise.resolve()
  return import('@/i18n/en-US').then((m) => {
    _enUS = m.default
  })
}

function broadcast(l: Locale) {
  _locale = l
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: l }))
  }
}

// Garante que o dicionário existe ANTES de re-renderizar em EN — sem isso os
// componentes renderizariam as chaves cruas até o chunk chegar.
function switchTo(l: Locale) {
  if (l === 'en') {
    loadEnUS()
      .then(() => broadcast('en'))
      .catch((err) => {
        // Se o chunk falhar, não deixa o cookie dizendo "en" com a UI presa
        // em pt — isso repetiria o erro (e a inconsistência) a cada load.
        // Volta o cookie e o estado para pt, que já está disponível.
        console.error('[locale] falha ao carregar dicionário en-US, revertendo para pt', err)
        Cookies.set('locale', 'pt', { expires: 365 })
        broadcast('pt')
      })
  } else {
    broadcast('pt')
  }
}

// ─── LocaleProvider reads cookie once on mount and broadcasts ─────────────────
export function LocaleProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = Cookies.get('locale') as Locale | undefined
    if (saved === 'en' || saved === 'pt') {
      if (saved !== _locale) switchTo(saved)
    } else if (navigator.language?.toLowerCase().startsWith('en')) {
      Cookies.set('locale', 'en', { expires: 365 })
      switchTo('en')
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
    switchTo(l)
  }

  function t(key: string): string {
    const dict = locale === 'en' && _enUS ? _enUS : ptBR
    return dict[key] ?? ptBR[key] ?? key
  }

  return { locale, setLocale, t }
}
