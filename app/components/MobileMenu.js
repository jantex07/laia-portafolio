'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang, LangSwitcher } from '../LanguageContext';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { tr } = useLang();

  // Bloquea el scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Botón hamburguesa → LF */}
      <button
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menú"
      >
        <span className="hb-inner">
          {/* Las 3 líneas */}
          <span className="hb-line hb-line-1" />
          <span className="hb-line hb-line-2" />
          <span className="hb-line hb-line-3" />
          {/* Las iniciales LF (aparecen al abrir) */}
          <span className="hb-initials">LF</span>
        </span>
      </button>

      {/* Overlay del menú */}
      <div className={`mobile-nav${open ? ' open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link href="/"        onClick={close}>{tr.nav.projects}</Link>
          <Link href="/sobre-mi" onClick={close}>{tr.nav.about}</Link>
          <Link href="/contacte" onClick={close}>{tr.nav.contact}</Link>
        </nav>
        <div className="mobile-nav-footer">
          <LangSwitcher />
          <p>© {new Date().getFullYear()} Laia Fornaguera</p>
        </div>
      </div>
    </>
  );
}
