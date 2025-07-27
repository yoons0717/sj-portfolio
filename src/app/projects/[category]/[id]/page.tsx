'use client'

import React, { useState, useEffect } from 'react'
import { Edit, Trash2, Save, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

// 마크다운 에디터를 동적으로 import (SSR 방지)
const MDEditor = dynamic(
    () => import('@uiw/react-md-editor').then((mod) => mod.default),
    { ssr: false }
)

// 마크다운 뷰어 컴포넌트
const MarkdownPreview = dynamic(
    () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
    { ssr: false }
)

interface Project {
    id: number
    title: string
    content: string
    category: string
    thumbnail_url: string
    created_at: string
    updated_at: string
    author_id: string
}

// 임시 데이터 - 마크다운 콘텐츠
const mockProject: Project = {
    id: 1,
    title: 'E-commerce Website Design & Development',
    content: `> A comprehensive e-commerce platform built with modern web technologies, focusing on user experience and performance optimization.

![Project Hero](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop)

## 📋 Project Overview

This project was a collaboration with a team of designers and developers to create a unique and engaging user experience. We focused on incorporating vibrant neon colors like pink, lime, and purple to achieve a kitsch aesthetic. The goal was to create a portfolio that stands out and reflects the creative spirit of the work.

### 🎯 Key Objectives
- Create a modern, responsive e-commerce platform
- Implement seamless user authentication and payment processing
- Optimize for mobile-first design approach
- Ensure accessibility compliance (WCAG 2.1)

### ⚡ Key Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time Search**: Advanced filtering and search capabilities
- **Secure Payments**: Integration with Stripe and PayPal
- **Admin Dashboard**: Comprehensive management interface
- **Analytics**: Detailed user behavior tracking

## 🖼️ Visual Gallery

### Desktop Interface
![Desktop View](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop)

### Mobile Experience  
![Mobile View](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=500&fit=crop)

### Admin Dashboard
![Admin Dashboard](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop)

## 🎥 Demo Video

<div style="position: relative; width: 100%; height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 20px 0;">
  <div style="color: white; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 16px;">▶️</div>
    <h3>Project Demo Video</h3>
    <p>Click to watch the full demonstration</p>
  </div>
</div>

## 🛠️ Technical Implementation

### Frontend Stack
\`\`\`javascript
// Tech Stack
const techStack = {
  framework: "Next.js 14",
  styling: "Tailwind CSS",
  stateManagement: "Zustand",
  ui: "Radix UI + Shadcn/ui",
  animation: "Framer Motion"
};
\`\`\`

### Backend Architecture
- **Database**: PostgreSQL with Prisma ORM
- **API**: RESTful APIs with Next.js API routes
- **Authentication**: NextAuth.js with JWT
- **File Storage**: AWS S3 for product images
- **Deployment**: Vercel with automatic CI/CD

### Performance Optimizations
1. **Image Optimization**: Next.js Image component with WebP conversion
2. **Code Splitting**: Dynamic imports and lazy loading
3. **Caching Strategy**: Redis for session management
4. **Bundle Size**: Tree-shaking and module federation

## 📊 Results & Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Page Load Speed | 4.2s | 1.8s | **57% faster** |
| Conversion Rate | 2.1% | 3.4% | **62% increase** |
| Mobile Score | 72 | 94 | **31% improvement** |
| User Satisfaction | 3.2/5 | 4.7/5 | **47% increase** |

## 👥 Project Details

**🏢 Client:** TechMart Inc.  
**👤 Role:** Lead Full Stack Developer  
**🤝 Team:** 6 Members (3 Developers, 2 Designers, 1 PM)  
**⏱️ Duration:** 4 Months (March - June 2024)  
**💰 Budget:** $85,000  

### Team Members
- **Frontend Lead**: Sarah Johnson
- **Backend Lead**: Mike Chen  
- **UI/UX Designer**: Emily Rodriguez
- **Product Manager**: David Kim
- **QA Engineer**: Lisa Park

## 🚀 Deployment & Launch

The project was successfully deployed using a modern DevOps pipeline:

1. **Development**: Feature branches with code reviews
2. **Staging**: Automated testing and client feedback
3. **Production**: Blue-green deployment with zero downtime
4. **Monitoring**: Real-time performance tracking with Sentry

### Launch Results
- ✅ **Zero downtime** during deployment
- ✅ **100% uptime** in first month
- ✅ **1000+ users** signed up in first week
- ✅ **Featured** in TechCrunch startup showcase

## 🎉 Impact & Recognition

> "This platform exceeded our expectations and transformed our online presence. The team delivered exceptional quality." - CEO, TechMart Inc.

### Awards & Recognition
- 🏆 **Best E-commerce Site 2024** - Web Design Awards
- 🎯 **User Choice Award** - Product Hunt
- 📱 **Mobile Excellence** - UX Design Institute

---

**📅 Project Completed:** June 2024  
**🔗 Live Site:** [techmart-demo.vercel.app](https://techmart-demo.vercel.app)  
**📁 GitHub:** [Private Repository]`,
    category: 'Web Development',
    thumbnail_url:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
    author_id: 'user123',
}

export default function ProjectDetailPage({
    projectId,
}: {
    projectId: string
}) {
    const [project, setProject] = useState<Project | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState('')
    const [editedTitle, setEditedTitle] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isAdmin, setIsAdmin] = useState(true) // 실제로는 auth 상태로 확인

    useEffect(() => {
        // 실제 구현시에는 Supabase에서 프로젝트 데이터를 가져옵니다
        setTimeout(() => {
            setProject(mockProject)
            setEditedContent(mockProject.content)
            setEditedTitle(mockProject.title)
            setIsLoading(false)
        }, 1000)
    }, [projectId])

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        setIsSaving(true)

        try {
            if (project) {
                const updatedProject = {
                    ...project,
                    title: editedTitle,
                    content: editedContent,
                    updated_at: new Date().toISOString(),
                }

                // 실제 구현: Supabase에 저장
                // const { error } = await supabase
                //   .from('projects')
                //   .update({
                //     title: editedTitle,
                //     content: editedContent,
                //     updated_at: new Date().toISOString()
                //   })
                //   .eq('id', project.id);

                // if (error) throw error;

                setProject(updatedProject)
                setIsEditing(false)

                console.log('Project saved successfully:', updatedProject)
            }
        } catch (error) {
            console.error('Error saving project:', error)
            alert('저장 중 오류가 발생했습니다.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleCancel = () => {
        if (project) {
            setEditedContent(project.content)
            setEditedTitle(project.title)
            setIsEditing(false)
        }
    }

    const handleDelete = async () => {
        if (
            confirm(
                '정말로 이 프로젝트를 삭제하시겠습니까?\n삭제된 프로젝트는 복구할 수 없습니다.'
            )
        ) {
            try {
                // 실제 구현: Supabase에서 삭제
                // const { error } = await supabase
                //   .from('projects')
                //   .delete()
                //   .eq('id', project.id);

                // if (error) throw error;

                console.log('Project deleted:', project?.id)
                // router.push('/projects');
                alert('프로젝트가 삭제되었습니다.')
            } catch (error) {
                console.error('Error deleting project:', error)
                alert('삭제 중 오류가 발생했습니다.')
            }
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#231023] flex items-center justify-center">
                <div className="text-white text-lg">Loading project...</div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#231023] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-white text-xl mb-2">
                        Project not found
                    </div>
                    <div className="text-[#cb90cb] text-sm">
                        The requested project could not be found.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="relative flex min-h-screen flex-col bg-[#231023]"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            <Header />

            {/* Main Content */}
            <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
                <div className="flex flex-col max-w-[960px] flex-1">
                    {/* Admin Controls */}
                    {isAdmin && (
                        <div className="flex justify-end gap-3 p-4">
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                                    >
                                        <Edit size={18} />
                                        Edit Project
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                                    >
                                        <Save size={18} />
                                        {isSaving
                                            ? 'Saving...'
                                            : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* Project Title */}
                    <div className="p-4">
                        {isEditing ? (
                            <div className="space-y-2">
                                <label className="block text-[#cb90cb] text-sm font-medium">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) =>
                                        setEditedTitle(e.target.value)
                                    }
                                    className="w-full bg-[#492249] text-white text-[28px] md:text-[32px] font-bold leading-tight px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#cb90cb] outline-none"
                                    placeholder="Enter project title..."
                                />
                            </div>
                        ) : (
                            <h1 className="text-white text-[28px] md:text-[32px] font-bold leading-tight tracking-light">
                                {project.title}
                            </h1>
                        )}
                    </div>

                    {/* Content Editor */}
                    <div className="p-4">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="block text-[#cb90cb] text-sm font-medium">
                                        Project Content (Markdown)
                                    </label>
                                    <div className="text-[#cb90cb] text-xs">
                                        ✨ Rich markdown editor with live
                                        preview
                                    </div>
                                </div>

                                <div data-color-mode="dark">
                                    <MDEditor
                                        value={editedContent}
                                        onChange={(val) =>
                                            setEditedContent(val || '')
                                        }
                                        height={600}
                                        preview="live"
                                        hideToolbar={false}
                                        toolbarHeight={50}
                                        previewOptions={{
                                            rehypePlugins: [],
                                        }}
                                        textareaProps={{
                                            placeholder:
                                                'Write your project content in markdown...\n\n## Example:\n- Use **bold** and *italic* text\n- Add images: ![alt](url)\n- Create tables, code blocks, and more!',
                                            style: {
                                                fontSize: 14,
                                                lineHeight: 1.6,
                                                fontFamily:
                                                    'ui-monospace, SFMono-Regular, "SF Mono", monospace',
                                            },
                                        }}
                                    />
                                </div>

                                <div className="bg-[#492249] rounded-lg p-4">
                                    <h4 className="text-white text-sm font-semibold mb-2">
                                        💡 Markdown Tips:
                                    </h4>
                                    <div className="text-[#cb90cb] text-xs space-y-1">
                                        <p>• **Bold text** and *italic text*</p>
                                        <p>• ## Headings and ### Subheadings</p>
                                        <p>• ![Image description](image-url)</p>
                                        <p>• `code` and ```code blocks```</p>
                                        <p>• Blockquotes for highlights</p>
                                        <p>• | Tables | Are | Supported |</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Content Display */
                            <div className="prose prose-invert prose-lg max-w-none">
                                <div data-color-mode="dark">
                                    <MarkdownPreview
                                        source={project.content}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#ffffff',
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Meta Information */}
                    {!isEditing && (
                        <div className="border-t border-[#683168] mt-8 pt-6 px-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="space-y-1">
                                    <span className="text-[#cb90cb] font-medium">
                                        Category
                                    </span>
                                    <div className="text-white">
                                        {project.category}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[#cb90cb] font-medium">
                                        Created
                                    </span>
                                    <div className="text-white">
                                        {new Date(
                                            project.created_at
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[#cb90cb] font-medium">
                                        Last Updated
                                    </span>
                                    <div className="text-white">
                                        {new Date(
                                            project.updated_at
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}
