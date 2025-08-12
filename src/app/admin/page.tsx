'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, FolderOpen, Settings, FileText, BarChart3, Users } from 'lucide-react';
import { AdminLayout } from '@/components/layouts';
import AdminGuard from '@/components/AdminGuard';
import { getProjects } from '@/lib/api/projects';
import { getAllCategories } from '@/lib/api/categories';
import { ProjectWithCategory, Category } from '@/types';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<ProjectWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [projectsData, categoriesData] = await Promise.all([
        getProjects(),
        getAllCategories()
      ]);
      
      setProjects(projectsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: FileText,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
    {
      title: 'Categories',
      value: categories.length,
      icon: FolderOpen,
      color: 'text-neon-purple',
      bgColor: 'bg-neon-purple/10',
      borderColor: 'border-neon-purple/30'
    },
    {
      title: 'Recent Projects',
      value: projects.filter(p => {
        const createdAt = new Date(p.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return createdAt > weekAgo;
      }).length,
      icon: BarChart3,
      color: 'text-accent-light',
      bgColor: 'bg-accent-light/10',
      borderColor: 'border-accent-light/30'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Project',
      description: 'Add a new project to your portfolio',
      icon: Plus,
      color: 'accent',
      path: '/admin/projects/new'
    },
    {
      title: 'Manage Projects',
      description: 'View and edit existing projects',
      icon: FileText,
      color: 'neon-purple',
      path: '/admin/projects'
    },
    {
      title: 'Manage Categories',
      description: 'Add, edit, or delete project categories',
      icon: FolderOpen,
      color: 'accent-light',
      path: '/admin/categories'
    },
    {
      title: 'Settings',
      description: 'Configure admin settings',
      icon: Settings,
      color: 'accent-dark',
      path: '/admin/settings'
    }
  ];

  if (isLoading) {
    return (
      <AdminGuard>
        <AdminLayout title="Admin Dashboard" subtitle="Loading dashboard...">
          <div className="flex items-center justify-center py-12">
            <div className="gaming-text">Loading dashboard data...</div>
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout title="Admin Dashboard" subtitle="Welcome to the admin panel">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`gaming-card ${stat.bgColor} ${stat.borderColor} border-2 p-6`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="gaming-secondary-text text-sm uppercase tracking-wide">
                        {stat.title}
                      </h3>
                      <div className={`text-3xl font-bold mt-2 ${stat.color}`}>
                        {stat.value}
                      </div>
                    </div>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="gaming-card">
            <h2 className="gaming-title text-xl mb-6">QUICK ACTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => router.push(action.path)}
                    className="group bg-surface-elevated p-6 rounded-lg border-2 border-surface-variant hover:border-accent transition-all duration-300 text-left"
                  >
                    <div className="flex items-center mb-4">
                      <IconComponent className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                      <h3 className="gaming-text font-bold ml-3 group-hover:text-accent transition-colors">
                        {action.title}
                      </h3>
                    </div>
                    <p className="gaming-secondary-text text-sm">
                      {action.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="gaming-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="gaming-title text-xl">RECENT PROJECTS</h2>
              <button
                onClick={() => router.push('/admin/projects')}
                className="gaming-secondary-text hover:text-accent transition-colors text-sm"
              >
                View All →
              </button>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-surface-variant mx-auto mb-4" />
                <p className="gaming-secondary-text">No projects yet</p>
                <button
                  onClick={() => router.push('/admin/projects/new')}
                  className="gaming-button mt-4 px-6 py-2"
                >
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, 6).map((project) => (
                  <div
                    key={project.id}
                    className="bg-surface-elevated p-4 rounded-lg border-2 border-surface-variant hover:border-accent transition-colors cursor-pointer group"
                    onClick={() => router.push(`/projects/${project.category?.id}/${project.id}`)}
                  >
                    {project.thumbnail_url && (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="gaming-text font-bold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="gaming-secondary-text text-sm mt-1">
                      {project.category?.name}
                    </p>
                    <p className="gaming-secondary-text text-xs mt-2">
                      {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}