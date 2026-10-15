# Sistema Backend de Turnos y Reservas - Pre-entrega 4

Este repositorio contiene la cuarta pre-entrega del proyecto, enfocada en la **Organización de la API con Routers y Controllers**. El objetivo principal de esta versión es mejorar la arquitectura interna del código mediante la separación de responsabilidades, preparando el proyecto para futuras integraciones con bases de datos y patrones de diseño más avanzados[cite: 1].

## Arquitectura y Separación de Responsabilidades

El proyecto ha sido refactorizado en tres capas principales cumpliendo con los criterios de aceptación:

1. **Rutas (`/routes`)**: Se encargan exclusivamente de definir los endpoints de la API y dirigir la petición (`request`) al controlador correspondiente. No contienen lógica de negocio ni manipulan datos.
2. **Controladores (`/controllers`)**: Actúan como intermediarios. Reciben la petición del router, extraen la información necesaria (`req.params`, `req.query`, `req.body`), invocan a los Managers para procesar los datos y finalmente construyen y envían la respuesta al cliente (`res.status().json()`).
3. **Managers (`/managers`)**: Contienen toda la lógica de acceso y manipulación de datos en archivos JSON locales. Operan de manera completamente independiente de las peticiones HTTP (no utilizan `req` ni `res`).

## Estructura del Proyecto

El código está organizado siguiendo la estructura solicitada

```text
src/
  config/
    env.config.js
  controllers/
    services.controller.js
    bookings.controller.js
  managers/
    ServiceManager.js
    BookingManager.js
  routes/
    services.router.js
    bookings.router.js
  data/
    services.json
    bookings.json
  app.js
  server.js
package.json
.env.example
.gitignore
README.md

