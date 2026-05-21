import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/drive';
import { notFound } from 'next/navigation';
import StoryBlock from './GalleryWithLightbox';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map(p => ({ slug: p.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.titulo} · Laia Fornaguera`,
    description: project.descripcio || `Fotografia de ${project.categoria} a ${project.lloc}`,
    openGraph: {
      title: `${project.titulo} · Laia Fornaguera`,
      description: project.descripcio,
      images: project.portada ? [project.portada.url] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <header>
        <div className="container">
          <nav className="nav">
            <Link href="/" className="nav-logo">Laia Fornaguera</Link>
            <ul className="nav-links">
              <li><Link href="/">Projectes</Link></li>
              <li><Link href="/sobre-mi">Sobre mi</Link></li>
              <li><a href="#contacte">Contacte</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container-narrow">
          <div className="project-header">
            <Link href="/" className="back-link">← Tots els projectes</Link>
            <div className="project-meta">
              {project.categoria && <span className="project-cat-badge">{project.categoria}</span>}
              {project.lloc && <span className="project-lloc">{project.lloc}</span>}
              {project.data && <span className="project-lloc">{project.data}</span>}
            </div>
            <h1 className="project-title">{project.titulo}</h1>
            {project.descripcio && <p className="project-desc">{project.descripcio}</p>}
          </div>
        </div>

        <StoryBlock story={project.story} title={project.titulo} />
      </main>

      <footer>
        <div className="container">
          <div className="footer">
            <p>© {new Date().getFullYear()} Laia Fornaguera · Costa Brava</p>
            <p id="contacte"><a href="mailto:hola@laiafornaguera.com" style={{color:'var(--muted)'}}>hola@laiafornaguera.com</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
