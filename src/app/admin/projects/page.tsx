'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, Calendar, FolderOpen } from 'lucide-react';
import { AdminLayout } from '@/components/layouts';
import AdminGuard from '@/components/AdminGuard';
import { getProjects, deleteProject } from '@/lib/api/projects';
import { ProjectWithCategory } from '@/types';
import LoadingState from '@/components/LoadingState';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setDeletingId(id);
      try {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <AdminGuard>
        <AdminLayout title="Manage Projects" subtitle="Loading projects...">
          <LoadingState />
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout
        title="Manage Projects"
        subtitle={`${projects.length} total projects`}
        action={
          <button
            onClick={() => router.push('/admin/projects/new')}
            className="gaming-button flex items-center gap-2"
          >
            <Plus size={18} />
            NEW PROJECT
          </button>
        }
      >
        <div className="space-y-6">
          {projects.length === 0 ? (
            <div className="gaming-card text-center py-12">
              <FolderOpen className="w-16 h-16 text-surface-variant mx-auto mb-4" />
              <h3 className="gaming-title text-lg mb-2">No Projects Yet</h3>
              <p className="gaming-secondary-text mb-6">
                Get started by creating your first project
              </p>
              <button
                onClick={() => router.push('/admin/projects/new')}
                className="gaming-button"
              >
                Create First Project
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="gaming-card p-6 hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        {project.thumbnail_url && (
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="w-16 h-16 object-cover rounded border-2 border-surface-variant"
                          />
                        )}
                        <div>
                          <h3 className="gaming-text text-lg font-bold">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <FolderOpen size={16} className="text-accent" />
                              <span className="gaming-secondary-text text-sm">
                                {project.category?.name || 'No Category'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-accent" />
                              <span className="gaming-secondary-text text-sm">
                                {new Date(project.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {project.content && (
                        <p className="gaming-secondary-text text-sm line-clamp-2">
                          {project.content.substring(0, 150)}...
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => router.push(`/projects/${project.category?.id}/${project.id}`)}
                        className="bg-surface-elevated text-accent border-2 border-accent px-4 py-2 hover:bg-accent hover:text-surface transition-all duration-300 flex items-center gap-2"
                        title="View Project"
                      >
                        <Eye size={16} />
                        VIEW
                      </button>
                      
                      <button
                        onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                        className="bg-surface-elevated text-neon-purple border-2 border-neon-purple px-4 py-2 hover:bg-neon-purple hover:text-surface transition-all duration-300 flex items-center gap-2"
                        title="Edit Project"
                      >
                        <Edit size={16} />
                        EDIT
                      </button>
                      
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        disabled={deletingId === project.id}
                        className="bg-surface-elevated text-error border-2 border-error px-4 py-2 hover:bg-error hover:text-surface transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                        {deletingId === project.id ? 'DELETING...' : 'DELETE'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}