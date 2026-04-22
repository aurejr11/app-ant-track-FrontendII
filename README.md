
AntTrack – Control de Gastos Hormiga

AntTrack es una aplicación desarrollada en React con Vite,  diseñada para identificar, registrar y controlar los llamados gastos hormiga, que son los pequeños consumos diarios que parecen insignificantes, pero que al final del mes impactan fuertemente tus finanzas personales y de tu familia.

La app permite llevar un seguimiento organizado y visual de tus gastos pequeños, facilitando la toma de decisiones financieras más conscientes y acertadas, revisando mes a mes cuales son tus gastos mas importantes inncesarios.

Objetivo

El objetivo de AntTrack es:

Identificar patrones de consumo innecesarios

Reducir fugas de dinero invisibles

Crear hábitos financieros más saludables

Tomar el control real de tu presupuesto

Participantes:

Aurelio Velasquez 
Maricela Ochoa
Julian Posada
Santiago Ramirez
Maria Fernanda Herrera




# 🚀 Landing Page — React Project

Una landing page moderna y responsiva construida con React, Tailwind CSS, React-Toastify y Google Fonts.

---

## 📁 Estructura del Proyecto

```
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ContactForm.jsx
│   ├── sections/
│   │   ├── SectionOne.jsx
│   │   └── SectionTwo.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Uso                                               |
|------------------|---------------------------------------------------|
| React 18         | Biblioteca principal de UI                        |
| Tailwind CSS     | Estilos utilitarios y diseño responsivo           |
| React-Toastify   | Notificaciones y alertas del formulario           |
| Google Fonts     | Tipografía personalizada y estilo visual          |
| Web3Forms        | Recepción y gestión de mensajes del formulario    |

---

## ✨ Componentes y Secciones

### 🔹 Navbar
Barra de navegación fija en la parte superior con enlaces de anclaje hacia las distintas secciones de la página. Responsiva con menú hamburguesa en móvil.

### 🔹 Header
Sección hero principal con título destacado, descripción y  dos botónes de llamada a la acción (comennzar gratis) y (Contacto)

### 🔹 Sección 1(Ant Track)
Primera sección de contenido con información relevante sobre el producto o servicio que se ofrece.

### 🔹 Sección 2(Asi funciona)
Segunda sección con características, incuidas unas cards, en la que se explica el funcionamiento.

### 🔹 Sección 3(Experiencias)
Tercera sección con 3 cards, con informacion de clientes.

### 🔹 Formulario de Contacto
Formulario interactivo con los siguientes campos:
- **Nombre** — Requerido
- **Email** — Requerido, con validación de formato
- **Mensaje** — Requerido

El envío se gestiona a través de **Web3Forms**, que recibe los mensajes y los reenvía al correo configurado. Las alertas de éxito o error se muestran con **React-Toastify**

### 🔹 Footer
Pie de página con información de la empresa, links de navegación y redes sociales.

---

## 📦 Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/aurejr11/app-ant-track-FrontendII
cd tu-repositorio
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Inicia el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Tailwind CSS

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Google Fonts

La fuente se importa en el `<head>` del archivo `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href=https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

Y se aplica globalmente en `src/index.css`:

```css
body {
  font-family: 'oufit', sans-serif;
}
```

---

### React-Toastify

En `App.jsx`, agrega el contenedor de notificaciones:

```jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <SectionOne />
      <SectionTwo />
      <ContactForm />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
```
### Web3Forms

El formulario utiliza [Web3Forms](https://web3forms.com/) para recibir mensajes sin necesidad de un backend propio. Los mensajes llegan directamente al correo electrónico asociado a tu `access_key`.


En el formulario, dispara las notificaciones así:

```jsx
import { toast } from 'react-toastify';

const handleSubmit = (e) => {
  e.preventDefault();
  // lógica de validación...
  toast.success('¡Mensaje enviado correctamente!');
  // en caso de error:
  // toast.error('Ocurrió un error. Inténtalo de nuevo.');
};
```

---

## 🚀 Scripts Disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Genera el build de producción
npm run preview   # Vista previa del build de producción
npm run lint      # Ejecuta el linter con ESLint
```

---

## 📱 Responsividad

El proyecto utiliza el sistema de breakpoints de Tailwind CSS:

| Breakpoint | Prefijo | Ancho mínimo |
|------------|---------|--------------|
| Mobile     | (base)  | 0px          |
| Tablet     | `md:`   | 768px        |
| Desktop    | `lg:`   | 1024px       |
| XL         | `xl:`   | 1280px       |


## base datos jsonserver

EL proyecto por ahora trabajara con una base de datos levantada en el mismo poryecto pero 
en diferente terminal.
para iniciar el backend en: npm run api, en otra terminal