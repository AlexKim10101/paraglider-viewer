import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/ui/LanguageSwitcher'

// Нижняя панель. В свёрнутом виде — play/pause, скорость и время;
// выдвижная панель с тремя положениями (vaul) появится на этапе 5.
export function MobileLayout() {
  const { t } = useTranslation()

  return (
    <div className="mobile-panel absolute inset-x-0 bottom-0 rounded-t-2xl bg-neutral-950/90 pb-[env(safe-area-inset-bottom)] text-neutral-100 shadow-lg backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-2 px-[max(1rem,env(safe-area-inset-left))]">
        <h1 className="truncate text-base font-semibold">{t('app.title')}</h1>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
