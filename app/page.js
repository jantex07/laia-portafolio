'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CATEGORIES = ['Tots', 'Bodas', 'Embaràs', 'Parelles', 'Família'];

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState('Tots');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = active === 'Tots'
    ? projects
    : projects.filter(p => p.categoria?.toLowerCase() === active.toLowerCase());

  return (
    <>
      <header className="nav-wrap">
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
            <div className="hero-eyebrow">Costa Brava · Fotògrafa</div>
            <h1>
              Fotografia <em>natural</em><br />
              i sensible
            </h1>
            <p className="hero-sub">
              Bodas, sessions d'embaràs i parelles.<br />
              Sense posats, amb llum natural.
            </p>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">+100</div>
                <div className="hero-stat-label">Històries felices</div>
              </div>
              <div>
                <div className="hero-stat-num">10</div>
                <div className="hero-stat-label">Anys d'experiència</div>
              </div>
              <div>
                <div className="hero-stat-num">∞</div>
                <div className="hero-stat-label">Moments únics</div>
              </div>
            </div>
          </section>
        </div>

        <div className="container">
          <div className="filters-wrap">
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
          </div>

          {loading && (
            <div className="empty-state"><p>Carregant projectes...</p></div>
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
                <Link key={project.slug} href={`/proyecto/${project.slug}`} className="project-card">
                  {project.portada ? (
                    <img className="project-card-img" src={project.portada.thumb} alt={project.titulo} loading="lazy" />
                  ) : (
                    <div style={{ width:'100%', aspectRatio:'3/4', background:'var(--border)' }} />
                  )}
                  <div className="project-card-info">
                    {project.categoria && <div className="project-card-cat">{project.categoria}</div>}
                    <div className="project-card-title">{project.titulo}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="footer-wrap" id="contacte">
        <div className="container">
          <div className="footer">
            <p>© {new Date().getFullYear()} Laia Fornaguera</p>
            <p><a href="mailto:hola@laiafornaguera.com">hola@laiafornaguera.com</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
