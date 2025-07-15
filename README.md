# 🗂️ Sistema de Gestión de Salas de Juntas

Aplicación completa para la administración de salas de juntas y sus reservas.  

Incluye un **backend** en Node.js/Express con cron job para liberar reservas vencidas y un **frontend** en Vue 3 con PrimeVue para gestión visual y dashboard.  

---

## 🌐 Demo de funcionalidades

- Visualización de salas con estado (Ocupada / Libre)
- Reservar salas con validación de horario
- Evita solapamientos y duración mayor a 2 horas
- Liberación manual y automática de reservas vencidas
- CRUD completo de salas
- Dashboard con estadísticas y gráfico de ocupación

---

## ⚙️ Tecnologías principales

- **Backend:** Node.js, Express, Sequelize, PostgreSQL, node-cron
- **Frontend:** Vue 3, PrimeVue, Vite, Axios

---

## 📦 Estructura del Repositorio

```
📦 proyecto
 ┣ 📂 backend
 ┃ ┣ 📜 package.json
 ┃ ┣ 📜 README.md
 ┃ ┗ 📂 src
 ┗ 📂 frontend
   ┣ 📜 package.json
   ┣ 📜 README.md
   ┗ 📂 src
```

---

## 🚀 Instalación general

### 1️⃣ Clonar el repositorio

```
git clone https://github.com/clxsrdev/Examen-LionDev
cd proyecto
```

---

### 2️⃣ Backend

Ve al directorio del backend e instala dependencias:

```
cd backend
npm install
```

Crea el archivo `.env` con tus variables:

```
DB_NAME=nombre_base_datos
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

Inicializa la base de datos con los archivos `schema.sql` y `seed.sql` ubicados en `backend/DB`.

Inicia el servidor:

```
npm run dev
```

---

### 3️⃣ Frontend

En otra terminal:

```
cd frontend
npm install
```

La URL base del backend ya está configurada por defecto en el archivo `src/service/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;
```

Si necesitas cambiar la dirección del servidor backend (por ejemplo en despliegue), edita esa propiedad baseURL en api.js.

---

Inicia el servidor de desarrollo:

```
npm run dev
```

---

## 🗺️ Endpoints principales

### 📌 Salas
- `GET /salas`
- `POST /salas`
- `PUT /salas/:id`
- `DELETE /salas/:id`

### 📌 Reservas
- `GET /reservas`
- `POST /reservas`
- `POST /reservas/:id/liberar`
- `DELETE /reservas/:id`

### 📌 Dashboard
- `GET /dashboard/estadisticas`

---

## 🕒 Cron Job

El backend incluye un cron job con node-cron:

- Frecuencia: cada minuto (`* * * * *`)
- Función: libera automáticamente las reservas activas cuyo `horario_fin` ya pasó
- Cambia su estado a `liberada` y actualiza el horario de fin

---

## 🧪 Tests

✅ El **backend** incluye pruebas unitarias con Jest para validar la lógica de duración de reservas:  
- Duración máxima de 2 horas  
- Error en solapamientos  
- Error si el horario de fin es anterior al de inicio

✅ El **frontend** está estructurado para permitir fácilmente la incorporación de tests unitarios, con funciones puras y componentes modulares.

---

## 📈 Producción

Para generar la versión de producción del frontend:

```
cd frontend
npm run build
```

---

## 📌 Notas finales

- El diseño usa **PrimeVue** para tablas, calendarios y gráficos.  
- La lógica de ocupación se calcula en tiempo real en el frontend.  
- El cron job garantiza la liberación automática en el backend.  
- El proyecto sigue una arquitectura modular con separación clara de capas.

## 📝 Licencia

Este proyecto se entrega como parte de un examen técnico. Su código es abierto para revisión y evaluación.
