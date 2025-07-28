export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    color: string
                    icon: string
                    sort_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    color?: string
                    icon?: string
                    sort_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    color?: string
                    icon?: string
                    sort_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            projects: {
                Row: {
                    id: string
                    title: string
                    content: string | null
                    category_id: string | null // 변경됨: category → category_id
                    thumbnail_url: string | null
                    created_at: string
                    updated_at: string
                    author_id: string
                }
                Insert: {
                    id?: string
                    title: string
                    content?: string | null
                    category_id?: string | null // 변경됨: category → category_id
                    thumbnail_url?: string | null
                    created_at?: string
                    updated_at?: string
                    author_id: string
                }
                Update: {
                    id?: string
                    title?: string
                    content?: string | null
                    category_id?: string | null // 변경됨: category → category_id
                    thumbnail_url?: string | null
                    created_at?: string
                    updated_at?: string
                    author_id?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    email: string
                    name: string | null
                    avatar_url: string | null
                    role: 'user' | 'admin'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
