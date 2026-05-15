import type { Metadata } from 'next';
import './globals.css';
import StoreHydration from '@/components/layout/StoreHydration';

export const metadata: Metadata = {
  title: 'NusaTani — Dari Ladang ke Meja Makan',
  description:
    'Platform agrikultur terpadu yang menghubungkan petani langsung ke pembeli. Harga transparan, petani terverifikasi, logistik terpantau.',
  keywords: ['pertanian', 'marketplace', 'petani', 'agrikultur', 'NusaTani', 'logistik'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <StoreHydration />
        {children}
      </body>
    </html>
  );
}
