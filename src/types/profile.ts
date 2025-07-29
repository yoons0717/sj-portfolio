import { Database } from './database'

// ============================================
// 프로필 관련 모든 타입들
// ============================================

// 데이터베이스 기본 타입들
export type ProfileDB = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// 🔸 사용자 프로필 (데이터베이스)
export type Profile = ProfileDB

// 🔸 포트폴리오 프로필 (디스플레이용)
export interface PortfolioProfile {
    name: string
    title: string
    description: string
    avatar: string
}