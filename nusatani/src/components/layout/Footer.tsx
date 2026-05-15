import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-amber rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-cream">
                Nusa<span className="text-amber">Tani</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Platform agrikultur terpadu yang menghubungkan petani langsung ke pembeli.
              Transparan, adil, dan terpercaya.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-amber rounded-lg flex items-center justify-center transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/marketplace" className="hover:text-amber transition">Pasar Tani</Link></li>
              <li><Link href="/tracking" className="hover:text-amber transition">Lacak Pesanan</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber transition">Dashboard</Link></li>
              <li><a href="#" className="hover:text-amber transition">Harga Referensi</a></li>
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Informasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-amber transition">Tentang NusaTani</a></li>
              <li><a href="#" className="hover:text-amber transition">Cara Bergabung</a></li>
              <li><a href="#" className="hover:text-amber transition">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-amber transition">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Kontak</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber" />
                halo@nusatani.id
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber" />
                0812-3456-7890
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber mt-0.5" />
                Jakarta Selatan, Indonesia
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-cream/50">
          <span>© 2026 NusaTani. Hak cipta dilindungi.</span>
          <span className="mt-2 sm:mt-0">Dibuat dengan ❤️ untuk petani Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
