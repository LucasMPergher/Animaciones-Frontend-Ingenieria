import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const pages = [
  { id: "intro", title: "Inicio", copy: "Una transición acompaña el cambio de vista." },
  { id: "details", title: "Detalles", copy: "La navegación real debe seguir perteneciendo al router." },
  { id: "finish", title: "Final", copy: "El contenido permanece útil con reduced motion." }
];

export default function PageTransition() {
  const [page, setPage] = useState(pages[0]);
  const reduce = useReducedMotion();

  return (
    <section>
      <nav aria-label="Páginas de muestra" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {pages.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={page.id === item.id}
            onClick={() => setPage(item)}
          >
            {item.title}
          </button>
        ))}
      </nav>
      <AnimatePresence initial={false}>
        <motion.article
          key={page.id}
          aria-live="polite"
          initial={reduce ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
          transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
          style={{ marginTop: "1rem", minHeight: "12rem", padding: "1.5rem", borderRadius: "1rem", background: "#20283a", color: "white" }}
        >
          <h2>{page.title}</h2>
          <p>{page.copy}</p>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
