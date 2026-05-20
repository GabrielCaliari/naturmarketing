"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import Cookies from 'js-cookie'

type Locale = 'pt' | 'en'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  pt: {
    // Header nav
    'nav.home': 'Início',
    'nav.empresa': 'Nossa Empresa',
    'nav.contact': 'Fale Conosco',
    'nav.blog': 'Blog',
    'nav.cta': 'Diagnóstico Gratuito',

    // Hero / Banner
    'hero.tag': 'Agência de Marketing Hoteleiro',
    'hero.cta.primary': 'Diagnóstico Gratuito',
    'hero.cta.secondary': 'Conhecer a Agência',

    // Footer
    'footer.rights': 'Todos os direitos reservados.',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos e Condições',

    // Contact form
    'contact.name': 'Nome',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefone / WhatsApp',
    'contact.hotel': 'Nome do Hotel / Pousada',
    'contact.message': 'Mensagem',
    'contact.submit': 'Enviar Mensagem',
    'contact.success': 'Mensagem enviada com sucesso!',
    'contact.error': 'Erro ao enviar. Tente novamente.',

    // Cookie consent
    'cookie.accept': 'Aceitar',
    'cookie.decline': 'Recusar',
    'cookie.message': 'Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site.',
    'cookie.learnMore': 'Saiba mais',

    // Language switcher
    'lang.switch': 'EN',
  },
  en: {
    // Header nav
    'nav.home': 'Home',
    'nav.empresa': 'About Us',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.cta': 'Free Diagnosis',

    // Hero / Banner
    'hero.tag': 'Hotel Marketing Agency',
    'hero.cta.primary': 'Free Diagnosis',
    'hero.cta.secondary': 'About Us',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',

    // Contact form
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone / WhatsApp',
    'contact.hotel': 'Hotel / Property Name',
    'contact.message': 'Message',
    'contact.submit': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending. Please try again.',

    // Cookie consent
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    'cookie.message': 'We use cookies to improve your experience and analyze site traffic.',
    'cookie.learnMore': 'Learn more',

    // Language switcher
    'lang.switch': 'PT',
  },
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt')

  useEffect(() => {
    const saved = Cookies.get('locale') as Locale | undefined
    if (saved === 'en' || saved === 'pt') {
      setLocaleState(saved)
      return
    }
    // Detect from browser
    const lang = navigator.language?.split('-')[0]?.toLowerCase()
    if (lang === 'en') {
      setLocaleState('en')
      Cookies.set('locale', 'en', { expires: 365 })
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    Cookies.set('locale', l, { expires: 365 })
  }, [])

  const t = useCallback(
    (key: string) => translations[locale][key] ?? translations['pt'][key] ?? key,
    [locale]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

const defaultContext: LocaleContextValue = {
  locale: 'pt',
  setLocale: () => {},
  t: (key) => translations['pt'][key] ?? key,
}

export function useLocale() {
  return useContext(LocaleContext) ?? defaultContext
}
