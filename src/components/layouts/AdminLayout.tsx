'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminLayout({
  children,
  title,
  subtitle,
  action,
}: AdminLayoutProps) {
  const { logout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      await logout();
      router.push('/');
    }
  };
  return (
    <div
      className="min-h-screen bg-surface text-primary"
      style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}
    >
      <div className="fixed inset-0 gaming-grid-bg opacity-5 pointer-events-none"></div>

      {/* Admin Header */}
      <header className="relative bg-surface-variant border-b-4 border-accent px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="gaming-header">
                  <h1 className="gaming-header-text text-2xl">
                    {title.toUpperCase()}
                  </h1>
                </div>
                <div className="gaming-header-border"></div>
              </div>
            </div>
            {subtitle && (
              <p className="gaming-secondary-text text-center text-sm mt-2">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {action && <div className="relative z-10">{action}</div>}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-surface-elevated text-error border-2 border-error px-4 py-2 font-bold tracking-wider hover:bg-error hover:text-surface transition-all duration-300 flex items-center gap-2"
              title="Logout"
            >
              <LogOut size={16} />
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
