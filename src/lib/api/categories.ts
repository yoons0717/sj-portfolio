import { supabase } from '@/lib/supabase'
import { Category, CategoryInsert, CategoryUpdate } from '@/types'

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

// 카테고리 삭제 (soft delete)
export async function deleteCategory(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('categories')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error deleting category:', error)
        throw error
    }

    return true
}

// 특정 카테고리 가져오기
export async function getCategory(id: string): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching category:', error)
        return null
    }

    return data
}

// 카테고리 순서 업데이트
export async function updateCategoryOrder(updates: { id: string; sort_order: number }[]): Promise<boolean> {
    const promises = updates.map(({ id, sort_order }) =>
        supabase
            .from('categories')
            .update({ sort_order, updated_at: new Date().toISOString() })
            .eq('id', id)
    )

    const results = await Promise.all(promises)
    const hasError = results.some(result => result.error)

    if (hasError) {
        console.error('Error updating category orders')
        throw new Error('Failed to update category orders')
    }

    return true
}

