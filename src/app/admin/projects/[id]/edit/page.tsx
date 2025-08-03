'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Save, X, Eye, ArrowLeft } from 'lucide-react';
import { getProject, updateProject } from '@/lib/api/projects';
import { getAllCategories } from '@/lib/api/categories';
import { ProjectWithCategory, Category, ProjectUpdate } from '@/types';
import FileUpload from '@/components/FileUpload';
import { AdminLayout } from '@/components/layouts';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false },
);

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false },
);

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  
  const [project, setProject] = useState<ProjectWithCategory | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProjectUpdate>({
    title: '',
    category_id: '',
    thumbnail_url: '',
    content: '',
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
      
      if (!projectId) {
        setError('Project ID not found');
        return;
      }

      // 프로젝트와 카테고리 데이터를 병렬로 가져오기
      const [projectData, categoriesData] = await Promise.all([
        getProject(projectId),
        getAllCategories()
      ]);

      if (projectData) {
        setProject(projectData);
        setFormData({
          title: projectData.title,
          category_id: projectData.category?.id || '',
          thumbnail_url: projectData.thumbnail_url || '',
          content: projectData.content || '',
        });
      } else {
        setError('Project not found');
      }

      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load project data');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title?.trim()) {
      alert('Project title is required');
      return false;
    }
    if (!formData.category_id) {
      alert('Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !project) return;

    try {
      setIsSaving(true);
      
      await updateProject(project.id, formData);
      
      alert('Project updated successfully!');
      router.push(`/projects/${formData.category_id}/${project.id}`);
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Failed to update project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    const confirmDiscard = confirm('Are you sure you want to discard your changes?');
    if (confirmDiscard) {
      router.back();
    }
  };

  const handleUploadSuccess = (url: string) => {
    setFormData(prev => ({ ...prev, thumbnail_url: url }));
  };

  const handleUploadError = (error: string) => {
    alert(`Upload failed: ${error}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !project) {
    return <ErrorState error={error || 'Project not found'} />;
  }

  return (
    <AdminLayout
      title="Edit Project"
      subtitle="Update project information and content"
      action={
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="bg-surface-elevated text-accent border-2 border-accent px-6 py-3 font-bold tracking-wider hover:bg-accent hover:text-surface transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            BACK
          </button>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-surface-elevated text-neon-purple border-2 border-neon-purple px-6 py-3 font-bold tracking-wider hover:bg-neon-purple hover:text-surface transition-all duration-300 flex items-center gap-2"
          >
            <Eye size={18} />
            {previewMode ? 'EDIT MODE' : 'PREVIEW'}
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        
        {/* Project Information */}
        <div className="gaming-card">
          <h2 className="gaming-title text-xl mb-6">PROJECT INFORMATION</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block gaming-text text-sm mb-2">PROJECT TITLE *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="gaming-input w-full"
                placeholder="Enter project title..."
              />
            </div>

            <div>
              <label className="block gaming-text text-sm mb-2">CATEGORY *</label>
              <select
                value={formData.category_id || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="gaming-input w-full"
              >
                <option value="">SELECT CATEGORY</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block gaming-text text-sm mb-2">THUMBNAIL IMAGE</label>
            <FileUpload
              currentUrl={formData.thumbnail_url || undefined}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              accept="image/*"
              maxSize={5}
            />
          </div>
        </div>

        {/* Content Editor/Preview */}
        <div className="gaming-card">
          <h2 className="gaming-title text-xl mb-6">
            {previewMode ? 'CONTENT PREVIEW' : 'CONTENT EDITOR'}
          </h2>
          
          {previewMode ? (
            <div className="prose prose-invert max-w-none min-h-96">
              {formData.content ? (
                <div data-color-mode="dark">
                  <MarkdownPreview 
                    source={formData.content} 
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      fontFamily: '"Orbitron", "Exo 2", monospace'
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="gaming-secondary-text">NO CONTENT TO PREVIEW</p>
                </div>
              )}
            </div>
          ) : (
            <div data-color-mode="dark">
              <MDEditor
                value={formData.content || ''}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value || '' }))}
                preview="edit"
                hideToolbar={false}
                visibleDragbar={false}
                style={{
                  backgroundColor: '#1a1a1a',
                  minHeight: '400px'
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t-2 border-accent">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="bg-surface-elevated text-accent border-2 border-accent px-8 py-4 font-bold tracking-wider hover:bg-accent hover:text-surface transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            <X size={18} />
            CANCEL
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSaving || previewMode}
            className="gaming-button px-8 py-4 text-lg flex items-center gap-2 disabled:opacity-50"
          >
            {!isSaving && <Save size={18} />}
            {isSaving ? 'UPDATING...' : 'UPDATE PROJECT'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}