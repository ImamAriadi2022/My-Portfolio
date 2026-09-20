import Script from 'next/script';
import '../src/index.css';
import '../src/styles.css';

export const metadata = {
  title: 'Imam Ariadi - Portofolio Web & Mobile Developer',
  description: 'Portofolio Web & Mobile Developer - Imam Ariadi',
  icons: {
    icon: '/assets/img/favicon.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script
          src="/assets/js/particles.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
