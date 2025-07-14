# Backend – API de Reservas de Salas

API REST para gestionar salas de juntas y sus reservas, con cron job para liberar automáticamente las vencidas.

---

## Tecnologías

- Node.js
- Express
- Sequelize (PostgreSQL)
- node-cron
- dotenv

---

## Requisitos previos

- Node.js (versión recomendada ≥ 14)
- PostgreSQL

---

## Instalación

Clona el repositorio y ve al directorio del backend:

```
cd backend
npm install
```

---

## Configuración

Crea un archivo `.env` en `/backend` con las siguientes variables:

```
DB_NAME=nombre_base_datos
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

---

## Inicialización de la Base de Datos

El proyecto incluye los archivos `schema.sql` y `seed.sql` en el directorio `DB` para facilitar la creación y el poblado de la base de datos.

**Pasos sugeridos:**

1. Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE nombre_base_datos;
```

2. Conectarse a la base de datos:

```bash
psql -d nombre_base_datos
```

3. Ejecutar el esquema:

```bash
\i backend/DB/schema.sql
```

4. Insertar datos de ejemplo:

```bash
\i backend/DB/seed.sql
```

---

## Scripts

- Iniciar en producción:

```
npm start
```

- Iniciar en desarrollo con nodemon:

```
npm run dev
```

---

## Estructura del proyecto

```
/src
  /models
  /services
  /controllers
  /routes
  /utils
  /jobs
  app.js
  server.js
```

---

## Funcionalidades

- CRUD completo para Salas.
- CRUD para Reservas con:
  - Validación de duración ≤ 2 horas.
  - Validación de no solapamiento.
- Cron job:
  - Cada minuto libera reservas cuyo horario_fin ya pasó.

---

## Endpoints

### Salas

- `GET /salas`
- `POST /salas`
  Body JSON:
  ```
  {
    "nombre": "Sala A",
    "ubicacion": "Piso 1",
    "capacidad": 8
  }
  ```
- `PUT /salas/:id`
- `DELETE /salas/:id`

---

### Reservas

- `GET /reservas`
- `POST /reservas`
  Body JSON:
  ```
  {
    "sala_id": 1,
    "horario_inicio": "2025-07-12 10:00:00",
    "horario_fin": "2025-07-12 11:00:00"
  }
  ```
- `POST /reservas/:id/liberar`

---

## Cron Job

- Implementado con node-cron.
- Corre cada minuto.
- Cambia a 'liberada' cualquier reserva 'activa' cuyo horario_fin ya haya pasado.

## Tests

Este proyecto incluye tests unitarios para validar las funciones utilitarias.

Para ejecutar los tests, usa el siguiente comando en la carpeta `backend`:
```
npm test
```

Esto ejecutará todos los test suites definidos con Jest. Actualmente incluye pruebas para validar la función `validateDuration` del módulo de utilidades, verificando:

- Reservas con duración válida (≤ 2 horas).
- Error si la duración excede 2 horas.
- Error si la fecha de fin es anterior a la de inicio.
