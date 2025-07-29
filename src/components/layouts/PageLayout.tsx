import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
}: PageLayoutProps) {
  return (
    <div 
      className={`relative flex min-h-screen flex-col bg-[#221122] ${className}`}
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      {showHeader && <Header />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
}