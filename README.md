# 🛠️ WordPress Component Dev Template

Este template demuestra cómo desarrollar **componentes modernos para WordPress** usando **Vite + Vanilla JS + CSS Modules**, con un flujo pensado para **desarrollo rápido, bundle optimizado y deploy automático**.

Incluye un ejemplo de **Price Table** dinámico que se convierte en un **shortcode de WordPress**:  
`[price_table]`

---

## 🚀 Features

- ⚡ **Vite Dev Server** con Hot Module Replacement (HMR).
- 🎨 **CSS Modules** para encapsulamiento de estilos (sin colisiones con el theme).
- 📦 **Build automático** → genera un plugin listo para activar en WordPress.
- 🔌 **Shortcode demo** (`[price_table]`) que muestra la Price Table en cualquier página.
- 📤 **Deploy vía FTP** con un solo comando.

---

## 📂 Estructura

```
template/
├─ src/ # Código fuente
│ ├─ main.js # entrypoint → monta en #app
│ ├─ template.js # estructura base del componente
│ ├─ generator.js # genera contenido dinámico desde JSON
│ ├─ prices.json # datos de ejemplo (planes)
│ └─ styles.module.css
│
├─ wp-plugin/ # salida del build
│ ├─ index.php # plugin WP con shortcode [price_table]
│ └─ assets/ # bundle (JS/CSS) generado por Vite
│
├─ scripts/ # utilidades
│ ├─ setup-ftp.js # configurar credenciales
│ └─ deploy.js # subir vía FTP
│
├─ index.html # página demo para dev (fuera de WP)
├─ package.json
├─ vite.config.js

```

---

## 📜 Scripts disponibles

### `npm run dev`

Levanta el servidor de desarrollo de Vite.

- Podés probar el componente en `http://localhost:5173/` usando `index.html`.
- Ideal para ver cambios en tiempo real con HMR.

---

### `npm run build`

Genera un bundle optimizado en `wp-plugin/assets/` y copia lo necesario para WordPress.

- Al terminar, podés ir a tu instalación de WP → **Activar plugin “Price Table Demo”**.
- Insertá `[price_table]` en cualquier post/página.

---

### `npm run config`

Configura las credenciales FTP para subir el plugin al servidor.  
Guarda los datos en `scripts/ftp-config.json`.

---

### `npm run deploy`

Sube automáticamente la carpeta `wp-plugin/` a tu servidor remoto vía FTP.

- Perfecto para testear cambios sin abrir FileZilla.

---

## 🎨 Ejemplo incluido: Price Table

- Los planes se definen en **`src/prices.json`**.
- El HTML se genera dinámicamente desde esos datos en **`generator.js`**.
- Los estilos se encapsulan con **CSS Modules** (`styles.module.css`).
- El resultado se renderiza en el shortcode `[price_table]`.

---

## 🔧 Flujo de trabajo recomendado

1. `npm run dev` → desarrollá y probá el componente en local.
2. Ajustá el diseño/JS/JSON según lo que necesites.
3. `npm run build` → genera el plugin.
4. Activá el plugin en WordPress → usá `[price_table]`.
5. (Opcional) `npm run deploy` → subí al servidor vía FTP.

---

## 📌 Nota

Este template está pensado como **ejemplo educativo** de cómo estructurar un flujo moderno para desarrollar componentes aislados en WordPress.  
Podés adaptarlo fácilmente para:

- Shortcodes adicionales
- Bloques de Gutenberg
- Widgets personalizados

---

## 🧑‍💻 Autor

Creado como demo para un flujo moderno de desarrollo WP con Vite + Vanilla JS.
