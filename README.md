```
██████╗ ███████╗ ██████╗██╗   ██╗███████╗██████╗ ██████╗  █████╗ ███╗   ███╗███████╗
██╔══██╗██╔════╝██╔════╝██║   ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗████╗ ████║██╔════╝
██████╔╝█████╗  ██║     ██║   ██║█████╗  ██████╔╝██║  ██║███████║██╔████╔██║█████╗
██╔══██╗██╔══╝  ██║     ██║   ██║██╔══╝  ██╔══██╗██║  ██║██╔══██║██║╚██╔╝██║██╔══╝
██║  ██║███████╗╚██████╗╚██████╔╝███████╗██║  ██║██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
```

> ★ **Gestiona los cumpleaños de tus seres queridos** ★  
> *Una PWA con alma de los 80s — neón, nostalgia y notificaciones.*

---

## ◆ STACK TECNOLÓGICO

| Capa | Tecnología |
|------|-----------|
| UI Framework | React 18 + Vite 5 |
| Estilos | Tailwind CSS 3 (paleta retro custom) |
| Backend | Firebase 10 — Firestore + Auth anónima |
| Routing | React Router DOM 6 |
| Fechas | date-fns 3 |
| Notificaciones | Browser Notification API + Sonner |
| Iconos | Lucide React |
| PWA | vite-plugin-pwa + Workbox |

---

## ◆ CARACTERÍSTICAS

```
┌─────────────────────────────────────────────────────────┐
│  ★  Dashboard ordenado por proximidad de cumpleaños      │
│  ★  5 tipos de relación con colores únicos               │
│     ▸ FAMILIA  ▸ AMIGO  ▸ PAREJA  ▸ TRABAJO  ▸ OTRO     │
│  ★  Modo dual: Firestore en la nube ↔ localStorage       │
│  ★  Notificaciones push del navegador                    │
│  ★  Aviso configurable: mismo día / 1 / 3 / 7 / 15 días │
│  ★  Acceso rápido a Email y WhatsApp desde cada tarjeta  │
│  ★  Instalable como app (PWA standalone)                 │
│  ★  100% en español                                      │
└─────────────────────────────────────────────────────────┘
```

---

## ◆ PALETA DE COLORES 80s

```
  ████  #E91E63  pink80    →  Acción principal · FAMILIA
  ████  #00BCD4  cyan80    →  Secundario      · AMIGO
  ████  #FFD740  gold80    →  Acento          · PAREJA
  ████  #6A1B9A  dark80.light → Trabajo
  ████  #1A0A2E  dark80    →  Texto / sombras
  ████  #FFF5E6  paper     →  Fondo general
```

---

## ◆ ESTRUCTURA DEL PROYECTO

```
recuerdame-pwa/
│
├── src/
│   ├── App.jsx                  ← Router principal + <Toaster>
│   ├── main.jsx                 ← Entry point
│   ├── index.css                ← Tailwind + clases .btn-80 .input-80…
│   │
│   ├── components/
│   │   ├── BirthdayCard.jsx     ← Tarjeta con editar / eliminar / contacto
│   │   ├── BirthdayForm.jsx     ← Formulario agregar / editar
│   │   ├── CountdownBadge.jsx   ← Badge: HOY · MAÑANA · N DÍAS
│   │   ├── EmptyState.jsx       ← Estado vacío con CTA
│   │   └── Layout.jsx           ← Header retro + nav inferior
│   │
│   ├── context/
│   │   └── BirthdaysContext.jsx ← Estado global (CRUD + settings)
│   │
│   ├── firebase/
│   │   └── config.js            ← Init Firebase + isFirebaseConfigured
│   │
│   ├── hooks/
│   │   └── useNotifications.js  ← Notificaciones push al abrir la app
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx        ← Lista principal (próximos / resto)
│   │   ├── AddBirthday.jsx      ← Página agregar
│   │   ├── EditBirthday.jsx     ← Página editar
│   │   └── Settings.jsx         ← Configuración y notificaciones
│   │
│   └── utils/
│       └── dateUtils.js         ← getDaysUntil · formatBirthdate · getAge
│
├── .env.example                 ← Variables de entorno requeridas
├── vite.config.js               ← PWA manifest + code splitting
└── tailwind.config.js           ← Paleta custom + fuentes + sombras retro
```

