# Cómo ejecutar el proyecto (AutoMax)

El proyecto tiene dos partes:

| Parte | Carpeta | Puerto |
|---|---|---|
| Backend (Express + MongoDB + JWT) | `server-gonzalez-angel` | 5000 |
| Frontend (React + Vite) | `fixed-menu-angel/my-app2` | 5173 |

## Requisitos

- Node.js 20 o superior
- MongoDB corriendo en `localhost:27017`
  - Si no está iniciado: `net start MongoDB` (en PowerShell como administrador)

## 1. Instalar dependencias (solo la primera vez)

```powershell
cd practicas/angel-gonzalez/server-gonzalez-angel
npm install

cd ../fixed-menu-angel/my-app2
npm install
```

## 2. Crear el usuario administrador (solo la primera vez)

La base de datos empieza vacía, así que **sin este paso el login siempre falla**
con "Usuario o contraseña incorrectos" y nunca se genera el token.

```powershell
cd practicas/angel-gonzalez/fixed-menu-angel/my-app2
npm run seed
```

Crea esta cuenta:

- usuario: `admin`
- contraseña: `admin123`
- rol: `Admin`

Si el usuario ya existe, el comando no hace nada (se puede correr varias veces).

## 3. Ejecutar todo con un solo comando

```powershell
cd practicas/angel-gonzalez/fixed-menu-angel/my-app2
npm run dev:all
```

Levanta las dos partes a la vez:

- BACKEND → http://localhost:5000
- FRONTEND → **http://localhost:5173** ← abre esta en el navegador

Cuando arranca bien, en la consola aparece:

```
[BACKEND]  http://127.0.0.1:5000
[BACKEND]  MongoDB conectado correctamente: mongodb://localhost:27017/mayo2026_web_prof
[FRONTEND] ➜  Local: http://localhost:5173/
```

Para detener todo: `Ctrl + C`.

Si prefieres dos terminales separadas:

```powershell
# Terminal 1
cd practicas/angel-gonzalez/server-gonzalez-angel
npm start

# Terminal 2
cd practicas/angel-gonzalez/fixed-menu-angel/my-app2
npm run dev
```

## 4. Cómo probar la app

1. Abre http://localhost:5173 → aparece el **Login**.
2. Entra con `admin` / `admin123`.
3. Te lleva a `/mypage` (AutoMax). El nombre aparece en el menú.
4. Como el rol es `Admin`, en el menú se muestra el botón **🛡️ Administrador**
   que abre `/admin` con la lista de usuarios registrados.
5. **Cerrar sesión** borra la cookie del token y regresa al login.
6. Para crear más cuentas: botón "Crear una cuenta" en el login (`/reg`).

## Cómo funciona el token (JWT)

1. `POST /login` valida usuario y contraseña con bcrypt.
2. Si es correcto, firma un JWT con `{ id, user, rol }` y 2 horas de vigencia.
3. El token se guarda en una **cookie httpOnly** llamada `token`
   (el navegador la manda solo; no se guarda en localStorage).
4. Por eso todos los `fetch` al backend llevan `credentials: "include"`.
5. `GET /verificar-sesion` valida esa cookie y devuelve el usuario.
6. `GET /consultarUsuarios` y `GET /admin` además exigen rol Admin.

## Endpoints del backend

| Método | Ruta | Protección |
|---|---|---|
| POST | `/registrar` | pública |
| POST | `/login` | pública (entrega la cookie con el token) |
| GET | `/verificar-sesion` | requiere token |
| GET | `/admin` | requiere token + rol Admin |
| GET | `/consultarUsuarios` | requiere token + rol Admin |
| POST | `/logout` | pública (borra la cookie) |

## Problemas comunes

| Síntoma | Causa / solución |
|---|---|
| "Usuario o contraseña incorrectos" siempre | No hay usuarios en la BD → corre `npm run seed` |
| `Error conectando a MongoDB` | El servicio de MongoDB no está iniciado → `net start MongoDB` |
| `'vite' no se reconoce` / `Cannot find package` | Falta `npm install` en esa carpeta |
| `Port 5173 is already in use` | Ya hay otra instancia abierta → `npx kill-port 5173 5000` |
| El botón Administrador no aparece | El usuario no tiene rol Admin (revisa en `/admin` o vuelve a registrarlo) |
| `Failed to fetch` en el navegador | El backend no está corriendo en el puerto 5000 |
