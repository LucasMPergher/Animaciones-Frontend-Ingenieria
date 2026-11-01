import { useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";

const initialCards = [
  { id: "a", title: "Sistema", color: "#314b67" },
  { id: "b", title: "Ritmo", color: "#654e86" },
  { id: "c", title: "Detalle", color: "#9a5d53" }
];

export default function CardLayout() {
  const [cards, setCards] = useState(initialCards);
  const reduce = useReducedMotion();

  function moveFirstToEnd() {
    setCards((current) => [...current.slice(1), current[0]]);
  }

  return (
    <section>
      <p>Motion · layout animation</p>
      <button type="button" onClick={moveFirstToEnd}>Reordenar tarjetas</button>
      <LayoutGroup>
        <motion.ul
          aria-label="Tarjetas de muestra"
          style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))", gap: "1rem", padding: 0 }}
        >
          {cards.map((card) => (
            <motion.li
              key={card.id}
              layout={!reduce}
              whileHover={reduce ? undefined : { y: -3 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
              style={{ minHeight: "10rem", padding: "1rem", borderRadius: "1rem", background: card.color, color: "white" }}
            >
              <h2>{card.title}</h2>
              <p>El orden de datos es la fuente de verdad.</p>
            </motion.li>
          ))}
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}
