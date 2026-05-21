# Laia Fornaguera · Portfolio

Web de portfolio para fotógrafa gestionada desde **Google Drive**.

## Cómo funciona

Ella crea carpetas en Google Drive → la web las lee automáticamente → aparecen como proyectos.

### Estructura de cada carpeta
```
📁 boda-marta-i-joan
  ├─ portada.jpg      ← foto principal (obligatoria)
  ├─ foto-01.jpg
  ├─ foto-02.jpg
  └─ info.txt         ← descripción del proyecto
```

### Formato del info.txt
```
titulo: Boda Marta i Joan
categoria: Bodas
lloc: Mas Terrats, Costa Brava
data: Juny 2024
descripcio: Una boda íntima a la Costa Brava amb llum natural i moments autèntics.
```

---

## Setup (una sola vez)

### Paso 1: Google Drive
1. Crear una carpeta llamada `proyectos` en Google Drive
2. Hacer la carpeta **pública** (clic derecho → Compartir → Cualquiera con el enlace)
3. Copiar el ID de la URL (la parte larga después de `/folders/`)

### Paso 2: Google Cloud API Key
1. Ir a https://console.cloud.google.com
2. Crear proyecto nuevo
3. Activar "Google Drive API"
4. Crear credencial → API Key
5. Copiar la key

### Paso 3: Variables de entorno
Copiar `.env.example` como `.env.local` y rellenar:
```
GOOGLE_DRIVE_API_KEY=tu_api_key_aqui
GOOGLE_DRIVE_FOLDER_ID=id_de_la_carpeta_proyectos
```

### Paso 4: Vercel
1. Subir este código a GitHub
2. Conectar el repo en vercel.com
3. Añadir las variables de entorno en Vercel (Settings → Environment Variables)
4. Deploy!

---

## Tecnologías
- **Next.js 14** — framework web
- **Google Drive API** — fuente de contenido
- **Vercel** — hosting (gratis)
