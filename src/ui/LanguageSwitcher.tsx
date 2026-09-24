import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { SUPPORTED_LANGUAGES } from '@/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  return (
    <div role="group" aria-label={t('language.label')} className={cn('flex gap-1', className)}>
      {SUPPORTED_LANGUAGES.map((lng) => (
        <Button
          key={lng}
          size="sm"
          variant={lng === current ? 'secondary' : 'ghost'}
          aria-pressed={lng === current}
          className="min-h-11 min-w-11 md:min-h-0 md:min-w-0"
          onClick={() => void i18n.changeLanguage(lng)}
        >
          {t(`language.${lng}`)}
        </Button>
      ))}
    </div>
  )
}
