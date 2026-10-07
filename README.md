# Sistema Backend de Turnos y Reservas - API Inicial (Pre-entrega 3)

Este repositorio contiene la API REST funcional del Sistema de Turnos y Reservas, desarrollada con Node.js y Express. En esta etapa, el sistema gestiona dos recursos principales (`services` y `bookings`) manteniendo la persistencia de datos a través del sistema de archivos (File System).

## Arquitectura del Proyecto

El proyecto sigue una estructura modular basada en la separación de responsabilidades:

*   **`src/app.js`**: Configuración de Express, middlewares (JSON y URL-encoded) y conexión de los enrutadores.
*   **`src/server.js`**: Punto de entrada que levanta el servidor.
*   **`src/config/env.config.js`**: Gestión de variables de entorno.
*   **`src/routes/`**: Define los endpoints para `/api/services` y `/api/bookings`.
*   **`src/managers/`**: Clases `ServiceManager` y `BookingManager` encargadas de la lógica de negocio y 
       persistencia.

*   **`src/data/`**: Archivos `services.json` y `bookings.json` para el almacenamiento físico de los datos.

## Instalación y Configuración

1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install

   Endpoints de la API1. Recurso: Servicios (/api/services)MétodoRutaDescripciónGET/api/servicesDevuelve todos los servicios. Acepta filtros por query params: ?category=salud o ?available=true.GET/api/services/:sidDevuelve un servicio específico por ID (404 si no existe).POST/api/servicesCrea un servicio validando campos obligatorios (name, description, duration, price, category, available). El ID se genera automáticamente.PUT/api/services/:sidActualiza un servicio validando todos los campos. No modifica el ID.DELETE/api/services/:sidElimina un servicio específico por ID.2. Recurso: Reservas (/api/bookings)Las reservas inician con un array de servicios vacío. Los servicios se agregan posteriormente mediante su propio endpoint, el cual incrementa la cantidad (quantity) si el servicio ya existe en la reserva.MétodoRutaDescripciónPOST/api/bookingsCrea una reserva básica. Requiere enviar clientName, clientEmail, date y time.GET/api/bookings/:bidDevuelve una reserva específica por su ID (404 si no existe).POST/api/bookings/:bid/services/:sidAgrega un servicio a una reserva existente. Valida que tanto la reserva como el servicio existan en la base de datos.

   **Tecnologías Utilizadas**
Node.js

Express

Dotenv

File System (fs/promises)