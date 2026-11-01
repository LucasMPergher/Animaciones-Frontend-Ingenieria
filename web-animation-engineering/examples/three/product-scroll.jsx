import { useCallback, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import './product-scroll.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const chapters = [
  {
    number: '01',
    title: 'Una silueta que se descubre',
    copy: 'Una botella de vidrio esculpido gira despacio mientras la escena queda a la vista. El scroll controla su recorrido, no una animación automática.',
    detail: 'FORMA · VIDRIO ESMERILADO',
  },
  {
    number: '02',
    title: 'La luz encuentra el material',
    copy: 'La cámara se acerca y la luz cálida recorre el vidrio, el líquido ámbar y el sello metálico. Cada cambio acompaña el capítulo que estás leyendo.',
    detail: 'MATERIAL · LUZ CÁLIDA',
  },
  {
    number: '03',
    title: 'Un giro para cerrar la historia',
    copy: 'El objeto completa el giro y vuelve hacia vos. En pantallas chicas o con movimiento reducido, la escena conserva una pose fija y el relato sigue completo.',
    detail: 'FINAL · ATELIER Nº 08',
  },
]

function makeBottleShape() {
  const shape = new THREE.Shape()
  shape.moveTo(-0.62, -1.02)
  shape.lineTo(0.62, -1.02)
  shape.quadraticCurveTo(0.82, -1.02, 0.82, -0.82)
  shape.lineTo(0.82, 0.48)
  shape.quadraticCurveTo(0.82, 0.67, 0.64, 0.74)
  shape.lineTo(0.37, 0.91)
  shape.lineTo(0.31, 1.08)
  shape.lineTo(-0.31, 1.08)
  shape.lineTo(-0.37, 0.91)
  shape.lineTo(-0.64, 0.74)
  shape.quadraticCurveTo(-0.82, 0.67, -0.82, 0.48)
  shape.lineTo(-0.82, -0.82)
  shape.quadraticCurveTo(-0.82, -1.02, -0.62, -1.02)
  return shape
}

function makeLiquidShape() {
  const shape = new THREE.Shape()
  shape.moveTo(-0.63, -0.84)
  shape.lineTo(0.63, -0.84)
  shape.lineTo(0.63, -0.06)
  shape.quadraticCurveTo(0.28, 0.04, 0, -0.02)
  shape.quadraticCurveTo(-0.34, -0.1, -0.63, -0.02)
  shape.closePath()
  return shape
}

function makeLabelTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const context = canvas.getContext('2d')
  if (!context) return null

  context.fillStyle = '#e5dac4'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = '#9a795a'
  context.lineWidth = 3
  context.strokeRect(18, 18, canvas.width - 36, canvas.height - 36)
  context.textAlign = 'center'
  context.fillStyle = '#473c32'
  context.font = '600 26px sans-serif'
  context.fillText('ATELIER  /  PARIS', 256, 90)
  context.font = '500 66px Georgia, serif'
  context.fillText('Nº 08', 256, 182)
  context.font = '500 22px sans-serif'
  context.letterSpacing = '5px'
  context.fillText('AMBRE · EAU DE PARFUM', 256, 238)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createProduct(scene) {
  const product = new THREE.Group()
  product.position.y = -0.05
  product.rotation.set(0.03, -0.38, 0)

  const bodyGeometry = new THREE.ExtrudeGeometry(makeBottleShape(), {
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.055,
    bevelThickness: 0.055,
    curveSegments: 12,
    steps: 1,
  })
  bodyGeometry.translate(0, 0, -0.21)
  const body = new THREE.Mesh(
    bodyGeometry,
    new THREE.MeshPhysicalMaterial({
      color: '#a9d0c8',
      metalness: 0.12,
      roughness: 0.16,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
      clearcoat: 0.8,
      clearcoatRoughness: 0.18,
    }),
  )
  product.add(body)

  const liquidGeometry = new THREE.ExtrudeGeometry(makeLiquidShape(), {
    depth: 0.31,
    bevelEnabled: false,
    curveSegments: 12,
    steps: 1,
  })
  liquidGeometry.translate(0, 0, -0.155)
  const liquid = new THREE.Mesh(
    liquidGeometry,
    new THREE.MeshStandardMaterial({
      color: '#b76832',
      metalness: 0.24,
      roughness: 0.26,
    }),
  )
  product.add(liquid)

  const labelTexture = makeLabelTexture()
  if (labelTexture) {
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(1.05, 0.66),
      new THREE.MeshBasicMaterial({ map: labelTexture, side: THREE.DoubleSide }),
    )
    label.position.set(0, -0.3, 0.225)
    product.add(label)
  }

  const gold = new THREE.MeshStandardMaterial({
    color: '#c8a86b',
    metalness: 0.82,
    roughness: 0.24,
  })
  const darkGold = new THREE.MeshStandardMaterial({
    color: '#705b3a',
    metalness: 0.74,
    roughness: 0.3,
  })
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.19, 40), gold)
  neck.position.y = 1.13
  product.add(neck)

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.47, 48, 1), darkGold)
  cap.position.y = 1.45
  product.add(cap)

  const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.28, 0.055, 48), gold)
  capTop.position.y = 1.715
  product.add(capTop)

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.275, 0.022, 10, 48), gold)
  collar.rotation.x = Math.PI / 2
  collar.position.y = 1.2
  product.add(collar)

  const orbit = new THREE.Group()
  orbit.name = 'product-orbit'
  const orbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.24, 0.008, 8, 120),
    new THREE.MeshBasicMaterial({ color: '#d3c08b', transparent: true, opacity: 0.56 }),
  )
  orbitRing.rotation.set(1.14, 0.25, -0.4)
  orbit.add(orbitRing)

  const orbitDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 16, 12),
    new THREE.MeshStandardMaterial({ color: '#f4e6c4', emissive: '#6f5835', emissiveIntensity: 0.45 }),
  )
  orbitDot.position.set(0.92, 0.8, 0.52)
  orbit.add(orbitDot)
  product.add(orbit)

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.12, 48),
    new THREE.MeshBasicMaterial({ color: '#090d12', transparent: true, opacity: 0.48 }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.scale.set(1.15, 0.54, 1)
  shadow.position.set(0, -1.42, 0)
  product.add(shadow)

  scene.add(product)
  return { product, orbit }
}

function disposeScene(scene, renderer) {
  scene.traverse((object) => {
    object.geometry?.dispose()
    if (Array.isArray(object.material)) {
      object.material.forEach((material) => {
        material.map?.dispose()
        material.dispose()
      })
    } else if (object.material) {
      object.material.map?.dispose()
      object.material.dispose()
    }
  })
  renderer.dispose()
}

