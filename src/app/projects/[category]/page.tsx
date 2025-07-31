'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { getProjects, getProjectsByCategory } from '@/lib/api/projects';
import { getAllCategories } from '@/lib/api/categories';
import { ProjectWithCategory, Category } from '@/types';

export default function CategoryProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [params.category]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 카테고리 목록 가져오기
      const categoriesData = await getAllCategories();
      if (categoriesData) {
        setCategories(categoriesData);

        // URL 파라미터에서 카테고리 ID 가져오기
        const categoryId = params.category as string;

        if (categoryId === 'all') {
          // 모든 프로젝트 가져오기
          setCurrentCategory('All Projects');
          const allProjectsData = await getProjects();
          if (allProjectsData) {
            setProjects(allProjectsData);
          } else {
            setProjects([]);
          }
        } else {
          // 해당 카테고리 ID로 카테고리 찾기
          const foundCategory = categoriesData.find(
            (cat) => cat.id === categoryId,
          );

          if (foundCategory) {
            setCurrentCategory(foundCategory.name);

            // 해당 카테고리의 프로젝트들 가져오기
            const projectsData = await getProjectsByCategory(categoryId);
            if (projectsData) {
              setProjects(projectsData);
            } else {
              setProjects([]);
            }
          } else {
            setError('Category not found');
          }
        }
      } else {
        setError('Failed to load categories');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/projects/${categoryId}`);
  };

  const handleProjectClick = (projectId: string) => {
    const categoryId = params.category as string;
    router.push(`/projects/${categoryId}/${projectId}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div
      className="min-h-screen bg-surface text-primary"
      style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}
    >
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
            Explore a curated collection of my work, showcasing my skills and
            creativity across various projects.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => handleCategoryClick('all')}
                className={`px-6 py-3 font-bold text-sm tracking-wider transition-all duration-300 whitespace-nowrap ${
                  currentCategory === 'All Projects'
                    ? 'bg-accent text-surface transform skew-x-12'
                    : 'text-accent hover:text-neon-yellow border-b-2 border-transparent hover:border-accent'
                }`}
              >
                ALL PROJECTS
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-6 py-3 font-bold text-sm tracking-wider transition-all duration-300 whitespace-nowrap ${
                    currentCategory === category.name
                      ? 'bg-accent text-surface transform skew-x-12'
                      : 'text-accent hover:text-neon-yellow border-b-2 border-transparent hover:border-accent'
                  }`}
                >
                  {category.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const borderColors = [
                'border-neon-purple',
                'border-neon-yellow',
                'border-accent-pink',
              ];
              const borderColor = borderColors[index % borderColors.length];

              return (
                <div
                  key={project.id}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div
                    className={`border-4 ${borderColor} bg-surface-variant p-1 hover:shadow-2xl hover:shadow-accent/20`}
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-full h-48 bg-cover bg-center mb-4 bg-surface-elevated"
                      style={{
                        backgroundImage: project.thumbnail_url
                          ? `url("${project.thumbnail_url}")`
                          : 'none',
                      }}
                    >
                      {!project.thumbnail_url && (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-secondary text-sm">
                            NO IMAGE
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Category and Date */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-accent text-surface px-3 py-1 text-xs font-bold tracking-wider">
                          {project.category?.name?.toUpperCase() ||
                            'UNCATEGORIZED'}
                        </span>
                        <span className="text-secondary text-xs font-mono">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-primary text-lg font-black mb-3 leading-tight group-hover:text-accent transition-colors">
                        {project.title.toUpperCase()}
                      </h3>

                      {/* Description */}
                      <p className="text-secondary text-sm leading-relaxed line-clamp-3">
                        {project.content
                          ? project.content
                              .substring(0, 120)
                              .replace(/[#*]/g, '') + '...'
                          : 'No description available'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="gaming-card max-w-md mx-auto">
                <h3 className="gaming-title text-xl mb-4">NO PROJECTS FOUND</h3>
                <p className="gaming-secondary-text">
                  No projects available in this category yet.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button - Gaming Style - 향후 페이지네이션 구현 시 활성화 */}
        {/* <div className="flex justify-center">
          <button className="bg-gradient-to-r from-accent to-neon-purple text-surface px-8 py-3 font-bold tracking-wider hover:from-neon-yellow hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:skew-x-12">
            LOAD MORE PROJECTS
          </button>
        </div> */}
      </div>

      <Footer />
    </div>
  );
}