---

## ◆ INSTALACIÓN

### 1 · Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/recuerdame-pwa.git
cd recuerdame-pwa
npm install
```

### 2 · Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

> **Sin Firebase** la app funciona igual usando `localStorage` — perfecta para uso personal sin backend.

### 3 · Levantar en desarrollo

```bash
npm run dev
```

---

## ◆ SCRIPTS

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |

---

## ◆ CONFIGURAR FIREBASE

### Firestore — reglas mínimas

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/birthdays/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/settings/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Autenticación

Habilita **Anonymous** en Firebase Console → Authentication → Sign-in methods.

---

## ◆ MODELO DE DATOS

### Birthday

```js
{
  id:           string,          // Firestore doc ID
  name:         string,          // Nombre completo
  relationship: 'familia'        // familia | amigo | pareja | trabajo | otro
               | 'amigo'
               | 'pareja'
               | 'trabajo'
               | 'otro',
  birthdate:    'YYYY-MM-DD',    // Fecha de nacimiento
  email?:       string,          // Opcional — para acceso rápido
  whatsapp?:    string,          // Opcional — para acceso rápido
  createdAt:    Timestamp,       // Firestore server timestamp
}
```

### Settings

```js
{
  notificationDaysBefore: number[],  // [0, 1, 3, 7, 15]
  emailEnabled:           boolean,
  whatsappEnabled:        boolean,
  userEmail:              string,
  userWhatsapp:           string,
}
```

---

## ◆ NOTIFICACIONES

Al abrir la app, `useNotifications` revisa automáticamente los cumpleaños configurados y dispara notificaciones push del navegador según `notificationDaysBefore`.

```
◆ Hoy     →  "¡Hoy es el cumpleaños de {nombre}! 🎉"
◆ Mañana  →  "El cumpleaños de {nombre} es mañana 🎂"
◆ N días  →  "El cumpleaños de {nombre} es en {N} días 🎂"
```

Cada notificación se registra en `localStorage` para no repetirse en el mismo día.

---

## ◆ PWA — INSTALACIÓN EN DISPOSITIVO

La app es **instalable** en Android, iOS y escritorio:

```
Chrome / Edge  →  ícono de instalación en la barra de direcciones
Android        →  "Añadir a pantalla de inicio"
iOS Safari     →  Compartir → "Añadir a inicio"
```

El manifest configura:
- `display: standalone` — sin barra del navegador
- `theme_color: #7a1b34` — barra de estado vino
- `background_color: #f5f0e8` — splash screen crema
- Caché offline con Workbox (JS, CSS, HTML, imágenes, fuentes)

---

## ◆ DEPENDENCIAS

```
react              ^18.3.1   ── UI framework
react-dom          ^18.3.1   ── DOM renderer
react-router-dom   ^6.24.0   ── SPA routing
firebase           ^10.12.0  ── Firestore + Auth
date-fns           ^3.6.0    ── Utilidades de fecha
lucide-react       ^0.400.0  ── Iconos
sonner             ^2.0.7    ── Toast notifications
```

---

## ◆ ROADMAP

```
[ ] Integración Cloud Functions para email (SendGrid)
[ ] Integración Twilio para WhatsApp
[ ] Modo oscuro (paleta neón sobre negro)
[ ] Exportar / importar cumpleaños (JSON)
[ ] Compartir tarjeta de cumpleaños
```

---

```
★━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━★
          Hecho con ♥ y mucho neón  ·  MIT License
★━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━★
```
