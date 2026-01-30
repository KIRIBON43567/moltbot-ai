import AdminPage from './pages/AdminPage'
import { I18nProvider } from './i18n/I18nProvider'
import { useI18n } from './i18n'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import './App.css'

function AppContent() {
  const { t } = useI18n()
  
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <img src="/logo-small.png" alt="Moltworker" className="header-logo" />
          <h1>{t.adminTitle}</h1>
        </div>
        <div className="header-right">
          <LanguageSwitcher />
        </div>
      </header>
      <main className="app-main">
        <AdminPage />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}
