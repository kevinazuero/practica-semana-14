# CRUD con JWT y OAuth

Sistema completo de autenticación y gestión de usuarios con Node.js, Express, MongoDB, React y Vite.

## Estructura del Proyecto
```
proyecto-unidad4/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   ├── models/
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── usuarios.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── Registro.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── .env
    └── package.json
```

## Tecnologías Utilizadas

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Bcrypt (bcryptjs)
- Passport (Google OAuth 2.0)
- CORS
- dotenv

### Frontend
- React
- Vite
- Axios

## Instalación

### 1. Clonar repositorio
```bash
git clone https://github.com/kevinazuero/practica-semana-14.git
cd proyecto-unidad4
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

**Crear archivo `.env`:**
```
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/dbname
PORT=5000
JWT_SECRET=tu_clave_secreta_super_segura
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
SESSION_SECRET=otra_clave_secreta
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
```

**Crear archivo `.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

## Ejecución en Desarrollo

### Backend
```bash
cd backend
npm run dev
```
Servidor corriendo en `http://localhost:5000`

### Frontend
```bash
cd frontend
npm run dev
```
Aplicación corriendo en `http://localhost:5173`

## Endpoints del API

### Autenticación

**POST** `/api/auth/registro`
- Body: `{ nombre, email, password, edad }`
- Registra nuevo usuario

**POST** `/api/auth/login`
- Body: `{ email, password }`
- Retorna: `{ token, usuario }`

**GET** `/api/auth/google`
- Inicia flujo OAuth con Google

**GET** `/api/auth/google/callback`
- Callback de Google OAuth

### Usuarios (Requieren token JWT)

**GET** `/api/usuarios`
- Lista todos los usuarios
- Header: `Authorization: Bearer <token>`

**GET** `/api/usuarios/:id`
- Obtiene usuario por ID
- Header: `Authorization: Bearer <token>`

**PUT** `/api/usuarios/:id`
- Actualiza usuario
- Body: campos a actualizar
- Header: `Authorization: Bearer <token>`

**DELETE** `/api/usuarios/:id`
- Elimina usuario
- Header: `Authorization: Bearer <token>`

## Configuración de Google OAuth

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Agregar URI de redirección: `http://localhost:5000/api/auth/google/callback`
6. Copiar Client ID y Client Secret al `.env`

## Funcionalidades

### Frontend

- **Registro de usuarios**: Formulario para crear cuenta
- **Login tradicional**: Email y password
- **Login con Google**: Autenticación OAuth 2.0
- **Dashboard**: Lista de usuarios registrados
- **Protección de rutas**: Solo accesible con token válido
- **Persistencia de sesión**: Token guardado en localStorage

### Backend

- **CRUD completo**: Crear, leer, actualizar y eliminar usuarios
- **Hash de contraseñas**: Bcrypt para seguridad
- **JWT**: Tokens de autenticación con expiración
- **OAuth 2.0**: Integración con Google
- **Middleware de autenticación**: Protección de rutas privadas
- **Validación**: Campos requeridos y únicos

## Estructura de Datos

### Modelo Usuario
```javascript
{
  nombre: String (requerido),
  email: String (requerido, único),
  password: String (requerido),
  edad: Number (opcional),
  timestamps: true
}
```

## Pruebas con Postman

### 1. Registro
```
POST http://localhost:5000/api/auth/registro
Body (JSON):
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456",
  "edad": 25
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

### 3. Obtener usuarios (con token)
```
GET http://localhost:5000/api/usuarios
Headers:
Authorization: Bearer <tu_token_aqui>
```

## Scripts Disponibles

### Backend
```bash
npm start       # Inicia servidor producción
npm run dev     # Inicia servidor desarrollo (nodemon)
```

### Frontend
```bash
npm run dev     # Inicia desarrollo
npm run build   # Build para producción
npm run preview # Preview del build
```

## Notas Importantes

- Las contraseñas se hashean automáticamente antes de guardar
- Los tokens JWT expiran en 24 horas
- El login con Google crea automáticamente el usuario si no existe
- CORS está configurado para permitir peticiones del frontend

