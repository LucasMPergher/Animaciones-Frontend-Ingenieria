import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function ScrollReveal() {
  const target = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section style={{ minHeight: "110vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <motion.article
        ref={target}
        style={{
          y: reduce ? 0 : y,
          maxWidth: "38rem",
          padding: "2rem",
          borderRadius: "1.2rem",
          background: "#20283a",
          color: "white"
        }}
      >
        <p>Motion · useScroll + useTransform</p>
        <h2>Scroll-linked, sin renders por frame</h2>
        <p>El valor de movimiento acompaña el progreso del elemento por el viewport. Con reduced motion, la tarjeta queda quieta.</p>
      </motion.article>
    </section>
  );
}
