'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Leaf,
  Search,
  ShoppingCart,
  Bell,
  Menu,
  X,
  User,
  LogIn,
  ChevronDown,
  Truck,
  LayoutDashboard,
  Store,
} from 'lucide-react';
import { useCartStore, useAuthStore, useUIStore } from '@/store';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/marketplace', label: 'Pasar Tani' },
  { href: '/tracking', label: 'Lacak Pesanan' },
  { href: '/dashboard', label: 'Dashboard' },
];

const roleOptions: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { role: 'buyer', label: 'Pembeli', icon: <ShoppingCart className="w-4 h-4" />, desc: 'Beli langsung dari petani' },
  { role: 'farmer', label: 'Petani', icon: <Store className="w-4 h-4" />, desc: 'Jual hasil panen' },
  { role: 'logistics', label: 'Mitra Logistik', icon: <Truck className="w-4 h-4" />, desc: 'Kelola pengiriman' },
  { role: 'admin', label: 'Admin / Pemerintah', icon: <LayoutDashboard className="w-4 h-4" />, desc: 'Monitor & kelola' },
];

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems);
  const { currentRole, isLoggedIn, userName, login, logout, setRole } = useAuthStore();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, cartDrawerOpen, toggleCartDrawer } = useUIStore();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleRoleLogin = (role: UserRole) => {
    const names: Record<UserRole, string> = {
      buyer: 'Dewi Rahayu',
      farmer: 'Pak Suroyo',
      logistics: 'Hendra',
      admin: 'Admin Dinas',
    };
    login(names[role], role);
    setLoginModalOpen(false);
    setRoleDropdownOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-forest text-cream shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-amber rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Nusa<span className="text-amber">Tani</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-cream/80 hover:text-cream hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Role Switcher */}
              {isLoggedIn && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
                  >
                    <span className="capitalize">{currentRole === 'admin' ? 'Admin' : roleOptions.find(r => r.role === currentRole)?.label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {roleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-charcoal rounded-xl shadow-xl border border-sage overflow-hidden animate-fade-in">
                      {roleOptions.map((opt) => (
                        <button
                          key={opt.role}
                          onClick={() => { setRole(opt.role); setRoleDropdownOpen(false); }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-3 hover:bg-sage transition text-left text-sm',
                            currentRole === opt.role && 'bg-sage font-semibold'
                          )}
                        >
                          <span className="text-forest">{opt.icon}</span>
                          <div>
                            <div className="font-medium">{opt.label}</div>
                            <div className="text-xs text-gray-400">{opt.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Notification */}
              <button className="p-2 hover:bg-white/10 rounded-full transition relative hidden sm:block">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta rounded-full animate-pulse-soft" />
              </button>

              {/* Cart */}
              <button
                onClick={toggleCartDrawer}
                className="p-2 hover:bg-white/10 rounded-full transition relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber text-white text-[10px] font-mono font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm">
                    {totalItems()}
                  </span>
                )}
              </button>

              {/* Login / User */}
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition text-sm"
                >
                  <div className="w-6 h-6 bg-amber rounded-full flex items-center justify-center text-xs font-bold">
                    {userName[0]}
                  </div>
                  <span className="text-sm font-medium max-w-[100px] truncate">{userName}</span>
                </button>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="btn-secondary text-sm !py-2 !px-4 hidden sm:flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk
                </button>
              )}

              {/* Mobile Hamburger */}
              <button onClick={toggleMobileMenu} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-forest-dark border-t border-white/10 animate-slide-in-left">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg hover:bg-white/10 transition text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <button
                  onClick={() => { setLoginModalOpen(true); closeMobileMenu(); }}
                  className="w-full mt-2 btn-secondary text-sm flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" /> Masuk
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm animate-fade-in" onClick={() => setLoginModalOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-forest p-6 text-cream">
              <h2 className="text-xl font-bold mb-1">Masuk ke NusaTani</h2>
              <p className="text-cream/70 text-sm">Pilih peran untuk demo — tanpa registrasi</p>
            </div>
            <div className="p-4 space-y-2">
              {roleOptions.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => handleRoleLogin(opt.role)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-sage hover:border-forest hover:bg-sage transition group text-left"
                >
                  <div className="w-10 h-10 bg-sage group-hover:bg-forest group-hover:text-cream rounded-lg flex items-center justify-center text-forest transition">
                    {opt.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">{opt.label}</div>
                    <div className="text-xs text-gray-400">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-sage">
              <button onClick={() => setLoginModalOpen(false)} className="w-full text-center text-sm text-gray-400 hover:text-charcoal transition">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
