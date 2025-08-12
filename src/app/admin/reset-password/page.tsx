'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function ResetPasswordContent() {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const handleAuthFromHash = async () => {
      // URL fragment(#)에서 토큰 추출
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');
      const code = hashParams.get('code'); // OAuth code가 있을 수도 있음

      console.log('Hash params:', window.location.hash);
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      console.log('Type:', type);
      console.log('Code:', code);

      if (accessToken && refreshToken && type === 'recovery') {
        // URL 디코딩 및 토큰 검증
        console.log('Raw access token:', accessToken);
        console.log('Raw refresh token:', refreshToken);

        try {
          // 토큰 디코딩
          const decodedAccessToken = decodeURIComponent(accessToken);
          const decodedRefreshToken = decodeURIComponent(refreshToken);

          console.log('Decoded access token:', decodedAccessToken);
          console.log('Decoded refresh token:', decodedRefreshToken);

          // 세션 설정
          supabase.auth
            .setSession({
              access_token: decodedAccessToken,
              refresh_token: decodedRefreshToken,
            })
            .then(({ data, error }) => {
              console.log('Session set result:', { data, error });
              if (!error && data.session) {
                setStep('reset');
                // URL을 깔끔하게 정리
                window.history.replaceState(
                  {},
                  document.title,
                  '/admin/reset-password',
                );
              } else if (error) {
                console.error('Session setting failed:', error);
                setError(
                  '토큰이 유효하지 않습니다. 새로운 재설정 링크를 요청해주세요.',
                );
              }
            });
        } catch (err) {
          console.error('Token parsing error:', err);
          setError(
            '토큰 파싱 중 오류가 발생했습니다. 새로운 재설정 링크를 요청해주세요.',
          );
        }
      }

      // 인증 상태 변경 감지
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state change:', event, session);
        if (event === 'PASSWORD_RECOVERY') {
          setStep('reset');
        }
      });

      return () => subscription.unsubscribe();
    };

    handleAuthFromHash();
  }, []);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      console.log('Reset password for:', email);
      console.log(
        'Redirect URL:',
        `${window.location.origin}/admin/reset-password`,
      );

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      console.log('Reset password response:', error);

      if (error) {
        setError(error.message);
      } else {
        setMessage(
          '비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.',
        );
      }
    } catch (err) {
      setError('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage(
          '비밀번호가 성공적으로 변경되었습니다! 로그인 페이지로 이동합니다.',
        );
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      }
    } catch (err) {
      setError('비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-surface text-primary flex items-center justify-center gaming-grid-bg"
      style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}
    >
      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="gaming-header">
              <h1 className="gaming-header-text text-2xl">
                {step === 'request' ? 'PASSWORD RESET' : 'NEW PASSWORD'}
              </h1>
            </div>
            <div className="gaming-header-border"></div>
          </div>
          <p className="gaming-secondary-text mt-4">
            {step === 'request'
              ? 'Enter your email to receive reset instructions'
              : 'Enter your new password'}
          </p>
        </div>

        {/* Form */}
        <div className="gaming-card">
          {step === 'request' ? (
            /* Password Reset Request Form */
            <form onSubmit={handleRequestReset} className="space-y-6">
              <div>
                <label className="block gaming-text text-sm mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="gaming-input w-full pl-10"
                    placeholder="Enter your email address..."
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="bg-error/20 border-2 border-error p-3 text-center">
                  <p className="text-error font-bold text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="bg-accent/20 border-2 border-accent p-3 text-center">
                  <p className="text-accent font-bold text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full gaming-button py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
              </button>
            </form>
          ) : (
            /* New Password Form */
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block gaming-text text-sm mb-2">
                  NEW PASSWORD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="gaming-input w-full pl-10 pr-12"
                    placeholder="Enter new password..."
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-accent transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block gaming-text text-sm mb-2">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="gaming-input w-full pl-10"
                    placeholder="Confirm new password..."
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-error/20 border-2 border-error p-3 text-center">
                  <p className="text-error font-bold text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="bg-accent/20 border-2 border-accent p-3 text-center">
                  <p className="text-accent font-bold text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isLoading || !password.trim() || !confirmPassword.trim()
                }
                className="w-full gaming-button py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'UPDATING...' : 'UPDATE PASSWORD'}
              </button>
            </form>
          )}

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="gaming-secondary-text text-xs mb-3">
              {step === 'request'
                ? 'Check your email for reset instructions'
                : 'Password must be at least 6 characters long'}
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/admin/login')}
            className="gaming-secondary-text hover:text-accent transition-colors text-sm flex items-center justify-center gap-1"
          >
            <ArrowLeft size={16} />
            BACK TO LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface text-primary flex items-center justify-center">
          <div className="gaming-text">Loading...</div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
