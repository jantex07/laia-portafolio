const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const DRIVE = 'https://www.googleapis.com/drive/v3';

async function fetchDrive(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function getProjects() {
  const data = await fetchDrive(
    `${DRIVE}/files?q='${FOLDER_ID}'+in+parents` +
    `+and+mimeType='application/vnd.google-apps.folder'` +
    `+and+trashed=false` +
    `&orderBy=createdTime+desc` +
    `&key=${API_KEY}` +
    `&fields=files(id,name)`
  );
  if (!data?.files?.length) return [];
  const projects = await Promise.all(
    data.files
      .filter(f => !f.name.startsWith('_'))
      .map(f => buildProject(f.id, f.name))
  );
  return projects.filter(Boolean);
}

export async function getProjectBySlug(slug) {
  const data = await fetchDrive(
    `${DRIVE}/files?q='${FOLDER_ID}'+in+parents` +
    `+and+name='${slug}'` +
    `+and+trashed=false` +
    `&key=${API_KEY}` +
    `&fields=files(id,name)`
  );
  const folder = data?.files?.[0];
  if (!folder) return null;
  return buildProject(folder.id, folder.name);
}

export async function getSpecialPage(name) {
  const data = await fetchDrive(
    `${DRIVE}/files?q='${FOLDER_ID}'+in+parents` +
    `+and+name='${name}'` +
    `+and+trashed=false` +
    `&key=${API_KEY}` +
    `&fields=files(id,name)`
  );
  const folder = data?.files?.[0];
  if (!folder) return null;
  return buildProject(folder.id, folder.name);
}

async function buildProject(folderId, folderName) {
  const data = await fetchDrive(
    `${DRIVE}/files?q='${folderId}'+in+parents+and+trashed=false` +
    `&key=${API_KEY}` +
    `&fields=files(id,name,mimeType)`
  );
  if (!data?.files) return null;
  const files = data.files;

  let info = { titulo: folderName, categoria: '', lloc: '', data: '', descripcio: '' };
  const infoFile = files.find(f => f.name === 'info.txt');
  if (infoFile) {
    const r = await fetch(`${DRIVE}/files/${infoFile.id}?alt=media&key=${API_KEY}`);
    if (r.ok) Object.assign(info, parseInfo(await r.text()));
  }

  const storyFiles = files
    .filter(f => f.name !== 'info.txt')
    .sort((a, b) => a.name.localeCompare(b.name));

  const story = [];
  let photoBuffer = [];

  const flushPhotos = () => {
    if (photoBuffer.length > 0) {
      story.push({ type: 'photos', items: [...photoBuffer] });
      photoBuffer = [];
    }
  };

  for (const file of storyFiles) {
    if (file.mimeType?.startsWith('image/')) {
      photoBuffer.push({
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`,
        thumb: `https://drive.google.com/thumbnail?id=${file.id}&sz=w600`,
      });
    } else if (file.name.endsWith('.txt')) {
      flushPhotos();
      const r = await fetch(`${DRIVE}/files/${file.id}?alt=media&key=${API_KEY}`);
      if (r.ok) {
        const content = (await r.text()).trim();
        if (content) story.push({ type: 'text', content });
      }
    }
  }
  flushPhotos();

  const portada = story.find(b => b.type === 'photos')?.items?.[0] || null;
  return { slug: folderName, portada, story, ...info };
}

// Parser mejorado: soporta valores multilínea
// Las claves son palabras simples seguidas de ":"
// Todo lo que viene después (incluyendo líneas siguientes sin ":") pertenece al mismo campo
function parseInfo(text) {
  const result = {};
  const lines = text.split('\n');
  let currentKey = null;
  let currentLines = [];

  const flush = () => {
    if (currentKey) {
      result[currentKey] = currentLines.join('\n').trim();
    }
  };

  for (const line of lines) {
    // Detecta si la línea empieza con "clave: valor"
    const match = line.match(/^([a-zA-ZàáâäãåçèéêëìíîïñòóôöõùúûüÀÁÂÄÃÅÇÈÉÊËÌÍÎÏÑÒÓÔÖÕÙÚÛÜ_]+)\s*:\s*(.*)/);
    if (match) {
      flush();
      currentKey = match[1].trim().toLowerCase();
      currentLines = [match[2].trim()];
    } else if (currentKey) {
      // Línea de continuación del campo actual
      currentLines.push(line.trim());
    }
  }
  flush();

  return result;
}
