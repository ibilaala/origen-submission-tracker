# Client & Company Submissions App

Aplicación web desarrollada con Next.js que permite a usuarios enviar formularios desde dos rutas distintas y ver las submissions en una cuadrícula responsive.

## Estructura

- `/`: Página principal con estadísticas y navegación
- `/for-clients`: Formulario para clientes
- `/for-companies`: Formulario para empresas

## Tecnologías

- Next.js (App Router)
- React
- TailwindCSS
- TypeScript
- Prisma + SQLite (o PostgreSQL)
- Gravatar/pravatar para avatares
- ESLint + Prettier
- GitHub Actions (CI/CD)

## Funcionalidades

- Formulario dinámico según ruta
- Validación de datos
- Guardado en base de datos
- Mostrar submissions en tarjetas (UI responsive)
- Modo claro/oscuro
- Avatar automático por email
- Estadísticas por género, edad, etc.
- CI/CD básico con verificación en cada PR

## Instrucciones para ejecutar

1. Asegúrate de tener instalado Node.js en tu equipo.  
2. Instala las dependencias:

```bash
npm install
