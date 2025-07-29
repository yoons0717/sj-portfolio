import { Database } from './database'

// ============================================
// 카테고리 관련 모든 타입들
// ============================================

export type CategoryDB = Database['public']['Tables']['categories']['Row']
export type CategoryInsert =
    Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate =
    Database['public']['Tables']['categories']['Update']

// 🔸 완전한 카테고리 (관리자 페이지용)
export type Category = CategoryDB

// 🔸 간단한 카테고리 (셀렉트 박스, 카드 등)
export interface CategorySimple {
    id: string
    name: string
    color: string
    icon: string
}

// 🔸 프론트엔드 디스플레이용 카테고리 (썸네일 포함)
export interface CategoryDisplay extends CategorySimple {
    thumbnail: string
}

// 🔸 폼 데이터용 카테고리
export interface CategoryFormData {
    name: string
    description: string
    color: string
    icon: string
}
