# ToDo List - Frontend

## Descripción

Este proyecto es la interfaz de usuario para una aplicación ToDo List, construida con Astro.js, Tailwind CSS y Alpine.js. Permite a los usuarios visualizar, agregar, editar y eliminar tareas.

## Estructura del Proyecto

- **`src/pages/index.astro`**: Página principal que muestra la lista de tareas.
- **`src/components/TasksList.astro`**: Componente para mostrar la lista de tareas.
- **`src/ui/ToDoListLogo.astro`**: Componente para el logo de la lista de tareas.
- **`src/layouts/Layout.astro`**: Layout principal para la aplicación.
- **`src/styles/base.css`**: Archivo de estilos base.
- **`src/styles/shared.css`**: Archivo de estilos compartidos.
- **`app.js`**: Archivo JavaScript que maneja la lógica del CRUD y la comunicación con la API.
- **`tailwind.config.js`** y **`tailwind.config.mjs`**: Archivos de configuración de Tailwind CSS.

## Instalación

1. **Clonar el Repositorio**

   ```bash
   git clone <https://github.com/sbarcenasdu/todo-list.git>
   cd <todo-list>
   ```

2. **Instalar Dependencias**

   Asegúrate de tener [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) instalados. Luego, ejecuta:

   ```bash
   pnpm install
   ```

3. **Configurar Tailwind CSS**

   Si aún no lo has hecho, ejecuta el siguiente comando para generar el archivo de configuración de Tailwind:

   ```bash
   npx tailwindcss init
   ```

4. **Ejecutar el Proyecto**

   Para iniciar el servidor de desarrollo, ejecuta:

   ```bash
   pnpm dev
   ```

   La aplicación estará disponible en `http://localhost:3000`.

## Uso

- **Página Principal**: Muestra la lista de tareas.
- **Agregar Tarea**: Haz clic en el botón de agregar tarea para abrir el modal y añadir una nueva tarea.
- **Editar Tarea**: Haz clic en el botón de editar en una tarea para modificarla.
- **Eliminar Tarea**: Haz clic en el botón de eliminar para borrar una tarea.

## Documentación

Para más detalles sobre Astro.js, Tailwind CSS y Alpine.js, consulta la documentación oficial:

- [Astro.js](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Alpine.js](https://alpinejs.dev/start-here)
