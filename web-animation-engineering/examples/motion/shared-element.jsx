import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import './shared-element.css'

const pieces = [
  {
    id: 'dawn',
    title: 'Luz de tarde',
    category: 'Estudio de color · 01',
    description: 'Una composición cálida que cambia de escala sin perder el hilo visual entre la tarjeta y su detalle.',
    colors: ['#f5a56d', '#dc6d63', '#3e334f'],
    shape: 'sun',
  },
  {
    id: 'tide',
    title: 'Marea lenta',
    category: 'Estudio de forma · 02',
    description: 'Capas curvas y una paleta fría forman una escena que se expande desde la miniatura.',
    colors: ['#89c6bd', '#5b83a4', '#24334a'],
    shape: 'tide',
  },
  {
    id: 'signal',
    title: 'Señal nocturna',
    category: 'Estudio de luz · 03',
    description: 'Una figura brillante conecta dos estados de interfaz con una transición de elemento compartido.',
    colors: ['#d6e878', '#7fbf9a', '#29353f'],
    shape: 'signal',
  },
]

function Artwork({ piece }) {
  return (
    <svg viewBox="0 0 520 320" role="img" aria-label={'Ilustración abstracta: ' + piece.title}>
      <rect width="520" height="320" fill={piece.colors[2]} />
      {piece.shape === 'sun' && (
        <>
          <circle cx="365" cy="116" r="75" fill={piece.colors[0]} />
          <path d="M0 254 105 184l92 69 118-122 205 168v21H0Z" fill={piece.colors[1]} />
          <path d="m0 278 138-66 112 66 126-89 144 90v41H0Z" fill="#222c39" opacity=".7" />
        </>
      )}
      {piece.shape === 'tide' && (
        <>
          <circle cx="138" cy="106" r="44" fill={piece.colors[0]} />
          <path d="M0 197c82-60 160-61 235 0s143 61 285-9v132H0Z" fill={piece.colors[1]} />
          <path d="M0 239c94-53 170-52 257 1s163 55 263-2v82H0Z" fill={piece.colors[0]} opacity=".72" />
        </>
      )}
      {piece.shape === 'signal' && (
        <>
          <circle cx="260" cy="160" r="102" fill={piece.colors[0]} opacity=".12" />
          <circle cx="260" cy="160" r="68" fill="none" stroke={piece.colors[0]} strokeWidth="2" opacity=".6" />
          <rect x="228" y="128" width="64" height="64" rx="21" transform="rotate(18 260 160)" fill={piece.colors[0]} />
          <circle cx="350" cy="90" r="9" fill="#f6f3e8" />
          <path d="M70 235c78-92 302-124 386-7" fill="none" stroke={piece.colors[1]} strokeWidth="2" opacity=".7" />
        </>
      )}
      <path d="M0 20h520M0 300h520" stroke="#ffffff" strokeOpacity=".08" />
    </svg>
  )
}

function SharedElementDemo() {
  const [activePiece, setActivePiece] = useState(null)
  const reduceMotion = useReducedMotion()
  const detailTitleRef = useRef(null)
  const cardRefs = useRef(new Map())
  const focusPieceId = useRef(null)
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 250, damping: 28, mass: 0.85 }

  useEffect(() => {
    if (activePiece) {
      detailTitleRef.current?.focus({ preventScroll: true })

      function handleKeyDown(event) {
        if (event.key === 'Escape') setActivePiece(null)
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }

    if (focusPieceId.current) {
      cardRefs.current.get(focusPieceId.current)?.focus({ preventScroll: true })
      focusPieceId.current = null
    }
  }, [activePiece])

  function closeDetail() {
    focusPieceId.current = activePiece?.id
    setActivePiece(null)
  }

  return (
    <section className="shared-element-demo" aria-label="Transición de tarjeta a detalle">
      <div className="shared-demo-heading">
        <div>
          <p className="shared-eyebrow">MOTION · LAYOUT ID · ELEMENTO COMPARTIDO</p>
          <h2>Una tarjeta, dos escalas.</h2>
        </div>
        <p>Elegí una pieza para abrir el detalle. La imagen y el título mantienen su identidad durante el cambio.</p>
      </div>

      <LayoutGroup id="shared-gallery">
        <AnimatePresence initial={false}>
          {activePiece ? (
            <motion.article
              className="shared-detail"
              key="detail"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
              layoutId={'shared-card-' + activePiece.id}
            >
              <motion.div
                className="shared-artwork shared-artwork-detail"
                layoutId={'shared-art-' + activePiece.id}
                transition={transition}
              >
                <Artwork piece={activePiece} />
              </motion.div>
              <div className="shared-detail-copy">
                <motion.p
                  className="shared-eyebrow"
                  layoutId={'shared-category-' + activePiece.id}
                  transition={transition}
                >
                  {activePiece.category}
                </motion.p>
                <motion.h3
                  ref={detailTitleRef}
                  tabIndex={-1}
                  layoutId={'shared-title-' + activePiece.id}
                  transition={transition}
                >
                  {activePiece.title}
                </motion.h3>
                <p>{activePiece.description}</p>
                <p className="shared-detail-note">La ilustración y el título conservan su identidad entre ambos estados.</p>
                <button
                  className="shared-back-button"
                  type="button"
                  onClick={closeDetail}
                >
                  <span aria-hidden="true">←</span> Volver a la colección
                </button>
              </div>
            </motion.article>
          ) : (
            <motion.div
              className="shared-card-grid"
              key="collection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              aria-label="Colección de piezas"
            >
              {pieces.map((piece) => (
                <motion.button
                  className="shared-card"
                  key={piece.id}
                  ref={(node) => {
                    if (node) cardRefs.current.set(piece.id, node)
                    else cardRefs.current.delete(piece.id)
                  }}
                  type="button"
                  layoutId={'shared-card-' + piece.id}
                  transition={transition}
                  onClick={() => setActivePiece(piece)}
                >
                  <motion.div
                    className="shared-artwork"
                    layoutId={'shared-art-' + piece.id}
                    transition={transition}
                  >
                    <Artwork piece={piece} />
                  </motion.div>
                  <span className="shared-card-copy">
                    <motion.span
                      className="shared-eyebrow"
                      layoutId={'shared-category-' + piece.id}
                      transition={transition}
                    >
                      {piece.category}
                    </motion.span>
                    <motion.span
                      className="shared-card-title"
                      layoutId={'shared-title-' + piece.id}
                      transition={transition}
                    >
                      {piece.title}
                    </motion.span>
                    <span className="shared-card-hint">Abrir detalle <span aria-hidden="true">↗</span></span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
      <p className="shared-demo-hint">También podés cerrar con Escape. Al volver, el foco regresa a la tarjeta que abriste.</p>
    </section>
  )
}

export default SharedElementDemo
