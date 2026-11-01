import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import CardLayout from '../../web-animation-engineering/examples/motion/card-layout.jsx'
import DragSnapCarousel from '../../web-animation-engineering/examples/motion/drag-snap-carousel.jsx'
import InteractiveButton from '../../web-animation-engineering/examples/motion/interactive-button.jsx'
import PageTransition from '../../web-animation-engineering/examples/motion/page-transition.jsx'
import SharedElement from '../../web-animation-engineering/examples/motion/shared-element.jsx'
import ScrollReveal from '../../web-animation-engineering/examples/motion/scroll-reveal.jsx'
import StaggerList from '../../web-animation-engineering/examples/motion/stagger-list.jsx'
import HeroMotion from '../../web-animation-engineering/examples/gsap-react/usegsap-component.jsx'
import './App.css'

const ProductScrollStory = lazy(() => import('../../web-animation-engineering/examples/three/product-scroll.jsx'))

const demos = [
  {
    id: 'hero-reveal',
    title: 'Hero reveal',
    category: 'CSS',
    group: 'CSS y navegador',
    description: 'Entrada escalonada de título y contenido.',
    trigger: 'Al abrir',
    path: 'css/hero-reveal/index.html',
    color: 'mint',
  },
  {
    id: 'stagger-list',
    title: 'Stagger list',
    category: 'CSS',
    group: 'CSS y navegador',
    description: 'Tarjetas que entran una tras otra.',
    trigger: 'Al abrir',
    path: 'css/stagger-list/index.html',
    color: 'blue',
  },
  {
    id: 'scroll-reveal',
    title: 'Scroll reveal',
    category: 'CSS',
    group: 'CSS y navegador',
    description: 'Revelado ligado al desplazamiento de la página.',
    trigger: 'Desplázate dentro de la demo',
    path: 'css/scroll-reveal/index.html',
    color: 'violet',
  },
  {
    id: 'view-transition',
    title: 'View transition',
    category: 'Browser API',
    group: 'CSS y navegador',
    description: 'Transición entre estados de contenido.',
    trigger: 'Pulsa el botón de la demo',
    path: 'css/view-transition/index.html',
    color: 'orange',
  },
  {
    id: 'image-transition',
    title: 'Image transition',
    category: 'CSS',
    group: 'CSS y navegador',
    description: 'Fundido y escala entre dos ilustraciones.',
    trigger: 'Pulsa el botón de la demo',
    path: 'css/image-transition/index.html',
    color: 'pink',
  },
  {
    id: 'fixed-background',
    title: 'Fixed background',
    category: 'CSS',
    group: 'CSS y navegador',
    description: 'La imagen queda fija mientras el contenido pasa delante.',
    trigger: 'Desplázate dentro de la demo',
    path: 'css/fixed-background/index.html',
    color: 'orange',
  },
  {
    id: 'path-draw',
    title: 'SVG path',
    category: 'SVG',
    group: 'CSS y navegador',
    description: 'Un trazo vectorial se dibuja en pantalla.',
    trigger: 'Al abrir',
    path: 'svg/path-draw/index.html',
    color: 'mint',
  },
  {
    id: 'particle-field',
    title: 'Canvas field',
    category: 'Canvas',
    group: 'CSS y navegador',
    description: 'Partículas animadas en un canvas adaptable.',
    trigger: 'Continuo',
    path: 'canvas/particle-field/index.html',
    color: 'blue',
  },
  {
    id: 'parallax',
    title: 'Parallax',
    category: 'GSAP',
    group: 'GSAP',
    description: 'Profundidad y movimiento coordinados con el scroll.',
    trigger: 'Desplázate dentro de la demo',
    path: 'gsap/parallax/index.html',
    color: 'orange',
  },
  {
    id: 'pinned-horizontal',
    title: 'Pinned horizontal',
    category: 'GSAP',
    group: 'GSAP',
    description: 'Paneles horizontales fijados al desplazamiento.',
    trigger: 'Desplázate dentro de la demo',
    path: 'gsap/pinned-horizontal/index.html',
    color: 'pink',
  },
  {
    id: 'scroll-story',
    title: 'Scroll story',
    category: 'GSAP',
    group: 'GSAP',
    description: 'Tres capítulos coordinan una escena fija con una timeline.',
    trigger: 'Desplázate por la demo',
    path: 'gsap/scroll-story/index.html',
    color: 'violet',
  },
  {
    id: 'text-reveal',
    title: 'Text reveal',
    category: 'GSAP',
    group: 'GSAP',
    description: 'Las palabras aparecen con un ritmo escalonado.',
    trigger: 'Al abrir',
    path: 'gsap/text-reveal/index.html',
    color: 'violet',
  },
  {
    id: 'animated-navigation',
    title: 'Animated navigation',
    category: 'GSAP',
    group: 'GSAP',
    description: 'Menú desplegable con controles de teclado.',
    trigger: 'Pulsa el menú dentro de la demo',
    path: 'gsap/animated-navigation/index.html',
    color: 'mint',
  },
  {
    id: 'svg-morph-mask',
    title: 'SVG morph + mask',
    category: 'GSAP + SVG',
    group: 'GSAP',
    description: 'La forma de una máscara cambia y revela una ilustración.',
    trigger: 'Al abrir o repetir',
    path: 'gsap/svg-morph-mask/index.html',
    color: 'orange',
  },
  {
    id: 'pulse',
    title: 'Pulse',
    category: 'Lottie',
    group: 'Lottie',
    description: 'Animación vectorial con control play y pausa.',
    trigger: 'Pulsa play o pausa',
    path: 'lottie/pulse/index.html',
    color: 'blue',
  },
  {
    id: 'motion-stagger-list',
    title: 'Variants + stagger',
    category: 'Motion',
    group: 'Motion',
    description: 'Entradas escalonadas coordinadas por variantes.',
    trigger: 'Al abrir',
    component: StaggerList,
    color: 'violet',
  },
  {
    id: 'product-3d-story',
    title: '3D product story',
    category: 'Three.js',
    group: '3D y WebGL',
    description: 'Un producto 3D rota con el scroll mientras avanzan sus capítulos.',
    trigger: 'Desplázate por los capítulos',
    component: ProductScrollStory,
    color: 'orange',
  },
  {
    id: 'interactive-button',
    title: 'Interactive button',
    category: 'Motion',
    group: 'Motion',
    description: 'Feedback de hover y pulsación con estado accesible.',
    trigger: 'Pasa el cursor y pulsa',
    component: InteractiveButton,
    color: 'mint',
  },
  {
    id: 'card-layout',
    title: 'Card layout',
    category: 'Motion',
    group: 'Motion',
    description: 'Reordena tarjetas con una transición de layout.',
    trigger: 'Pulsa reordenar',
    component: CardLayout,
    color: 'blue',
  },
  {
    id: 'drag-snap-carousel',
    title: 'Drag + inertia + snap',
    category: 'Motion',
    group: 'Motion',
    description: 'Carrusel arrastrable con inercia que ajusta la tarjeta más cercana.',
    trigger: 'Arrastrá o usá los controles',
    component: DragSnapCarousel,
    color: 'mint',
  },
  {
    id: 'shared-element',
    title: 'Shared element',
    category: 'Motion',
    group: 'Motion',
    description: 'Una tarjeta comparte imagen y título con su vista de detalle.',
    trigger: 'Abre una tarjeta',
    component: SharedElement,
    color: 'pink',
  },
  {
    id: 'motion-scroll-reveal',
    title: 'Scroll motion',
    category: 'Motion',
    group: 'Motion',
    description: 'Movimiento vinculado al progreso del scroll.',
    trigger: 'Desplázate por la vista previa',
    component: ScrollReveal,
    color: 'orange',
  },
  {
    id: 'page-transition',
    title: 'Page transition',
    category: 'Motion',
    group: 'Motion',
    description: 'Transiciones entre vistas al cambiar de estado.',
    trigger: 'Pulsa otra vista',
    component: PageTransition,
    color: 'pink',
  },
  {
    id: 'gsap-react',
    title: 'GSAP React',
    category: 'GSAP React',
    group: 'React + GSAP',
    description: 'Animación con scope, limpieza y microinteracción.',
    trigger: 'Pulsa repetir microinteracción',
    component: HeroMotion,
    color: 'mint',
  },
]

