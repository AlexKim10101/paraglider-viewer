import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/ui/LanguageSwitcher'

// Боковая панель поверх карты: список треков, проигрывание, график, статистика.
export function DesktopLayout() {
  const { t } = useTranslation()

  return (
    <aside className="absolute top-3 bottom-10 left-3 flex w-80 flex-col rounded-xl bg-neutral-950/85 text-neutral-100 shadow-lg backdrop-blur">
      <header className="flex items-center justify-between gap-2 border-b border-neutral-800 px-4 py-3">
        <h1 className="text-base font-semibold">{t('app.title')}</h1>
        <LanguageSwitcher />
      </header>
      <div className="flex flex-1 items-center justify-center p-4 text-center text-sm text-neutral-400">
        {t('panel.empty')}
      </div>
    </aside>
  )
}
