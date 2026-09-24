// Единственная точка статического импорта cesium. Модуль грузится через import()
// из CesiumViewer.tsx, чтобы Cesium не попал в стартовый чанк.
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { Ion, Terrain, Viewer } from 'cesium'

export interface CreateViewerOptions {
  // Облегчённый рендер для телефонов: меньше тайлов, 30 fps, без теней.
  lowPower: boolean
}

export function createViewer(container: HTMLElement, { lowPower }: CreateViewerOptions): Viewer {
  Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN

  const viewer = new Viewer(container, {
    terrain: Terrain.fromWorldTerrain(),
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    selectionIndicator: false,
    shadows: false,
    ...(lowPower && { targetFrameRate: 30 }),
  })

  const { scene } = viewer
  scene.fog.enabled = true
  if (lowPower) {
    // Рендер в физических пикселях, но не плотнее 1.5× — на экранах 3× это
    // в разы меньше работы для GPU почти без потери чёткости.
    viewer.useBrowserRecommendedResolution = false
    viewer.resolutionScale = Math.min(1, 1.5 / window.devicePixelRatio)
    scene.globe.maximumScreenSpaceError = 4
  }

  return viewer
}
