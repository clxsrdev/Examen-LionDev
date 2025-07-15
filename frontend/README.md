# Frontend – Aplicación de Reservas de Salas

Aplicación web construida con Vue 3 y PrimeVue para la gestión de salas de juntas y sus reservas.  

Permite visualizar salas disponibles y ocupadas en tiempo real, realizar reservas con validación de horarios, y administrar un dashboard con estadísticas y gráficos.  

---

## Tecnologías

- Vue 3 (Composition API)
- PrimeVue
- Axios
- Vite

---

## Requisitos previos

- Node.js (versión recomendada ≥ 14)
- Backend REST en ejecución (ver repositorio `backend`)

---

## Instalación

Clona el repositorio y accede al directorio del frontend:

```
cd frontend
npm install
```

---

## Configuración

La URL base del backend está configurada directamente en el archivo:

```
src/service/api.js
```

Por defecto, tiene el valor:

```javascript
baseURL: 'http://localhost:3000'
```

Asegúrate de que esta URL apunte al backend en ejecución.

---

## Inicialización

Para desarrollo local:

```
npm run dev
```

La aplicación estará disponible por defecto en:

```
http://localhost:5173
```

El puerto puede variar según la configuración local de Vite.

---

## Estructura del proyecto

```
📦 src
 ┣ 📂 assets
 ┣ 📂 components
 ┣ 📂 layout
 ┣ 📂 router
 ┣ 📂 service
 ┣ 📂 tests
 ┣ 📂 views
 ┣ 📜 App.vue
 ┗ 📜 main.js
```

---

## Funcionalidades

- Visualización de salas con estado (ocupada o libre)
- Gestión completa de salas (crear, editar, eliminar)
- Creación de reservas con selección de horario de inicio y fin
  - Validación de duración máxima de 2 horas
  - Verificación de solapamiento con reservas activas
- Liberación manual de reservas antes de su horario de fin
- Dashboard con estadísticas de ocupación
  - Total de salas
  - Disponibles
  - Ocupadas
  - Gráfica de ocupación tipo donut
- Expansión en tablas para ver detalle de reservas por sala
- Refresco manual y lógica de actualización automática del estado

---

## Conexión al Backend

Esta aplicación consume la API REST desarrollada en el proyecto `backend`.  

Para su funcionamiento correcto, se debe tener el backend ejecutándose y accesible en la dirección configurada en el archivo:

```
src/service/api.js
```

Por defecto, la base URL del backend está definida así:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000',
});
```

Si necesitas usar otra dirección (por ejemplo para despliegue), edita directamente el valor de baseURL en ese archivo.

---

## Tests

Los tests unitarios se encuentran implementados en el **backend**, donde se validan las reglas críticas de negocio como la duración máxima de las reservas y el solapamiento de horarios.  

El frontend está estructurado para facilitar la adición de pruebas unitarias en la carpeta `/src/tests`, con funciones puras y componentes modulares que permiten una cobertura sencilla a futuro.

---

## Build para Producción

Para generar la versión optimizada para producción:

```
npm run build
```

Esto generará los archivos en la carpeta `dist/` listos para ser servidos en un servidor web.

---

## Notas

- El diseño utiliza PrimeVue para la construcción de la interfaz, con componentes como tablas, calendarios, botones y gráficos.
- La lógica de ocupación se calcula en tiempo real en el frontend a partir de la información de reservas activas.
- La liberación automática de reservas vencidas está implementada en el backend mediante un cron job que actualiza el estado de las reservas al llegar su horario de fin.

---

## Licencia

Este proyecto se entrega como parte de un examen técnico. Su código es abierto para revisión y evaluación.
```

---