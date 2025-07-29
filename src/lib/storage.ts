import { supabase } from './supabase';

export interface UploadResult {
  url: string | null;
  error: string | null;
}

// 🔓 익명 파일 업로드 함수 (인증 불필요)
export async function uploadFile(
  file: File,
  bucket: string = 'project-thumbnails',
  folder: string = 'thumbnails',
): Promise<UploadResult> {
  try {
    // 파일 이름을 고유하게 만들기 (타임스탬프 + 랜덤값)
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2);
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${timestamp}-${randomId}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log('🚀 Anonymous upload starting:', {
      fileName,
      filePath,
      bucket,
    });

    // Supabase Storage에 파일 업로드 (익명 업로드)
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false, // 동일한 파일명이 있어도 덮어쓰지 않음
        duplex: 'half', // 익명 업로드를 위한 설정
      });

    if (error) {
      console.error('❌ Upload error:', error);
      return { url: null, error: error.message };
    }

    console.log('✅ Upload successful:', data);

    // 업로드된 파일의 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    console.log('🔗 Public URL generated:', publicUrl);

    return { url: publicUrl, error: null };
  } catch (err) {
    console.error('💥 Upload error:', err);
    return { url: null, error: 'Failed to upload file' };
  }
}

// 🔓 익명 파일 삭제 함수 (인증 불필요)
export async function deleteFile(
  filePath: string,
  bucket: string = 'project-thumbnails',
): Promise<{ error: string | null }> {
  try {
    console.log('🗑️ Anonymous delete starting:', { filePath, bucket });

    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error('❌ Delete error:', error);
      return { error: error.message };
    }

    console.log('✅ Delete successful');
    return { error: null };
  } catch (err) {
    console.error('💥 Delete error:', err);
    return { error: 'Failed to delete file' };
  }
}

// 파일 검증 함수
export function validateFile(file: File): { isValid: boolean; error?: string } {
  // 파일 크기 제한: 5MB
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  // 허용된 파일 타입
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (file.size > MAX_SIZE) {
    return {
      isValid: false,
      error: 'File size must be less than 5MB',
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only JPEG, PNG, WebP, and GIF files are allowed',
    };
  }

  return { isValid: true };
}

// URL에서 파일 경로 추출 (삭제를 위한 유틸리티)
export function extractFilePathFromUrl(
  url: string,
  bucket: string = 'project-thumbnails',
): string | null {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const bucketIndex = pathSegments.indexOf(bucket);

    if (bucketIndex === -1) return null;

    return pathSegments.slice(bucketIndex + 1).join('/');
  } catch {
    return null;
  }
}
