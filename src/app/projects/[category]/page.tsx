'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingState from '@/components/LoadingState';

interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  createdAt: string;
}

// 임시 데이터
const mockProjects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'A fully functional e-commerce platform with a modern design.',
    thumbnail:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    category: 'Web Development',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing my work and skills.',
    thumbnail:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
    category: 'Web Development',
    createdAt: '2024-01-10',
  },
  {
    id: 3,
    title: 'Landing Page Design',
    description: 'A sleek and engaging landing page for a tech startup.',
    thumbnail:
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop',
    category: 'Web Development',
    createdAt: '2024-01-05',
  },
  {
    id: 4,
    title: 'Mobile App Design',
    description: 'A user-friendly mobile app for a fitness tracking service.',
    thumbnail:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    category: 'Web Development',
    createdAt: '2023-12-20',
  },
  {
    id: 5,
    title: 'Brand Identity Design',
    description: 'A complete brand identity package for a new cafe.',
    thumbnail:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    category: 'Web Development',
    createdAt: '2023-12-15',
  },
  {
    id: 6,
    title: 'Illustration Project',
    description: "A series of illustrations for a children's book.",
    thumbnail:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop',
    category: 'Web Development',
    createdAt: '2023-12-10',
  },
];

const categories = ['All', 'Web Development', 'UI/UX Design', 'Graphic Design'];

export default function CategoryProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentCategory, setCurrentCategory] = useState('Web Development');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 실제 구현시에는 Supabase에서 데이터를 가져옵니다
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
    // 실제 구현: 카테고리별 프로젝트 필터링 또는 새로운 데이터 fetch
  };

  const handleProjectClick = (projectId: number) => {
    router.push(`/projects/${currentCategory.toLowerCase()}/${projectId}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#23101d]"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Main Content */}
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          {/* Page Header */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">
                Projects
              </h1>
              <p className="text-[#cb90b7] text-sm font-normal leading-normal">
                Explore a curated collection of my work, showcasing my skills
                and creativity across various projects.
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pb-3">
            <div className="flex border-b border-[#683156] px-4 gap-8 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${
                    currentCategory === category
                      ? 'border-b-[#f43db7] text-white'
                      : 'border-b-transparent text-[#cb90b7] hover:text-white'
                  }`}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                    {category}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-3 pb-3 cursor-pointer group"
                onClick={() => handleProjectClick(project.id)}
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transition-transform group-hover:scale-105 shadow-lg"
                  style={{
                    backgroundImage: `url("${project.thumbnail}")`,
                  }}
                />
                <div className="space-y-2">
                  <h3 className="text-white text-base font-medium leading-normal group-hover:text-[#cb90b7] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#cb90b7] text-sm font-normal leading-normal line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{project.category}</span>
                    <span>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center p-4">
            <button className="bg-gradient-to-r from-[#f43db7] to-[#cb90b7] text-white px-8 py-3 rounded-full font-medium hover:from-[#f550c4] hover:to-[#d4a4d4] transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More Projects
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
