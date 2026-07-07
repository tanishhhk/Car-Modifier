import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'CarConfig — Customize. Compare. Experience.', template: '%s | CarConfig' },
  description: 'Explore and customize 16+ premium car models. Compare specs, choose colors, and book test drives — all in one place.',
  keywords: ['car configurator', 'car customization', 'test drive', 'car comparison', 'luxury cars', 'Indian cars'],
  openGraph: {
    title: 'CarConfig — The Ultimate Car Configurator',
    description: 'Explore 16+ models, customize colors, compare specs and book test drives.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, paddingTop: '68px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
