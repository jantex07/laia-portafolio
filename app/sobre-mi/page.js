import Link from 'next/link';
import { getSpecialPage } from '@/lib/drive';

export const revalidate = 60;

export const metadata = {
  title: 'Sobre mi · Laia Fornaguera',
  description: 'Fotògrafa natural i sensible a la Costa Brava.',
};

export default async function SobreMiPage() {
  const page = await getSpecialPage('_sobre-mi');
  const foto = page?.story?.find(b => b.type === 'photos')?.items?.[0];
  const textos = page?.story?.filter(b => b.type === 'text') || [];
  const fotosExtra = page?.story?.filter(b => b.type === 'photos').slice(1) || [];

  return (
    <>
      <header className="nav-wrap">
        <div className="container">
          <nav className="nav">
            <Link href="/" className="nav-logo">Laia Fornaguera</Link>
            <ul className="nav-links">
              <li><Link href="/">Projectes</Link></li>
              <li><Link href="/sobre-mi">Sobre mi</Link></li>
              <li><Link href="/contacte">Contacte</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="sobre-wrap">

            {/* Foto + intro */}
            <div className="sobre-hero">
              {foto && (
                <div className="sobre-foto-wrap">
                  <img src={foto.url} alt="Laia Fornaguera" className="sobre-foto" />
                </div>
              )}
              <div className="sobre-intro">
                <div className="hero-eyebrow">Sobre mi</div>
                <h1 className="sobre-title">
                  {page?.titulo || 'Soc la Laia'}
                </h1>
                {textos[0] && (
                  <p className="sobre-text-intro">{textos[0].content}</p>
                )}
              </div>
            </div>

            {/* Textos adicionales */}
            {textos.slice(1).map((t, i) => (
              <div key={i} className="sobre-text-block">
                <p>{t.content}</p>
              </div>
            ))}

            {/* Fotos extra en grid */}
            {fotosExtra.length > 0 && (
              <div className="sobre-fotos-grid">
                {fotosExtra.flatMap(b => b.items).map(foto => (
                  <img key={foto.id} src={foto.thumb} alt="Laia Fornaguera" />
                ))}
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="footer-wrap">
        <div className="container">
          <div className="footer">
            <p>© {new Date().getFullYear()} Laia Fornaguera</p>
            <p><Link href="/contacte" style={{color:'var(--muted)'}}>Contacte</Link></p>
          </div>
        </div>
      </footer>
    </>
  );
}
