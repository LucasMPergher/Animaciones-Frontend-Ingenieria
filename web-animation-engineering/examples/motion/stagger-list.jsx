import { motion, stagger, useReducedMotion } from "motion/react";

const list = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.1) } }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

export default function StaggerList() {
  const reduce = useReducedMotion();

  return (
    <section>
      <p>Motion · variants y stagger</p>
      <motion.ul
        initial={reduce ? false : "hidden"}
        animate="visible"
        variants={list}
        style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}
      >
        {["Plan", "Animate", "Review"].map((label) => (
          <motion.li
            key={label}
            variants={item}
            transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
            style={{ padding: "1rem", borderRadius: "1rem", background: "#20283a", color: "white" }}
          >
            {label}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
