# 📁 Supabase Storage 설정 가이드

이 가이드는 **익명 파일 업로드**를 위한 Supabase Storage 설정 방법을 설명합니다.

## 🚀 설정 단계

### 1️⃣ Supabase Dashboard 접속

- [Supabase Dashboard](https://supabase.com/dashboard) 접속
- 프로젝트 선택

### 2️⃣ SQL Editor에서 정책 설정

1. 좌측 메뉴에서 **SQL Editor** 클릭
2. **New query** 버튼 클릭
3. `supabase-storage-reset.sql` 파일 내용을 복사 붙여넣기
4. **Run** 버튼 클릭

### 3️⃣ Storage 설정 확인

1. 좌측 메뉴에서 **Storage** 클릭
2. `project-thumbnails` 버킷이 생성되었는지 확인
3. Settings > Policies에서 다음 정책들이 활성화되었는지 확인:
   - ✅ Public read access
   - ✅ Anonymous upload allowed
   - ✅ Public delete access
   - ✅ Public update access

## 🔓 익명 업로드 특징

### ✅ 장점

- **인증 불필요**: 로그인 없이 파일 업로드 가능
- **빠른 개발**: 복잡한 인증 로직 없이 바로 사용
- **사용자 친화적**: 회원가입 없이 콘텐츠 업로드

### ⚠️ 보안 고려사항

- **누구나 업로드 가능**: 악성 파일 업로드 위험
- **스토리지 남용**: 무제한 파일 업로드 가능
- **비용 증가**: 예상치 못한 스토리지 비용 발생 가능

## 🛡️ 보안 강화 방안

### 개발 환경용 (현재 설정)

```sql
-- 모든 사용자에게 모든 권한 허용
CREATE POLICY "Anonymous upload allowed" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-thumbnails');
```

### 프로덕션 환경용 (권장)

```sql
-- 파일 크기 제한 (예: 5MB)
CREATE POLICY "Size limited upload" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'project-thumbnails'
    AND (storage.foldername(name))[1] = 'thumbnails'
    AND octet_length(decode(encode(content, 'base64'), 'base64')) < 5242880
);

-- IP 기반 제한 (선택사항)
CREATE POLICY "IP restricted upload" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'project-thumbnails'
    AND inet_client_addr() << inet '192.168.1.0/24'
);
```

## 📱 사용 방법

### 컴포넌트에서 사용

```tsx
import FileUpload from '@/components/FileUpload';

function MyComponent() {
  return (
    <FileUpload
      onUploadSuccess={(url) => {
        console.log('✅ Upload successful:', url);
      }}
      onUploadError={(error) => {
        console.error('❌ Upload failed:', error);
      }}
    />
  );
}
```

### 직접 API 사용

```tsx
import { uploadFile } from '@/lib/storage';

async function handleUpload(file: File) {
  const result = await uploadFile(file);

  if (result.error) {
    console.error('Upload failed:', result.error);
  } else {
    console.log('Upload successful:', result.url);
  }
}
```

## 🔧 트러블슈팅

### 업로드 실패 시

1. **브라우저 콘솔 확인**: 자세한 에러 메시지 확인
2. **네트워크 탭 확인**: API 호출 상태 확인
3. **Supabase Dashboard**: Storage > Logs에서 서버 로그 확인

### 일반적인 에러들

- `RLS policy violation`: 정책 설정 문제
- `Bucket not found`: 버킷 생성 안됨
- `File too large`: 파일 크기 제한 초과
- `Invalid file type`: 허용되지 않는 파일 형식

## 📊 모니터링

### Storage 사용량 확인

1. Supabase Dashboard > Settings > Usage
2. Storage 사용량 및 비용 모니터링
3. 필요시 알림 설정

### 로그 확인

```tsx
// 개발 중 상세 로그 확인
console.log('🚀 Upload starting...');
console.log('✅ Upload successful!');
console.log('❌ Upload failed!');
```

---

**⚠️ 중요**: 프로덕션 배포 전에는 반드시 보안 정책을 강화하세요!
