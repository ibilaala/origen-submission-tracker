# Client & Company Submissions App

Aplicación web desarrollada con Next.js que permite a usuarios enviar formularios desde dos rutas distintas y visualizar las submissions en una cuadrícula responsiva.

## Estructura del Proyecto

- `/` — Página principal con estadísticas y navegación.
- `/for-clients` — Formulario para clientes.
- `/for-companies` — Formulario para empresas.

## Tecnologías Utilizadas

- Next.js (App Router)
- React
- TailwindCSS
- TypeScript
- Prisma con SQLite o PostgreSQL
- Gravatar / Pravatar para avatares automáticos
- ESLint y Prettier para calidad de código
- GitHub Actions para CI/CD

## Funcionalidades

- Formularios dinámicos según la ruta.
- Validación de datos en formularios.
- Almacenamiento de datos en base de datos.
- Visualización de submissions en tarjetas con UI responsiva.
- Soporte para modo claro y oscuro.
- Generación automática de avatar a partir del email.
- Estadísticas basadas en género, edad y otros.
- Integración básica de CI/CD con verificación automática en cada Pull Request.

## Instrucciones para Ejecutar el Proyecto

1. Verifica que tienes instalado Node.js (versión recomendada 16+).
2. Instala las dependencias:

   ```bash
   npm install

3. Configura la base de datos:

Si usas SQLite, la configuración viene por defecto.
Si prefieres PostgreSQL, ajusta la cadena de conexión en .env.

4. Inicializa la base de datos y aplica migraciones (si es necesario):

   ```bash
   npx prisma migrate dev
   
5. Ejecuta la aplicación en modo desarrollo:
   ```bash
   npm run dev

6. Abre tu navegador y accede a http://localhost:3000.
