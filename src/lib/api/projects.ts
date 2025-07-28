import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

// 프로젝트와 카테고리 정보를 함께 가져오는 타입
export interface ProjectWithCategory extends Omit<Project, 'category_id'> {
    category: {
        id: string
        name: string
        color: string
        icon: string
    } | null
}

// 모든 프로젝트 가져오기 (카테고리 정보 포함)
export async function getProjects(): Promise<ProjectWithCategory[] | null> {
    const { data, error } = await supabase
        .from('projects')
        .select(
            `
      *,
      category:categories (
        id,
        name,
        color,
        icon
      )
    `
        )
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects:', error)
        return null
    }

    return data as ProjectWithCategory[]
}

// 특정 프로젝트 가져오기 (카테고리 정보 포함)
export async function getProject(
    id: string
): Promise<ProjectWithCategory | null> {
    const { data, error } = await supabase
        .from('projects')
        .select(
            `
      *,
      category:categories (
        id,
        name,
        color,
        icon
      )
    `
        )
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching project:', error)
        return null
    }

    return data as ProjectWithCategory
}

// 프로젝트 생성
export async function createProject(project: ProjectInsert) {
    const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select(
            `
      *,
      category:categories (
        id,
        name,
        color,
        icon
      )
    `
        )
        .single()

    if (error) {
        console.error('Error creating project:', error)
        throw error
    }

    return data as ProjectWithCategory
}

// 프로젝트 수정
export async function updateProject(id: string, project: ProjectUpdate) {
    const { data, error } = await supabase
        .from('projects')
        .update({ ...project, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(
            `
      *,
      category:categories (
        id,
        name,
        color,
        icon
      )
    `
        )
        .single()

    if (error) {
        console.error('Error updating project:', error)
        throw error
    }

    return data as ProjectWithCategory
}

// 프로젝트 삭제
export async function deleteProject(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
        console.error('Error deleting project:', error)
        throw error
    }

    return true
}

// 메인 페이지용: 카테고리별 프로젝트 개수
export async function getCategoriesWithCount() {
    const { data, error } = await supabase
        .from('categories')
        .select(
            `
      id,
      name,
      color,
      icon,
      sort_order,
      projects:projects(count)
    `
        )
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

    if (error) {
        console.error('Error fetching categories with count:', error)
        return null
    }

    return data.map((category) => ({
        id: category.id,
        name: category.name,
        count: category.projects?.[0]?.count || 0,
        color: category.color,
        icon: category.icon,
        // 기본 썸네일 (나중에 카테고리별로 설정 가능)
        thumbnail: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop`,
    }))
}
