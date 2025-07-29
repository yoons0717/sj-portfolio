import { Database } from './database';
import { CategorySimple } from './category';

// ============================================
// 프로젝트 관련 모든 타입들
// ============================================

// 데이터베이스 기본 타입들
export type ProjectDB = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

// 🔸 완전한 프로젝트
export type Project = ProjectDB;

// 🔸 카테고리 정보가 포함된 프로젝트
export interface ProjectWithCategory extends Omit<ProjectDB, 'category_id'> {
  category: CategorySimple | null;
}

// 🔸 프로젝트 폼 데이터
export interface ProjectFormData {
  title: string;
  content: string;
  category_id: string;
  thumbnail_url: string;
}
