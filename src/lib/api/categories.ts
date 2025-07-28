import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type Category = Database['public']['Tables']['categories']['Row']
type CategoryInsert = Database['public']['Tables']['categories']['Insert']
type CategoryUpdate = Database['public']['Tables']['categories']['Update']

// 활성 카테고리만 가져오기 (사용자용)
export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

    if (error) {
        console.error('Error fetching categories:', error)
        return null
    }

    return data
}

// 모든 카테고리 가져오기 (관리자용)
export async function getAllCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })

    if (error) {
        console.error('Error fetching all categories:', error)
        return null
    }

    return data
}

// 카테고리 생성
export async function createCategory(category: CategoryInsert) {
    const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single()

    if (error) {
        console.error('Error creating category:', error)
        throw error
    }

    return data
}

// 카테고리 수정
export async function updateCategory(id: string, category: CategoryUpdate) {
    const { data, error } = await supabase
        .from('categories')
        .update({ ...category, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating category:', error)
        throw error
    }

    return data
}

// 카테고리 삭제
export async function deleteCategory(id: string) {
    const { data, error } = await supabase
        .from('categories')
        .update({ is_active: false })
        .eq('id', id)
        .select()

    if (error) {
        console.error('Error deleting category:', error)
        throw error
    }

    return data
}
