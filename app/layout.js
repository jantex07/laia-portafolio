import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './LanguageContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Laia Fornaguera · Fotògrafa Costa Brava',
  description: 'Fotografia natural i sensible. Bodas, embaràs i sessions a la Costa Brava.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
