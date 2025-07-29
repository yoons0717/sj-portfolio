import { supabase } from '@/lib/supabase'
import { Project, ProjectInsert, ProjectUpdate, ProjectWithCategory } from '@/types'

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

// 카테고리별 프로젝트 가져오기
export async function getProjectsByCategory(categoryId: string): Promise<ProjectWithCategory[] | null> {
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
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects by category:', error)
        return null
    }

    return data as ProjectWithCategory[]
}

