'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang, LangSwitcher } from './LanguageContext';
import MobileMenu from './components/MobileMenu';

export default function HomePage() {
  const { locale, tr } = useLang();
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActive(tr.filters.categories[0]);
  }, [locale]);

  useEffect(() => {
    fetch(`/api/projects?lang=${locale}`)
      .then(r => r.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [locale]);

  const all = tr.filters.all;
  const filtered = !active || active === all
    ? projects
    : projects.filter(p => p.categoria?.toLowerCase() === active.toLowerCase());

  return (
    <>
      <header className="nav-wrap">
        <div className="container">
          <nav className="nav">
            <span className="nav-logo">Laia Fornaguera</span>
            <ul className="nav-links">
              <li><Link href="/">{tr.nav.projects}</Link></li>
              <li><Link href="/sobre-mi">{tr.nav.about}</Link></li>
              <li><Link href="/contacte">{tr.nav.contact}</Link></li>
            </ul>
            <div className="nav-right">
              <LangSwitcher />
              <MobileMenu />
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="hero">
            <div className="hero-eyebrow">{tr.hero.eyebrow}</div>
            <h1>
              {tr.hero.title1} <em>{tr.hero.title2}</em><br />
              {tr.hero.title3}
            </h1>
            <p className="hero-sub" style={{ whiteSpace: 'pre-line' }}>{tr.hero.sub}</p>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">{tr.hero.stat1num}</div>
                <div className="hero-stat-label">{tr.hero.stat1label}</div>
              </div>
              <div>
                <div className="hero-stat-num">{tr.hero.stat2num}</div>
                <div className="hero-stat-label">{tr.hero.stat2label}</div>
              </div>
              <div>
                <div className="hero-stat-num">{tr.hero.stat3num}</div>
                <div className="hero-stat-label">{tr.hero.stat3label}</div>
              </div>
            </div>
          </section>
        </div>

        <div className="container">
          <div className="filters-wrap">
            <div className="filters">
              {tr.filters.categories.map(cat => (
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

          {loading && <div className="empty-state"><p>{tr.loading}</p></div>}

          {!loading && filtered.length === 0 && (
            <div className="empty-state">
              <h2>{tr.empty.title}</h2>
              <p>{tr.empty.sub}</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="projects-grid">
              {filtered.map(project => (
                <Link key={project.slug} href={`/proyecto/${project.slug}?lang=${locale}`} className="project-card">
                  {project.portada
                    ? <img className="project-card-img" src={project.portada.thumb} alt={project.titulo} loading="lazy" />
                    : <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--border)' }} />
                  }
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
            <p>{tr.footer.copy.replace('{year}', new Date().getFullYear())}</p>
            <p><a href="mailto:hola@laiafornaguera.com">hola@laiafornaguera.com</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
