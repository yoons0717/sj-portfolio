'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { PageLayout } from '@/components/layouts';
import { getCategories } from '@/lib/api/categories';
import HeroBanner from './home/components/HeroBanner';
import ProfileSection from './home/components/ProfileSection';
import CategoriesSection from './home/components/CategoriesSection';
import { CategoryDisplay, PortfolioProfile } from '@/types';

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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const categoriesData = await getCategories();

        if (categoriesData) {
          // Convert API data to frontend format
          const formattedCategories = categoriesData.map((category) => ({
            id: category.id,
            name: category.name,
            color: category.color,
            icon: category.icon,
            thumbnail: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop`,
          }));
          setCategories(formattedCategories);
        } else {
          // Fallback to mock data if no Supabase data
          setCategories([
            {
              id: '1',
              name: 'Development',
              color: '#3B82F6',
              icon: 'code',
              thumbnail:
                'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
            },
            {
              id: '2',
              name: 'Design',
              color: '#EC4899',
              icon: 'palette',
              thumbnail:
                'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop',
            },
            {
              id: '3',
              name: 'VR/AR Production',
              color: '#10B981',
              icon: 'vr',
              thumbnail:
                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
            },
            {
              id: '4',
              name: 'Proposals',
              color: '#F59E0B',
              icon: 'document',
              thumbnail:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            },
          ]);
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

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/projects/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
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
