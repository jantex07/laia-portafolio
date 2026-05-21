'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Categorías disponibles — añade las que quieras aquí
const CATEGORIES = ['Tots', 'Bodas', 'Embaràs', 'Parelles', 'Família'];

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState('Tots');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = active === 'Tots'
    ? projects
    : projects.filter(p =>
        p.categoria?.toLowerCase() === active.toLowerCase()
      );

  return (
    <>
      <header>
        <div className="container">
          <nav className="nav">
            <span className="nav-logo">Laia Fornaguera</span>
            <ul className="nav-links">
              <li><a href="/">Projectes</a></li>
              <li><a href="/sobre-mi">Sobre mi</a></li>
              <li><a href="#contacte">Contacte</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="hero">
            <h1>Fotografia natural<br />a la Costa Brava</h1>
            <p>
              Bodas, sessions d'embaràs i parelles. Fotografia sensible,
              sense posats i amb llum natural.
            </p>
          </section>

          <div className="filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && (
            <div className="empty-state">
              <p>Carregant projectes...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="empty-state">
              <h2>Aviat hi haurà contingut aquí</h2>
              <p>Afegeix una carpeta a Google Drive per veure el projecte.</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="projects-grid">
              {filtered.map(project => (
                <Link
                  key={project.slug}
                  href={`/proyecto/${project.slug}`}
                  className="project-card"
                >
                  {project.portada ? (
                    <img
                      src={project.portada.thumb}
                      alt={project.titulo}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#E8E4DE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '40px'
                    }}>
                      📷
                    </div>
                  )}
                  <div className="project-card-overlay">
                    {project.categoria && (
                      <div className="project-card-cat">{project.categoria}</div>
                    )}
                    <div className="project-card-title">{project.titulo}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="footer">
            <p>© {new Date().getFullYear()} Laia Fornaguera · Costa Brava</p>
            <p id="contacte">
              <a href="mailto:hola@laiafornaguera.com" style={{ color: 'var(--muted)' }}>
                hola@laiafornaguera.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
