# Validación y límites de cobertura

Desde la raíz, ejecuta:

~~~sh
python -m pip install -r requirements-dev.txt
python scripts/validate_project.py
python -m unittest discover -s tests -v
~~~

El validador comprueba que cada skill tenga frontmatter YAML válido, campos **name** y **description** correctos, nombre de carpeta coincidente, instrucciones no vacías, y que los enlaces locales a archivos existan. También comprueba el inventario de dependencias: los imports JS de las demos se comparan con una lista permitida, los scripts externos se limitan a las librerías GSAP/Lottie declaradas desde jsDelivr por HTTPS, los scripts locales deben existir, y los manifests JSON deben ser válidos. PyYAML es la única dependencia de desarrollo.

El validador también comprueba que el índice documente suficientes demos HTML/JSX, que todas las demos estén indexadas, que los HTML tengan estructura básica y que los scripts inline pasen **node --check** cuando Node.js está disponible.

Las pruebas comprueban el resultado del validador, la cobertura de las familias solicitadas, que las demos de React incluyan un tratamiento de reduced motion y que la skill principal no imponga una tecnología.

El control es estático: no instala las librerías web, no renderiza las páginas en distintos navegadores, no mide FPS ni evalúa manualmente contraste, interacción con lector de pantalla o comportamiento en todos los breakpoints. Antes de integrar un efecto de producción, ejecútalo en el proyecto real y revisa su resultado visual, reduced motion, teclado, consola y compatibilidad de navegadores.
