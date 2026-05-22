import Link from 'next/link';
import { getSpecialPage } from '@/lib/drive';
import ContactForm from './ContactForm';

export const revalidate = 60;

export const metadata = {
  title: 'Contacte · Laia Fornaguera',
  description: 'Contacta amb la Laia Fornaguera, fotògrafa a la Costa Brava.',
};

export default async function ContactePage() {
  const page = await getSpecialPage('_contacte');

  // Del info.txt de _contacte puede sacar: email, instagram, telefon, text
  const email = page?.email || 'hola@laiafornaguera.com';
  const instagram = page?.instagram || '';
  const telefon = page?.telefon || '';
  const text = page?.descripcio || 'M\'encantaria conèixer la teva història. Escriu-me i parlarem.';
  const foto = page?.story?.find(b => b.type === 'photos')?.items?.[0];

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
          <div className="contacte-wrap">

            <div className="contacte-left">
              <div className="hero-eyebrow">Contacte</div>
              <h1 className="sobre-title">Parlem<br /><em>de la teva</em><br />història</h1>
              <p className="sobre-text-intro">{text}</p>

              <div className="contacte-info">
                <a href={`mailto:${email}`} className="contacte-link">
                  <span className="contacte-link-label">Email</span>
                  <span>{email}</span>
                </a>
                {instagram && (
                  <a href={`https://instagram.com/${instagram.replace('@','')}`} target="_blank" rel="noopener" className="contacte-link">
                    <span className="contacte-link-label">Instagram</span>
                    <span>{instagram}</span>
                  </a>
                )}
                {telefon && (
                  <a href={`tel:${telefon}`} className="contacte-link">
                    <span className="contacte-link-label">Telèfon</span>
                    <span>{telefon}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="contacte-right">
              {foto && <img src={foto.url} alt="Contacte" className="contacte-foto" />}
              <ContactForm email={email} />
            </div>

          </div>
        </div>
      </main>

      <footer className="footer-wrap">
        <div className="container">
          <div className="footer">
            <p>© {new Date().getFullYear()} Laia Fornaguera</p>
            <p><a href={`mailto:${email}`} style={{color:'var(--muted)'}}>{email}</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
