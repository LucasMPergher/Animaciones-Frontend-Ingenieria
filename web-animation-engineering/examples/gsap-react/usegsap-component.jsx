import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroMotion() {
  const root = useRef(null);
  const allowMotion = useRef(false);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        allowMotion.current = true;
        gsap.from(".title", { y: 24, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
        return () => {
          allowMotion.current = false;
        };
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [], revertOnUpdate: true }
  );

  const { contextSafe } = useGSAP({ scope: root });
  const replay = contextSafe(() => {
    if (!allowMotion.current) return;
    gsap.fromTo(".replay-target", { scale: 0.96 }, { scale: 1, duration: 0.25, overwrite: true });
  });

  return (
    <section ref={root} className="hero-motion">
      <p>GSAP React · useGSAP</p>
      <h1 className="title">Contenido listo en el primer render.</h1>
      <p className="replay-target">El scope evita seleccionar nodos fuera de este componente.</p>
      <button type="button" onClick={replay}>Repetir microinteracción</button>
    </section>
  );
}