function useMediaQuery(query) {
  const subscribe = useCallback((onChange) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default function ProductScrollStory() {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const chaptersRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const productRef = useRef(null)
  const orbitRef = useRef(null)
  const warmLightRef = useRef(null)
  const renderRef = useRef(() => {})
  const currentStepRef = useRef(0)
  const storyId = useId().replaceAll(':', '')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isWide = useMediaQuery('(min-width: 760px)')
  const [webglReady, setWebglReady] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useLayoutEffect(() => {
    const host = canvasRef.current
    if (!host) return undefined

    let renderer
    let resizeObserver

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.1
      renderer.setClearColor(0x000000, 0)
      host.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50)
      camera.position.set(0.12, 0.08, 6.9)
      camera.lookAt(0, 0, 0)

      scene.add(new THREE.HemisphereLight('#dce9ff', '#241b19', 1.75))

      const keyLight = new THREE.DirectionalLight('#fff0d0', 2.7)
      keyLight.position.set(-3.2, 4.4, 4.2)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight('#a4d8d3', 1.5)
      fillLight.position.set(3.4, 1.2, 2.6)
      scene.add(fillLight)

      const warmLight = new THREE.PointLight('#f3a15b', 1.15, 9)
      warmLight.position.set(0.4, -0.25, 3)
      scene.add(warmLight)

      const { product, orbit } = createProduct(scene)
      rendererRef.current = renderer
      sceneRef.current = scene
      cameraRef.current = camera
      productRef.current = product
      orbitRef.current = orbit
      warmLightRef.current = warmLight

      const render = () => {
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }
      renderRef.current = render

      function resize() {
        const width = host.clientWidth
        const height = host.clientHeight
        if (!width || !height) return
        camera.aspect = width / height
        camera.position.z = width < 420 ? 7.3 : 6.9
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
        render()
      }

      resize()
      resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize)
      resizeObserver?.observe(host)
      setWebglReady(true)
    } catch {
      resizeObserver?.disconnect()
      if (renderer) renderer.dispose()
      host.replaceChildren()
      setWebglReady(false)
    }

    return () => {
      resizeObserver?.disconnect()
      if (sceneRef.current && rendererRef.current) {
        disposeScene(sceneRef.current, rendererRef.current)
      } else {
        renderer?.dispose()
      }
      rendererRef.current = null
      sceneRef.current = null
      cameraRef.current = null
      productRef.current = null
      orbitRef.current = null
      warmLightRef.current = null
      renderRef.current = () => {}
      host.replaceChildren()
    }
  }, [])

  useGSAP(() => {
    const product = productRef.current
    const camera = cameraRef.current
    const orbit = orbitRef.current
    const warmLight = warmLightRef.current
    if (!webglReady || !product || !camera || !orbit || !warmLight) return

    const renderStaticScene = () => {
      currentStepRef.current = 0
      setActiveStep(0)
      product.rotation.set(0.03, -0.38, 0)
      orbit.rotation.set(0, 0, 0)
      camera.position.set(0.12, 0.08, canvasRef.current?.clientWidth < 420 ? 7.3 : 6.9)
      warmLight.intensity = 1.15
      camera.lookAt(0, 0, 0)
      renderRef.current()
    }

    if (reduceMotion || !isWide) {
      renderStaticScene()
      return
    }

    const setCurrentStep = (nextStep) => {
      if (currentStepRef.current === nextStep) return
      currentStepRef.current = nextStep
      setActiveStep(nextStep)
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: chaptersRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextStep = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length))
          setCurrentStep(nextStep)
        },
      },
      onUpdate: () => renderRef.current(),
    })

    timeline
      .to(product.rotation, { y: 1.02, x: -0.04, z: 0.025, duration: 1, ease: 'none' }, 0)
      .to(warmLight, { intensity: 1.85, duration: 1, ease: 'none' }, 0)
      .to(product.rotation, { y: 3.18, x: 0.06, z: -0.025, duration: 1, ease: 'none' }, 1)
      .to(camera.position, { z: 6.35, y: 0.13, duration: 1, ease: 'none' }, 1)
      .to(warmLight, { intensity: 2.15, duration: 1, ease: 'none' }, 1)
      .to(product.rotation, { y: Math.PI * 2 - 0.38, x: 0.02, z: 0, duration: 1, ease: 'none' }, 2)
      .to(orbit.rotation, { z: Math.PI * 0.42, duration: 1, ease: 'none' }, 2)
      .to(camera.position, { z: 6.9, y: 0.08, duration: 1, ease: 'none' }, 2)

    renderRef.current()
  }, {
    scope: rootRef,
    dependencies: [webglReady, isWide, reduceMotion],
    revertOnUpdate: true,
  })

  return (
    <section
      className={`product-story${webglReady && isWide && !reduceMotion ? ' product-story--scroll' : ''}`}
      ref={rootRef}
      aria-labelledby={`${storyId}-title`}
    >
      <header className="product-story__intro">
        <p className="product-story__eyebrow">THREE.JS · WEBGL · SCROLL STORY</p>
        <h3 id={`${storyId}-title`}>Una historia en tres dimensiones</h3>
        <p>
          Un objeto construido en código rota y cambia con tu recorrido. Desplazate por los capítulos para explorar la escena.
        </p>
      </header>

      <div className="product-story__layout">
        <div className="product-story__visual-column">
          <p className="product-story__sr-only" id={`${storyId}-scene-description`}>
            Frasco de perfume ámbar creado con geometría 3D. En escritorio, el scroll lo rota y cambia la luz a lo largo de tres capítulos.
          </p>
          <div className="product-story__visual" role="img" aria-labelledby={`${storyId}-scene-description`}>
            <div className="product-story__canvas" ref={canvasRef} aria-hidden="true" />
            {!webglReady && (
              <svg className="product-story__fallback" viewBox="0 0 360 420" aria-hidden="true" focusable="false">
                <defs>
                  <linearGradient id={`${storyId}-fallback-glass`} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#c2e4d6" stopOpacity=".72" />
                    <stop offset="1" stopColor="#9db3c1" stopOpacity=".28" />
                  </linearGradient>
                  <linearGradient id={`${storyId}-fallback-amber`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#e6a254" />
                    <stop offset="1" stopColor="#85431f" />
                  </linearGradient>
                </defs>
                <ellipse cx="180" cy="359" rx="95" ry="22" fill="#080b10" opacity=".42" />
                <rect x="146" y="52" width="68" height="67" rx="11" fill="#8f714b" />
                <rect x="137" y="116" width="86" height="26" rx="6" fill="#c9a66c" />
                <path d="M124 151h112l28 27v153q0 20-20 20H116q-20 0-20-20V178z" fill={`url(#${storyId}-fallback-glass)`} stroke="#e2f4e9" strokeOpacity=".6" strokeWidth="5" />
                <path d="M110 247q70-23 140 0v79q0 14-14 14h-112q-14 0-14-14z" fill={`url(#${storyId}-fallback-amber)`} />
                <rect x="119" y="228" width="122" height="62" rx="2" fill="#e5dac4" />
                <text x="180" y="254" fill="#473c32" fontSize="12" textAnchor="middle" fontFamily="serif">ATELIER</text>
                <text x="180" y="278" fill="#473c32" fontSize="20" textAnchor="middle" fontFamily="serif">Nº 08</text>
              </svg>
            )}

            <div className="product-story__visual-topline" aria-hidden="true">
              <span>STUDIO OBJECT / 008</span>
              <span>3D SCENE</span>
            </div>
            <div className="product-story__visual-caption" aria-live="polite">
              <span>{chapters[activeStep].number}</span>
              <span>{chapters[activeStep].detail}</span>
            </div>
          </div>
          {!webglReady && (
            <p className="product-story__fallback-note">La vista 3D no está disponible en este navegador; el producto sigue visible en una ilustración estática.</p>
          )}
          {reduceMotion && (
            <p className="product-story__mode-note">Escena estática según tu preferencia de movimiento reducido.</p>
          )}
          {!reduceMotion && !isWide && (
            <p className="product-story__mode-note">En pantallas chicas, la escena permanece quieta para dejar espacio al contenido.</p>
          )}
        </div>

        <div className="product-story__chapters" ref={chaptersRef} role="list" aria-label="Capítulos de la presentación del producto">
          {chapters.map((chapter, index) => (
            <article
              className={`product-story__chapter${activeStep === index ? ' is-active' : ''}`}
              key={chapter.number}
              role="listitem"
              aria-current={activeStep === index ? 'step' : undefined}
            >
              <p className="product-story__chapter-number">CAPÍTULO {chapter.number}</p>
              <h4>{chapter.title}</h4>
              <p>{chapter.copy}</p>
              <span className="product-story__chapter-detail">{chapter.detail}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
