// ============================================
// API 응답 관련 모든 타입들
// ============================================

// 🔸 단일 데이터 응답
export type ApiResponse<T> = {
    data: T | null
    error: string | null
}

// 🔸 리스트 데이터 응답
export type ApiListResponse<T> = {
    data: T[] | null
    error: string | null
    count?: number
}