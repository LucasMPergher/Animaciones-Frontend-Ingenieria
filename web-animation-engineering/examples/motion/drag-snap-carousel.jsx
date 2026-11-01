import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import './drag-snap-carousel.css'

const stories = [
  {
    eyebrow: '01 / RITMO',
    title: 'Una pausa',
    copy: 'Dejá que el movimiento tenga espacio para respirar.',
    color: 'mint',
  },
  {
    eyebrow: '02 / DIRECCIÓN',
    title: 'Seguí el gesto',
    copy: 'El carrusel continúa el impulso con una inercia suave.',
    color: 'violet',
  },
  {
    eyebrow: '03 / DESTINO',
    title: 'Encontrá el ritmo',
    copy: 'Al soltar, la tarjeta más cercana queda alineada.',
    color: 'orange',
  },
  {
    eyebrow: '04 / RESPUESTA',
    title: 'Control claro',
    copy: 'También podés avanzar con botones o con las flechas.',
    color: 'blue',
  },
  {
    eyebrow: '05 / ACCESO',
    title: 'A tu manera',
    copy: 'El gesto funciona con mouse, tacto y teclado.',
    color: 'pink',
  },
]

const spring = { type: 'spring', stiffness: 360, damping: 38, mass: 0.8 }

function nearestStop(target, stops) {
  return stops.reduce((nearest, stop) => (
    Math.abs(stop - target) < Math.abs(nearest - target) ? stop : nearest
  ), stops[0] ?? 0)
}

export default function DragSnapCarousel() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const currentIndexRef = useRef(0)
  const x = useMotionValue(0)
  const shouldReduceMotion = useReducedMotion()
  const [geometry, setGeometry] = useState({ minX: 0, stops: [0] })
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    function measure() {
      const firstCard = track.querySelector('[data-slide]')
      const cardWidth = firstCard?.getBoundingClientRect().width ?? 0
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
      const step = cardWidth + gap
      const maxDistance = Math.max(0, track.scrollWidth - viewport.clientWidth)
      const distances = [0]

      if (step > 0) {
        for (let distance = step; distance < maxDistance; distance += step) {
          distances.push(distance)
        }
      }

      if (maxDistance > 0) {
        const remainder = maxDistance - distances[distances.length - 1]
        if (remainder > 1) {
          if (remainder < step * 0.2 && distances.length > 1) {
            distances[distances.length - 1] = maxDistance
          } else {
            distances.push(maxDistance)
          }
        }
      }

      const stops = distances.map((distance) => -distance)
      setGeometry((previous) => {
        const unchanged = Math.abs(previous.minX + maxDistance) < 0.5
          && previous.stops.length === stops.length
          && previous.stops.every((stop, index) => Math.abs(stop - stops[index]) < 0.5)
        return unchanged ? previous : { minX: -maxDistance, stops }
      })
    }

    measure()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(viewport)
    observer?.observe(track)
    return () => observer?.disconnect()
  }, [])

  useEffect(() => {
    const updateActiveStop = (latestX) => {
      const index = geometry.stops.reduce((nearestIndex, stop, candidateIndex) => (
        Math.abs(stop - latestX) < Math.abs(geometry.stops[nearestIndex] - latestX)
          ? candidateIndex
          : nearestIndex
      ), 0)

      if (index !== currentIndexRef.current) {
        currentIndexRef.current = index
        setActiveIndex(index)
      }
    }

    updateActiveStop(x.get())
    return x.on('change', updateActiveStop)
  }, [geometry.stops, x])

  function goTo(index) {
    const nextIndex = Math.max(0, Math.min(index, geometry.stops.length - 1))
    const destination = geometry.stops[nextIndex] ?? 0
    currentIndexRef.current = nextIndex
    setActiveIndex(nextIndex)

    if (shouldReduceMotion) {
      x.set(destination)
    } else {
      animate(x, destination, spring)
    }
  }

  function handleKeyDown(event) {
    if (event.target !== event.currentTarget) return

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(activeIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(activeIndex - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(geometry.stops.length - 1)
    }
  }

  function handleDragEnd() {
    if (!shouldReduceMotion) return

    const destination = nearestStop(x.get(), geometry.stops)
    x.set(destination)
  }

  const snapTarget = (target) => nearestStop(target, geometry.stops)
  const canMove = geometry.stops.length > 1

  return (
    <section className="drag-carousel" aria-label="Carrusel arrastrable con inercia y ajuste">
      <div className="drag-carousel__heading">
        <div>
          <p className="drag-carousel__eyebrow">MOTION · GESTO + INERCIA</p>
          <h3>Arrastrá y soltá</h3>
          <p className="drag-carousel__intro">
            Deslizá las tarjetas. El movimiento sigue tu impulso y se detiene en una posición cómoda.
          </p>
        </div>
        <span className="drag-carousel__counter" aria-label={`Parada ${activeIndex + 1} de ${geometry.stops.length}`}>
          {String(activeIndex + 1).padStart(2, '0')} <span>/ {String(geometry.stops.length).padStart(2, '0')}</span>
        </span>
      </div>

      <div className="drag-carousel__controls" aria-label="Controles del carrusel">
        <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={!canMove || activeIndex === 0} aria-label="Mostrar tarjetas anteriores">
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={!canMove || activeIndex === geometry.stops.length - 1} aria-label="Mostrar tarjetas siguientes">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div
        className="drag-carousel__viewport"
        ref={viewportRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Tarjetas de animación; usá las flechas para recorrerlas"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          className="drag-carousel__track"
          ref={trackRef}
          style={{ x }}
          drag={canMove ? 'x' : false}
          dragConstraints={{ left: geometry.minX, right: 0 }}
          dragElastic={0.08}
          dragMomentum={!shouldReduceMotion}
          dragTransition={{
            power: 0.78,
            timeConstant: 380,
            bounceStiffness: 320,
            bounceDamping: 34,
            modifyTarget: snapTarget,
          }}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: 'grabbing' }}
          role="list"
          aria-label="Historias del carrusel"
        >
          {stories.map((story) => (
            <article className={`drag-carousel__card drag-carousel__card--${story.color}`} data-slide key={story.eyebrow} role="listitem">
              <span className="drag-carousel__card-orbit" aria-hidden="true" />
              <span className="drag-carousel__card-index">{story.eyebrow}</span>
              <h4>{story.title}</h4>
              <p>{story.copy}</p>
            </article>
          ))}
        </motion.div>
      </div>

      <p className="drag-carousel__hint">
        Arrastrá, usá las flechas del teclado o los botones. {shouldReduceMotion
          ? 'La inercia está desactivada por la preferencia de movimiento reducido.'
          : 'Al soltar, la inercia encuentra la parada más cercana.'}
      </p>
    </section>
  )
}
