# Instalación y uso

## Requisitos

- Codex CLI o Codex IDE con soporte para Agent Skills.
- **bash** para el instalador.
- Python 3.10 o posterior para validación.
- Node.js solo si se van a ejecutar las comprobaciones de sintaxis opcionales o preparar un ejemplo React.

## Instalar las skills

Desde la raíz de este paquete:

~~~sh
# Instalación para el usuario
./install.sh

# Instalación en un proyecto concreto
./install.sh /ruta/al/proyecto/.agents/skills
~~~

El instalador crea el destino si hace falta y se detiene si una carpeta de skill con el mismo nombre ya existe. No reemplaza una instalación previa. Para actualizar, revisa y fusiona las carpetas conscientemente.

La ubicación predeterminada es **~/.agents/skills** para que Codex las encuentre en todos tus proyectos. Para limitar la instalación a un repositorio, pasa la carpeta **.agents/skills** de ese repositorio como destino. Codex CLI y el IDE buscan skills dentro de **.agents/skills** en el proyecto; si una skill nueva no aparece, reinicia Codex.

## Usar las skills

Describe el resultado que buscas, dónde ocurre y qué debe conservarse. Por ejemplo:

> Añade una entrada progresiva al hero de la página. Respeta reduced motion y el patrón de componentes de este proyecto.

Codex debe activar **animation-core**, inspeccionar el repositorio y elegir una tecnología con el menor costo que cumpla el resultado. También puedes invocar una skill especializada, por ejemplo **$animation-css** o **$animation-gsap-react**, si ya conoces la tecnología adecuada.

## Verificar este paquete

~~~sh
python -m pip install -r requirements-dev.txt
python scripts/validate_project.py
python -m unittest discover -s tests -v
~~~

La instalación de PyYAML es solo para la validación de frontmatter; no forma parte de las skills ni de los ejemplos web.

## Probar ejemplos

Las páginas HTML funcionan en un servidor estático. Desde **examples/**, ejecuta **python -m http.server 8000** y abre **http://localhost:8000/**. GSAP y Lottie se cargan desde jsDelivr, por lo que esas demos requieren conexión. En producción, usa el gestor de paquetes ya presente y sirve las dependencias desde el propio build.

Los archivos JSX de Motion y GSAP React son componentes de ejemplo, no una app incluida en el paquete. Si quieres ejecutarlos, crea una app Vite + React en una carpeta separada y sigue [examples/README.md](../examples/README.md) para copiar el componente e instalar solo su librería.
