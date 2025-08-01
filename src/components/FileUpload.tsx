import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import {
  uploadFile,
  validateFile,
  deleteFile,
  extractFilePathFromUrl,
} from '@/lib/storage';

interface FileUploadProps {
  currentUrl?: string;
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export default function FileUpload({
  currentUrl,
  onUploadSuccess,
  onUploadError,
  accept = 'image/*',
  maxSize = 5,
  className = '',
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 검증
    const validation = validateFile(file);
    if (!validation.isValid) {
      onUploadError(validation.error || 'Invalid file');
      return;
    }

    setIsUploading(true);

    try {
      console.log('📤 Starting file upload process...', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      // 기존 파일이 있다면 삭제
      if (currentUrl) {
        console.log('🧹 Removing existing file:', currentUrl);
        const filePath = extractFilePathFromUrl(currentUrl);
        if (filePath) {
          const deleteResult = await deleteFile(filePath);
          if (deleteResult.error) {
            console.warn('⚠️ Failed to delete old file:', deleteResult.error);
            // 삭제 실패해도 업로드는 계속 진행
          }
        }
      }

      // 새 파일 업로드 (익명 업로드)
      console.log('⬆️ Uploading new file...');
      const result = await uploadFile(file);

      if (result.error) {
        console.error('❌ Upload failed:', result.error);
        onUploadError(result.error);
      } else if (result.url) {
        console.log('✅ Upload successful!', result.url);
        setPreview(result.url);
        onUploadSuccess(result.url);
      }
    } catch (error) {
      console.error('💥 Upload process failed:', error);
      onUploadError('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (currentUrl) {
      const filePath = extractFilePathFromUrl(currentUrl);
      if (filePath) {
        await deleteFile(filePath);
      }
    }

    setPreview(null);
    onUploadSuccess('');

    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload area */}
      {!preview ? (
        <div
          onClick={triggerFileSelect}
          className="border-4 border-dashed border-accent p-8 text-center cursor-pointer hover:border-neon-yellow transition-colors gaming-card"
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-accent/20 border-2 border-accent flex items-center justify-center">
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
              ) : (
                <Upload className="w-6 h-6 text-accent" />
              )}
            </div>
            <div>
              <p className="gaming-text">
                {isUploading ? 'UPLOADING SYSTEM...' : 'CLICK TO UPLOAD THUMBNAIL'}
              </p>
              <p className="gaming-secondary-text text-sm mt-1" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
                JPEG, PNG, WEBP, GIF UP TO {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Preview */}
          <div className="relative rounded-lg overflow-hidden bg-card/20 border border-accent/20">
            <Image
              src={preview}
              alt="Thumbnail preview"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
              onError={() => {
                setPreview(null);
                onUploadError('Failed to load image');
              }}
            />

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                onClick={triggerFileSelect}
                disabled={isUploading}
                className="bg-accent text-white px-3 py-1.5 rounded-md text-sm hover:bg-accent-light transition-colors flex items-center space-x-1"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Change</span>
              </button>
              <button
                onClick={handleRemove}
                disabled={isUploading}
                className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-600 transition-colors flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* File info */}
          <div className="mt-2 text-sm text-gray-400">
            <p>✅ Thumbnail uploaded successfully</p>
          </div>
        </div>
      )}
    </div>
  );
}
