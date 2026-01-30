import { useI18n } from '../i18n'
import './LanguageSwitcher.css'

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n()

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
        onClick={() => setLanguage('zh')}
        title={t.chinese}
      >
        中文
      </button>
      <span className="lang-divider">|</span>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        title={t.english}
      >
        EN
      </button>
    </div>
  )
}
