// lib/drive.js
// Este archivo lee las carpetas de Google Drive y construye los proyectos

const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const DRIVE = 'https://www.googleapis.com/drive/v3';

// Hace una petición a la API de Drive
async function fetchDrive(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // refresca cada 60s
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Devuelve todos los proyectos (carpetas) ordenados por fecha
export async function getProjects() {
  const data = await fetchDrive(
    `${DRIVE}/files` +
    `?q='${FOLDER_ID}'+in+parents` +
    `+and+mimeType='application/vnd.google-apps.folder'` +
    `+and+trashed=false` +
    `&orderBy=createdTime+desc` +
    `&key=${API_KEY}` +
    `&fields=files(id,name)`
  );

  if (!data?.files?.length) return [];

  const projects = await Promise.all(
    data.files.map(f => buildProject(f.id, f.name))
  );

  return projects.filter(Boolean);
}

// Devuelve un proyecto por su slug (nombre de carpeta)
export async function getProjectBySlug(slug) {
  const data = await fetchDrive(
    `${DRIVE}/files` +
    `?q='${FOLDER_ID}'+in+parents` +
    `+and+name='${slug}'` +
    `+and+trashed=false` +
    `&key=${API_KEY}` +
    `&fields=files(id,name)`
  );

  const folder = data?.files?.[0];
  if (!folder) return null;
  return buildProject(folder.id, folder.name);
}

// Construye un objeto proyecto a partir de una carpeta de Drive
async function buildProject(folderId, folderName) {
  const data = await fetchDrive(
    `${DRIVE}/files` +
    `?q='${folderId}'+in+parents+and+trashed=false` +
    `&key=${API_KEY}` +
    `&fields=files(id,name,mimeType)`
  );

  if (!data?.files) return null;
  const files = data.files;

  // Leer el info.txt
  let info = {
    titulo: folderName,
    categoria: '',
    lloc: '',
    data: '',
    descripcio: '',
  };

  const infoFile = files.find(f => f.name === 'info.txt');
  if (infoFile) {
    const r = await fetch(
      `${DRIVE}/files/${infoFile.id}?alt=media&key=${API_KEY}`
    );
    if (r.ok) {
      const txt = await r.text();
      Object.assign(info, parseInfo(txt));
    }
  }

  // Recoger las fotos, portada primero
  const photos = files
    .filter(f => f.mimeType?.startsWith('image/'))
    .map(f => ({
      id: f.id,
      name: f.name,
      url: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`,
      thumb: `https://drive.google.com/thumbnail?id=${f.id}&sz=w600`,
    }))
    .sort((a, b) => {
      if (a.name.toLowerCase().startsWith('portada')) return -1;
      if (b.name.toLowerCase().startsWith('portada')) return 1;
      return a.name.localeCompare(b.name);
    });

  return {
    slug: folderName,
    photos,
    portada: photos[0] || null,
    ...info,
  };
}

// Parsea el info.txt línea por línea
// Formato: "clave: valor"
function parseInfo(text) {
  const result = {};
  for (const line of text.split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim().toLowerCase();
      const val = line.slice(idx + 1).trim();
      if (key && val) result[key] = val;
    }
  }
  return result;
}
