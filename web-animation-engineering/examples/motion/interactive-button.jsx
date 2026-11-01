import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function InteractiveButton() {
  const [saved, setSaved] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-pressed={saved}
      onClick={() => setSaved((current) => !current)}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: reduce ? 0 : 0.16 }}
      style={{
        border: 0,
        borderRadius: 999,
        padding: "0.9rem 1.2rem",
        background: saved ? "#88f0c8" : "#dce6ff",
        color: "#10131c",
        font: "inherit",
        fontWeight: 700,
        cursor: "pointer"
      }}
    >
      {saved ? "Guardado" : "Guardar artículo"}
    </motion.button>
  );
}
