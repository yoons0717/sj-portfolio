'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Save, X, Eye, ArrowLeft } from 'lucide-react';
import { createProject } from '@/lib/api/projects';
import { CategorySimple } from '@/types';
import { getAllCategories } from '@/lib/api/categories';
import FileUpload from '@/components/FileUpload';
import { AdminLayout } from '@/components/layouts';
import { Input, Select } from '@/components/ui';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false },
);

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false },
);

interface ProjectFormData {
  title: string;
  content: string;
  category_id: string;
  thumbnail_url: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategorySimple[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category_id: '',
    thumbnail_url: '',
    content: `# Project Title

> Brief description of the project, highlighting its key features and goals.

![Project Hero Image](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop)

## 📋 Project Overview

This project demonstrates modern web development techniques and user-centered design principles. Our goal was to create an engaging and intuitive user experience while maintaining high performance and accessibility standards.

### 🎯 Key Objectives
- Create a modern, responsive user interface
- Implement seamless user authentication and data management
- Optimize for mobile-first design approach
- Ensure accessibility compliance (WCAG 2.1)

### ⚡ Key Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time Updates**: Live data synchronization across all devices
- **Secure Authentication**: Multi-factor authentication and role-based access
- **Performance Optimized**: Fast loading times and smooth interactions
- **Accessibility**: Full keyboard navigation and screen reader support

## 🖼️ Visual Gallery

### Desktop Interface
![Desktop View](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop)

### Mobile Experience  
![Mobile View](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=500&fit=crop)

### User Dashboard
![Dashboard](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop)

## 🛠️ Technical Implementation

### Frontend Stack
\`\`\`javascript
const techStack = {
  framework: "Next.js 14",
  styling: "Tailwind CSS",
  stateManagement: "Zustand",
  ui: "Radix UI + Shadcn/ui",
  animation: "Framer Motion"
};
\`\`\`

### Backend Architecture
- **Database**: PostgreSQL with Supabase
- **API**: RESTful APIs with Next.js App Router
- **Authentication**: Supabase Auth with JWT
- **File Storage**: Supabase Storage for assets
- **Deployment**: Vercel with automatic CI/CD

### Performance Optimizations
1. **Image Optimization**: Next.js Image component with WebP conversion
2. **Code Splitting**: Dynamic imports and lazy loading
3. **Caching Strategy**: Edge caching and ISR (Incremental Static Regeneration)
4. **Bundle Size**: Tree-shaking and module optimization

## 📊 Results & Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Page Load Speed | 4.2s | 1.8s | **57% faster** |
| User Engagement | 2.3 min | 4.7 min | **104% increase** |
| Conversion Rate | 2.1% | 3.8% | **81% increase** |
| Mobile Score | 72 | 96 | **33% improvement** |
| Accessibility Score | 68 | 98 | **44% improvement** |

## 👥 Project Details

**🏢 Client:** TechCorp Solutions  
**👤 Role:** Lead Full Stack Developer  
**🤝 Team:** 6 Members (3 Developers, 2 Designers, 1 PM)  
**⏱️ Duration:** 4 Months (September - December 2024)  
**💰 Budget:** $75,000  


`,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getAllCategories();
        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData);
          setFormData((prev) => ({
            ...prev,
            category_id: categoriesData[0].id,
          }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Project content is required';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category';
    }

    if (!formData.thumbnail_url.trim()) {
      newErrors.thumbnail_url = 'Thumbnail image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const newProject = await createProject({
        ...formData,
      });

      console.log('Project created:', newProject);

