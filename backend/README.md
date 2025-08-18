## 🛠️ Stack Tecnológico

- **Runtime**: Node.js
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Containerización**: Docker
- **Gestor de Paquetes**: npm

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- Docker
- npm o yarn

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

```bash
# Iniciar PostgreSQL con Docker
docker-compose up -d

# Ejecutar migraciones de base de datos
npx prisma migrate dev

# Generar cliente de Prisma
npx prisma generate
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

## 📚 Endpoints de la API

### Empleados

- `GET /api/employees` - Obtener todos los empleados
- `POST /api/employees` - Crear nuevo empleado
- `GET /api/employees/inside` - Obtener empleados actualmente en la empresa

### Asistencia

- `POST /api/attendance/check-in` - Registrar ingreso de empleado
- `POST /api/attendance/check-out` - Registrar egreso de empleado

## 🗄️ Esquema de Base de Datos

### Empleado

- `id`: Identificador único
- `name`: Nombre completo del empleado
- `document_number`: DNI del empleado (único)
- `createdAt`: Timestamp de creación del registro
- `updatedAt`: Timestamp de última actualización

### Asistencia

- `id`: Identificador único
- `employeeId`: Referencia al empleado
- `checkInTime`: Timestamp de ingreso
- `checkOutTime`: Timestamp de egreso (nullable)
- `totalTime`: Tiempo total en la empresa (en minutos)
- `createdAt`: Timestamp de creación del registro
- `updatedAt`: Timestamp de última actualización

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env` en el directorio raíz:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/attendance_db"
PORT=3000
NODE_ENV=development
```