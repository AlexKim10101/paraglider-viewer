import { useIsMobileLayout } from '@/hooks/useMediaQuery'
import { CesiumViewer } from '@/scene/CesiumViewer'
import { DesktopLayout } from '@/ui/layout/DesktopLayout'
import { MobileLayout } from '@/ui/layout/MobileLayout'

export default function App() {
  const isMobile = useIsMobileLayout()

  // Сцена смонтирована один раз и не пересоздаётся при смене раскладки:
  // раскладки лежат поверх неё.
  return (
    <main className="relative h-full w-full overflow-hidden" data-layout={isMobile ? 'mobile' : 'desktop'}>
      <CesiumViewer className="absolute inset-0 touch-none" />
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </main>
  )
}
