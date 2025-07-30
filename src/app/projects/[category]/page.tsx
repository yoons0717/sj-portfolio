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
    <div className="min-h-screen bg-surface text-primary" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* PROJECTS Header - Gaming Style */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="bg-neon-purple px-12 py-4 transform -skew-x-12">
              <h1 className="text-neon-yellow text-4xl font-black tracking-wider skew-x-12">
                PROJECTS
              </h1>
            </div>
            <div className="absolute -top-2 -left-2 w-full h-full border-2 border-neon-yellow transform -skew-x-12"></div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Explore a curated collection of my work, showcasing my skills and creativity across various projects.
          </p>
        </div>

        {/* Category Tabs - Gaming Style */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-3 font-bold text-sm tracking-wider transition-all duration-300 ${
                  currentCategory === category
                    ? 'bg-accent text-surface transform skew-x-12'
                    : 'text-accent hover:text-neon-yellow border-b-2 border-transparent hover:border-accent'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Gaming Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => {
            const borderColors = ['border-neon-purple', 'border-neon-yellow', 'border-accent-pink'];
            const borderColor = borderColors[index % borderColors.length];
            
            return (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => handleProjectClick(project.id)}
              >
                <div className={`border-4 ${borderColor} bg-surface-variant p-1 hover:shadow-2xl hover:shadow-accent/20`}>
                  {/* Thumbnail */}
                  <div 
                    className="w-full h-48 bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url("${project.thumbnail}")` }}
                  />
                  
                  {/* Content */}
                  <div className="p-4">
                    {/* Category and Date */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-accent text-surface px-3 py-1 text-xs font-bold tracking-wider">
                        {project.category.toUpperCase()}
                      </span>
                      <span className="text-secondary text-xs font-mono">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-primary text-lg font-black mb-3 leading-tight group-hover:text-accent transition-colors">
                      {project.title.toUpperCase()}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-secondary text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button - Gaming Style */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-accent to-neon-purple text-surface px-8 py-3 font-bold tracking-wider hover:from-neon-yellow hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:skew-x-12">
            LOAD MORE PROJECTS
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}