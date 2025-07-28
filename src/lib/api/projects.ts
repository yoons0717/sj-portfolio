import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

// 모든 프로젝트 가져오기
export async function getProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects:', error)
        return null
    }

    return data
}

// 카테고리별 프로젝트 가져오기
export async function getProjectsByCategory(category: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects by category:', error)
        return null
    }

    return data
}

// 특정 프로젝트 가져오기
export async function getProject(id: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching project:', error)
        return null
    }

    return data
}

// 프로젝트 생성
export async function createProject(project: ProjectInsert) {
    const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single()

    if (error) {
        console.error('Error creating project:', error)
        throw error
    }

    return data
}

// 프로젝트 수정
export async function updateProject(id: string, project: ProjectUpdate) {
    const { data, error } = await supabase
        .from('projects')
        .update({ ...project, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating project:', error)
        throw error
    }

    return data
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

// 카테고리별 프로젝트 개수 가져오기
export async function getCategoriesWithCount() {
    const { data, error } = await supabase.from('projects').select('category')

    if (error) {
        console.error('Error fetching categories:', error)
        return null
    }

    // 카테고리별 개수 계산
    const categoryCounts = data.reduce(
        (acc: Record<string, number>, project) => {
            const category = project.category || 'Uncategorized'
            acc[category] = (acc[category] || 0) + 1
            return acc
        },
        {}
    )

    return Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count,
        thumbnail: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1556742049-0cfed4f6a45d' : '1461749280684-dccba630e2f6'}?w=400&h=400&fit=crop`,
    }))
}
