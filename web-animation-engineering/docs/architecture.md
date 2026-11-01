# Arquitectura

## Distribución

**skills/** contiene siete directorios que cumplen el formato Agent Skills: cada uno tiene su propio **SKILL.md** con frontmatter YAML y recursos de referencia opcionales. El material de detalle se carga solo cuando se necesita.

**animation-core** concentra el flujo común y el mapa de decisión. Las skills especializadas describen APIs y decisiones locales. **animation-quality** mantiene una lista transversal para que las skills de tecnología no repitan la guía completa de accesibilidad y rendimiento.

~~~text
skills/
├── animation-core/
│   ├── SKILL.md
│   └── references/
│       ├── technology-selection.md
│       └── framework-integration.md
├── animation-gsap/
├── animation-gsap-react/
├── animation-motion/
├── animation-css/
├── animation-visual-assets/
└── animation-quality/
~~~

## Flujo de orquestación

1. Interpretar el resultado visual, la interacción, los límites temporales y el entorno de ejecución solicitados.
2. Inspeccionar los archivos, el framework, el gestor de paquetes, las convenciones y las dependencias existentes.
3. Elegir CSS, Motion, GSAP, SVG, Canvas o Lottie con la matriz del núcleo; no añadir una librería para efectos que el navegador ya resuelve.
4. Consultar solo las skills especialistas necesarias y **animation-quality** cuando la animación implique movimiento relevante, interacción, scroll, React, SSR o ciclo de vida.
5. Proponer un plan breve si el cambio abarca varios archivos o tiene trade-offs; luego implementar en el estilo del repositorio.
6. Revisar responsive, reduced motion, accesibilidad, limpieza, renderizado inicial y conflictos entre propietarios de estilos.
7. Ejecutar las validaciones disponibles del proyecto y describir el resultado y las limitaciones observadas.

## Portabilidad

Las skills no importan código ni requieren dependencias de runtime. Las referencias son locales a cada skill para que copiar una skill por separado no rompa sus enlaces. Los ejemplos se instalan y ejecutan aparte del directorio de skills.

## Compatibilidad declarada

Las skills están escritas como directorios Agent Skills con un **SKILL.md** estándar. El script de instalación permite copiarlas al alcance de usuario (**~/.agents/skills**) o al alcance de proyecto (**.agents/skills**). La documentación actual de Codex indica que CLI y el IDE detectan skills en ambos alcances; reinicia Codex si una skill nueva no aparece.
