import { useState, useCallback, ReactNode } from 'react'
import {
  I18nContext,
  Language,
  getTranslations,
  getDefaultLanguage,
  saveLanguage,
} from './index'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(getDefaultLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    saveLanguage(lang)
  }, [])

  const t = getTranslations(language)

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}
