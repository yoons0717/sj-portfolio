'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, User, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { getProject, deleteProject } from '@/lib/api/projects';
import { ProjectWithCategory } from '@/types';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

// 마크다운 뷰어 컴포넌트를 동적으로 import (SSR 방지)
const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false },
);

export default function ProjectDetailPage() {
  const [project, setProject] = useState<ProjectWithCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const projectId = Array.isArray(params.id) ? params.id[0] : params.id;

      if (!projectId) {
        setError('Project ID not found');
        return;
      }

      const projectData = await getProject(projectId);

      if (projectData) {
        setProject(projectData);
      } else {
        setError('Project not found');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const categoryId = Array.isArray(params.category)
      ? params.category[0]
      : params.category;
    router.push(`/projects/${categoryId}`);
  };

  const handleEdit = () => {
    if (project) {
      router.push(`/admin/projects/${project.id}/edit`);
    }
  };

  const handleDelete = async () => {
    if (!project) return;

    const confirmed = confirm(
      `Are you sure you want to delete "${project.title}"? This action cannot be undone.`,
    );

    if (confirmed) {
      try {
        setIsDeleting(true);
        await deleteProject(project.id);

        // 삭제 후 카테고리 페이지로 돌아가기
        const categoryId = Array.isArray(params.category)
          ? params.category[0]
          : params.category;
        router.push(`/projects/${categoryId}`);
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Failed to delete project');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !project) {
    return <ErrorState error={error || 'Project not found'} />;
  }

  return (
    <div
      className="min-h-screen bg-surface text-primary"
      style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}
    >
      <div className="fixed inset-0 gaming-grid-bg opacity-5 pointer-events-none"></div>

      <Header />

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="gaming-button mb-6 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            BACK TO PROJECTS
          </button>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="gaming-header">
                <h1 className="gaming-header-text text-3xl">
                  {project.title.toUpperCase()}
                </h1>
              </div>
              <div className="gaming-header-border"></div>
            </div>
          </div>

          {/* Admin Actions - Only visible to authenticated admins */}
          {isAuthenticated && (
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                className="bg-surface-elevated text-neon-purple border-2 border-neon-purple px-4 py-2 hover:bg-neon-purple hover:text-surface transition-all duration-300 flex items-center gap-2"
              >
                <Edit size={16} />
                EDIT PROJECT
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-surface-elevated text-error border-2 border-error px-4 py-2 hover:bg-error hover:text-surface transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              >
                <Trash2 size={16} />
                {isDeleting ? 'DELETING...' : 'DELETE PROJECT'}
              </button>

              <button
                onClick={() => router.push('/admin')}
                className="bg-surface-elevated text-accent border-2 border-accent px-4 py-2 hover:bg-accent hover:text-surface transition-all duration-300"
              >
                ADMIN DASHBOARD
              </button>
            </div>
          )}

          <div className="gaming-card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent border border-accent">
                  <Tag size={20} className="text-surface" />
                </div>
                <div>
                  <div className="gaming-secondary-text text-xs">CATEGORY</div>
                  <div className="gaming-text">
                    {project.category?.name || 'UNCATEGORIZED'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-purple border border-neon-purple">
                  <Calendar size={20} className="text-surface" />
                </div>
                <div>
                  <div className="gaming-secondary-text text-xs">CREATED</div>
                  <div className="gaming-text">
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-yellow border border-neon-yellow">
                  <User size={20} className="text-surface" />
                </div>
                <div>
                  <div className="gaming-secondary-text text-xs">AUTHOR</div>
                  <div className="gaming-text">ADMIN</div>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t-2 border-accent">
              <button
                onClick={handleEdit}
                className="bg-surface-elevated text-neon-blue border-2 border-neon-blue px-6 py-3 font-bold tracking-wider hover:bg-neon-blue hover:text-surface transition-all duration-300 flex items-center gap-2"
              >
                <Edit size={18} />
                EDIT PROJECT
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-surface-elevated text-error border-2 border-error px-6 py-3 font-bold tracking-wider hover:bg-error hover:text-surface transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              >
                <Trash2 size={18} />
                {isDeleting ? 'DELETING...' : 'DELETE PROJECT'}
              </button>
            </div>
          </div>
        </div>

        {project.thumbnail_url && (
          <div className="gaming-card mb-8">
            <div className="relative overflow-hidden h-64 md:h-96">
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Project Content */}
        <div className="gaming-card">
          <div className="prose prose-invert max-w-none">
            {project.content ? (
              <div data-color-mode="dark">
                <MarkdownPreview
                  source={project.content}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    fontFamily: '"Orbitron", "Exo 2", monospace',
                  }}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="gaming-title text-xl mb-4">
                  NO CONTENT AVAILABLE
                </h3>
                <p className="gaming-secondary-text">
                  This project doesn&apos;t have detailed content yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
