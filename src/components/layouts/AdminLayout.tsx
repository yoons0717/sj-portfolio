import React from 'react';

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
  return (
    <div 
      className="min-h-screen bg-[#231023]"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      {/* Admin Header */}
      <header className="bg-[#2a1329] border-b border-[#472447] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}