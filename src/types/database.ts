export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string
                    title: string
                    content: string | null
                    category: string | null
                    thumbnail_url: string | null
                    created_at: string
                    updated_at: string
                    author_id: string
                }
                Insert: {
                    id?: string
                    title: string
                    content?: string | null
                    category?: string | null
                    thumbnail_url?: string | null
                    created_at?: string
                    updated_at?: string
                    author_id: string
                }
                Update: {
                    id?: string
                    title?: string
                    content?: string | null
                    category?: string | null
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
