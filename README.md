# Web Animation Engineering

Este repositorio reúne el sistema de skills para crear animaciones web y la app usada para probar sus ejemplos.

## Qué incluye

- [`web-animation-engineering/`](web-animation-engineering/README.md): siete skills de Codex, documentación, validador y ejemplos CSS, GSAP, Motion, SVG, Canvas, Three.js/WebGL y Lottie.
- [`animation-lab/`](animation-lab/README.md): galería React + Vite con 24 demos ejecutables, incluidos una historia por scroll, transiciones de elemento compartido, morphs SVG, un carrusel con inercia y una escena de producto 3D.

## Probar la galería

```sh
cd animation-lab
npm ci
npm run dev
```

Abre la dirección local que indique Vite, normalmente <http://localhost:5173/>.

## Instalar las skills para todos tus proyectos Codex

```sh
cd web-animation-engineering
./install.sh
```

El instalador las copia a `~/.agents/skills`. Codex puede activarlas cuando una solicitud coincide con su descripción; también puedes invocar una skill concreta. Si no aparecen después de instalarlas, reinicia Codex.

## Validar el paquete de skills

```sh
cd web-animation-engineering
python -m pip install -r requirements-dev.txt
python scripts/validate_project.py
python -m unittest discover -s tests -v
```

Consulta [`GUIA_DE_ANIMACIONES.md`](web-animation-engineering/GUIA_DE_ANIMACIONES.md) para ver ideas de pedidos y prompts listos para adaptar.
