import './globals.css';

export const metadata = {
  title: 'Laia Fornaguera · Fotògrafa Costa Brava',
  description: 'Fotografia natural i sensible. Bodas, embaràs i sessions a la Costa Brava.',
  openGraph: {
    title: 'Laia Fornaguera · Fotògrafa Costa Brava',
    description: 'Fotografia natural i sensible. Bodas, embaràs i sessions a la Costa Brava.',
    url: 'https://laiafornaguera.com',
    siteName: 'Laia Fornaguera Fotògrafa',
    locale: 'ca_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