      // 성공 시 프로젝트 상세 페이지로 이동
      router.push(
        `/projects/${newProject.category?.name.toLowerCase().replace(/\s+/g, '-')}/${newProject.id}`,
      );
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push('/admin/projects');
    }
  };

  return (
    <AdminLayout
      title="Create New Project"
      subtitle="Add a new project to your portfolio"
      action={
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/projects')}
            className="bg-surface-elevated text-accent border-2 border-accent px-6 py-3 font-bold tracking-wider hover:bg-accent hover:text-surface transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            BACK TO PROJECTS
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
        {/* Basic Information */}
        <div className="bg-card rounded-xl p-6 shadow-xl">
          <h2 className="text-white text-xl font-semibold mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Title */}
            <div className="lg:col-span-2">
              <Input
                label="Project Title *"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                error={errors.title}
                placeholder="Enter project title..."
                disabled={previewMode}
              />
            </div>

            {/* Category */}
            <div>
              <Select
                label="Category *"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category_id: e.target.value,
                  }))
                }
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                error={errors.category_id}
                placeholder="Select a category..."
                disabled={previewMode}
              />

              {/* Category Preview */}
              {formData.category_id && (
                <div className="mt-2 flex items-center gap-2">
                  {(() => {
                    const selectedCategory = categories.find(
                      (c) => c.id === formData.category_id,
                    );
                    return selectedCategory ? (
                      <>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: selectedCategory.color,
                          }}
                        />
                        <span className="text-gray-400 text-sm">
                          Selected: {selectedCategory.name}
                        </span>
                      </>
                    ) : null;
                  })()}
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                🖼️ Project Thumbnail *
              </label>
              {!previewMode ? (
                <FileUpload
                  currentUrl={formData.thumbnail_url}
                  onUploadSuccess={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      thumbnail_url: url,
                    }));

                    setErrors((prev) => ({ ...prev, thumbnail_url: '' }));
                  }}
                  onUploadError={(error) => {
                    setErrors((prev) => ({ ...prev, thumbnail_url: error }));
                  }}
                  className="w-full"
                />
              ) : (
                // 프리뷰 모드에서는 읽기 전용으로 표시
                <div className="bg-input rounded-lg p-4">
                  {formData.thumbnail_url ? (
                    <div className="text-accent text-sm">
                      ✅ Thumbnail uploaded
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      ❌ No thumbnail uploaded
                    </div>
                  )}
                </div>
              )}
              {errors.thumbnail_url && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.thumbnail_url}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-card rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">
              Project Content
            </h2>
            <div className="text-accent-light text-sm">
              ✨ Rich markdown editor with live preview
            </div>
          </div>

          {previewMode ? (
            <div className="prose prose-invert prose-lg max-w-none bg-input rounded-lg p-6">
              <div data-color-mode="dark">
                <MarkdownPreview
                  source={formData.content}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              <div data-color-mode="dark">
                <MDEditor
                  value={formData.content}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: val || '',
                    }))
                  }
                  height={600}
                  preview="edit"
                  hideToolbar={false}
                  textareaProps={{
                    placeholder: 'Write your project content in markdown...',
                    style: {
                      fontSize: 14,
                      lineHeight: 1.6,
                      fontFamily:
                        'ui-monospace, SFMono-Regular, "SF Mono", monospace',
                    },
                  }}
                />
              </div>

              {errors.content && (
                <p className="text-red-400 text-sm mt-2">{errors.content}</p>
              )}

              {/* Markdown Tips */}
              <div className="bg-input rounded-lg p-4 mt-4">
                <h4 className="text-white text-sm font-semibold mb-2">
                  💡 Markdown Tips:
                </h4>
                <div className="text-accent-light text-xs space-y-1">
                  <p>• **Bold text** and *italic text*</p>
                  <p>• ## Headings and ### Subheadings</p>
                  <p>• ![Image description](image-url)</p>
                  <p>• `code` and ```code blocks```</p>
                  <p>• Blockquotes for highlights</p>
                  <p>• | Tables | Are | Supported |</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-input">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-surface-elevated text-accent border-2 border-accent px-8 py-4 font-bold tracking-wider hover:bg-accent hover:text-surface transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            <X size={18} />
            CANCEL
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading || previewMode}
            className="gaming-button px-8 py-4 text-lg flex items-center gap-2 disabled:opacity-50"
          >
            {!isLoading && <Save size={18} />}
            {isLoading ? 'CREATING...' : 'CREATE PROJECT'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
