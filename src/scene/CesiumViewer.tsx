import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Viewer } from 'cesium'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

type Status = 'loading' | 'ready' | 'error'

export function CesiumViewer({ className }: { className?: string }) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)
  // Настройки рендера выбираются по типу устройства, а не по ширине окна,
  // чтобы поворот телефона не пересоздавал сцену.
  const lowPower = useMediaQuery('(pointer: coarse)')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let cancelled = false
    let viewer: Viewer | undefined

    setStatus('loading')
    import('./createViewer')
      .then(({ createViewer }) => {
        if (cancelled) return
        viewer = createViewer(container, { lowPower })
        setStatus('ready')
      })
      .catch((error: unknown) => {
        console.error(error)
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      viewer?.destroy()
    }
  }, [lowPower, attempt])

  return (
    <div className={cn('relative overflow-hidden bg-neutral-900', className)}>
      <div ref={containerRef} className="absolute inset-0" data-testid="cesium-container" />
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="size-48 animate-pulse rounded-full bg-neutral-800" aria-hidden />
          <span className="sr-only" role="status">
            {t('scene.loading')}
          </span>
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-900 text-neutral-200">
          <p role="alert">{t('scene.error')}</p>
          <Button className="min-h-11" onClick={() => setAttempt((n) => n + 1)}>
            {t('scene.retry')}
          </Button>
        </div>
      )}
    </div>
  )
}
