import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'CarConfig | 3D Car Customizer & Garages', template: '%s | CarConfig' },
  description: 'Load high fidelity 3D CAD schematics, apply real world upgrades, and schedule garage consultations.',
  keywords: ['car configurator', 'car customization', '3d cad model', 'garage appointment', 'car upgrades', 'alloys', 'paint', 'subwoofer'],
  openGraph: {
    title: 'CarConfig | 3D Car Customizer & Garages',
    description: 'Load high fidelity 3D CAD schematics, apply real world upgrades, and schedule garage consultations.',
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