const filters = ['Todas', 'CSS y navegador', 'GSAP', 'Motion', 'React + GSAP', '3D y WebGL', 'Lottie']

function App() {
  const [filter, setFilter] = useState('Todas')
  const [selectedId, setSelectedId] = useState(demos[0].id)
  const [frameVersion, setFrameVersion] = useState(0)
  const previewRef = useRef(null)

  const visibleDemos = useMemo(
    () => demos.filter((demo) => filter === 'Todas' || demo.group === filter),
    [filter],
  )
  const selectedDemo = demos.find((demo) => demo.id === selectedId)
  const SelectedComponent = selectedDemo?.component

  function selectDemo(demo) {
    setSelectedId(demo.id)
    setFrameVersion((version) => version + 1)
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      previewRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  function restartDemo() {
    setFrameVersion((version) => version + 1)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Motion Lab, inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>motion<span className="brand-light">lab</span></span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> {demos.length} demos interactivas</div>
      </header>

      <section className="intro" id="inicio">
        <p className="eyebrow">WEB ANIMATION ENGINEERING <span>·</span> LABORATORIO</p>
        <h1>Movimiento con <span>intención.</span></h1>
        <p className="intro-copy">
          Explora patrones de animación web. Elige una tarjeta para abrir la demo aquí mismo.
        </p>
      </section>

      <section className="catalog" aria-label="Catálogo de animaciones">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">EL CATÁLOGO</p>
            <h2>Elige una animación</h2>
          </div>
          <div className="filters" role="group" aria-label="Filtrar animaciones">
            {filters.map((item) => (
              <button
                className={`filter-chip${filter === item ? ' active' : ''}`}
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-grid">
          {visibleDemos.map((demo, index) => (
            <button
              className={`demo-card${selectedId === demo.id ? ' selected' : ''}`}
              key={demo.id}
              type="button"
              aria-pressed={selectedId === demo.id}
              onClick={() => selectDemo(demo)}
            >
              <span className={`card-visual ${demo.color}`} aria-hidden="true">
                <span className="visual-orbit orbit-one" />
                <span className="visual-orbit orbit-two" />
                <span className="visual-shape shape-one" />
                <span className="visual-shape shape-two" />
                <span className="visual-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="visual-type">{demo.category}</span>
              </span>
              <span className="card-body">
                <span className="card-title-row">
                  <span className="card-title">{demo.title}</span>
                </span>
                <span className="card-description">{demo.description}</span>
                <span className="card-trigger"><span className="trigger-icon" aria-hidden="true">↗</span>{demo.trigger}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {selectedDemo && (
        <section className="preview" aria-labelledby="preview-title" ref={previewRef}>
          <div className="preview-heading">
            <div>
              <p className="eyebrow">VISTA PREVIA <span>·</span> {selectedDemo.category.toUpperCase()}</p>
              <h2 id="preview-title">{selectedDemo.title}</h2>
            </div>
            <div className="preview-actions">
              <button className="secondary-button" type="button" onClick={restartDemo}>
                <span aria-hidden="true">↻</span> Reiniciar
              </button>
              {selectedDemo.path && (
                <a
                  className="secondary-button"
                  href={`/examples/${selectedDemo.path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir aparte <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
          {SelectedComponent ? (
            <div
              className={`component-preview${selectedDemo.id === 'product-3d-story' ? ' component-preview--immersive' : ''}`}
              key={`${selectedDemo.id}-${frameVersion}`}
            >
              <Suspense fallback={<p className="component-loading">Cargando la escena 3D…</p>}>
                <SelectedComponent />
              </Suspense>
            </div>
          ) : (
            <div className="frame-wrap">
              <iframe
                key={`${selectedDemo.id}-${frameVersion}`}
                title={`Demo: ${selectedDemo.title}`}
                src={`/examples/${selectedDemo.path}`}
                loading="eager"
              />
            </div>
          )}
          <p className="preview-hint">
            {selectedDemo.id === 'scroll-story'
              ? 'En una ventana amplia, desplázate dentro del recuadro para avanzar los capítulos. En móvil o con «Reducir movimiento», se leen en flujo normal.'
              : ['parallax', 'pinned-horizontal'].includes(selectedDemo.id)
              ? 'Desplázate dentro del recuadro para avanzar la animación. GSAP se sirve localmente.'
              : ['GSAP', 'Lottie'].includes(selectedDemo.group)
                ? 'La librería de esta demo se sirve localmente desde Motion Lab.'
              : `Para verla completa: ${selectedDemo.trigger.toLowerCase()}.`}
            {' '}Si tienes activado «Reducir movimiento» en el sistema, algunos efectos se muestran estáticos.
          </p>
        </section>
      )}

      <footer className="footer">
        <span>Motion Lab <span className="footer-separator">/</span> ejemplos web</span>
        <span>CSS primero · movimiento accesible</span>
      </footer>
    </main>
  )
}

export default App
