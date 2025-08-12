'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { PageLayout } from '@/components/layouts';
import { getAllCategories } from '@/lib/api/categories';
import HeroBanner from './home/components/HeroBanner';
import ProfileSection from './home/components/ProfileSection';
import CategoriesSection from './home/components/CategoriesSection';
import { CategoryDisplay, PortfolioProfile } from '@/types';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Settings } from 'lucide-react';

const profileData: PortfolioProfile = {
  name: 'Sophia Carter',
  title: 'Multimedia Artist & Technologist',
  description:
    'Creative technologist passionate about merging art and technology to create immersive experiences. Specializing in virtual production, interactive installations, and digital storytelling.',
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
};

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const categoriesData = await getAllCategories();

        if (categoriesData) {
          const formattedCategories = categoriesData.map((category) => ({
            id: category.id,
            name: category.name,
            color: category.color,
            icon: category.icon,
            thumbnail: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop`,
          }));
          setCategories(formattedCategories);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/projects/${categoryId}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <PageLayout>
      <div style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
        <HeroBanner />

        {/* Admin Floating Button - Only visible to authenticated admins */}
        {isAuthenticated && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => router.push('/admin')}
              className="bg-accent text-surface p-4 rounded-full shadow-2xl hover:bg-accent-light transition-all duration-300 flex items-center gap-2 border-2 border-accent-light"
              title="Admin Dashboard"
            >
              <Settings size={20} />
              <span className="hidden sm:inline font-bold">ADMIN</span>
            </button>
          </div>
        )}

        <div className="px-4 md:px-20 flex flex-1 justify-center py-12">
          <div className="flex flex-col max-w-[1200px] flex-1">
            <ProfileSection profile={profileData} />
            <CategoriesSection
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
