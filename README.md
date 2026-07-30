# 🍿 Cinema MCP Client — Frontend React

¡Bienvenido a la aplicación **Cinema MCP Client Frontend**! 🎬✨

Esta es una interfaz de usuario conversacional moderna, rápida y elegante desarrollada en **React 19**, **TypeScript** y **Tailwind CSS v4**. Está diseñada como cliente visual para interactuar con el ecosistema **Cinema MCP (Model Context Protocol)**, permitiendo a los usuarios consultar películas en cartelera, horarios de funciones, clasificaciones por edad y sugerencias mediante Inteligencia Artificial.

---

## 🚀 Características Principales

- 💬 **Interfaz de Chat Conversacional**: Chat moderno e intuitivo para interactuar con el modelo de lenguaje de cine.
- 📝 **Renderizado Rico de Markdown**: Interpretación completa de formato Markdown devuelto por la IA (títulos, negritas destacadas, listas numeradas/con viñetas y tablas de cartelera estilizadas).
- 🌓 **Switch de Tema Claro / Oscuro**: Toggle con animación fluida e íconos de Sol/Luna, con persistencia automática en `localStorage` y detección del tema del sistema operativo.
- ⚙️ **Configuración Dinámica de Endpoint**: Modal de ajustes para configurar en tiempo de ejecución la URL del servidor backend (predeterminado `/api/cinema/ask`).
- ⚡ **Sugerencias de Consulta Rápida (Chips)**: Botones interactivos para consultar la cartelera del día, horarios, precios de dulcería y estrenos con un solo clic.
- 🛡️ **Validación Estricta de Formularios**: Integración de **React Hook Form** y **Zod** para la gestión e inmutabilidad de estados y entradas de usuario.

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
|---|---|
| **React 19** | Biblioteca principal de UI para componentes declarativos. |
| **TypeScript** | Tipado estático y seguridad de código. |
| **Vite** | Bundler ultrarrápido con HMR (Hot Module Replacement). |
| **Tailwind CSS v4** | Estilizado moderno con clases utilitarias y soporte para variantes `dark:`. |
| **Zustand** | Gestión del estado global (`themeStore` y `chatStore`). |
| **React Hook Form + Zod** | Manejo y validación estricta de formularios. |
| **React Markdown + Remark GFM** | Renderizador de respuestas enriquecidas con soporte para tablas GitHub. |
| **Lucide Icons** | Conjunto de íconos vectoriales modernos y limpios. |

---

## 📁 Estructura del Proyecto

```text
src/
├── components/          # Componentes de UI (Header, ChatMessage, ChatInput, QuickPrompts, SettingsModal, MarkdownRenderer)
├── stores/              # Estado global con Zustand (themeStore.ts, chatStore.ts)
├── types/               # Interfaces y definiciones de TypeScript (cinema.ts)
├── utils/               # Funciones utilitarias (cn.ts)
├── App.tsx              # Componente principal y maquetación general
├── index.css            # Configuración global de estilos e imports de Tailwind CSS
└── main.tsx             # Punto de entrada de la aplicación React
```

---

## ⚙️ Requisitos Previos

- **Node.js**: Versión 18 o superior (Recomendado Node v22+).
- **npm** o **yarn**.
- **Backend Cinema MCP**: Microservicios `6-cinema-mcp-server` (puerto 8081) y `7-cinema-mcp-client` (puerto 8080) o backend compatible con el endpoint `GET /api/cinema/ask?q=...`.

---

## 💻 Instalación y Ejecución

### 1. Clonar el repositorio e instalar dependencias:
```bash
git clone https://github.com/andresguzf/cinema-react.git
cd cinema-react
npm install
```

### 2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en **`http://localhost:3000`**.

### 3. Compilar para producción:
```bash
npm run build
```

---

## 🔌 Conexión con el Backend

Por defecto, Vite redirige las peticiones `/api` al backend local que corre en el puerto `8080` (Spring Boot MCP Client). Puedes modificar este comportamiento en el archivo `vite.config.ts` o directamente desde el botón de **Configuración (⚙️)** en el encabezado de la aplicación.
