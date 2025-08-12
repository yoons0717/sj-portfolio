'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Checking authentication status...', isAuthenticated);
    if (isAuthenticated) {
      router.push('/admin/projects/new');
    }
    checkInitialSession();
  }, [isAuthenticated, router]);

  const checkInitialSession = async () => {
    const users = await supabase.auth.getUser();
    console.log('Checking initial session...', users);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);

      if (success) {
        router.push('/admin/projects/new');
      } else {
        setError('Invalid email or password. Please try again.');
        setPassword('');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
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
              <h1 className="gaming-header-text text-2xl">ADMIN ACCESS</h1>
            </div>
            <div className="gaming-header-border"></div>
          </div>
          <p className="gaming-secondary-text mt-4">
            Enter password to access admin panel
          </p>
        </div>

        {/* Login Form */}
        <div className="gaming-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block gaming-text text-sm mb-2">
                ADMIN EMAIL
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
                  placeholder="Enter admin email..."
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block gaming-text text-sm mb-2">
                ADMIN PASSWORD
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
                  placeholder="Enter admin password..."
                  required
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

            {error && (
              <div className="bg-error/20 border-2 border-error p-3 text-center">
                <p className="text-error font-bold text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email.trim() || !password.trim()}
              className="w-full gaming-button py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'AUTHENTICATING...' : 'ACCESS ADMIN PANEL'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center space-y-3">
            <button
              type="button"
              onClick={() => router.push('/admin/reset-password')}
              className="gaming-secondary-text hover:text-accent transition-colors text-sm underline"
            >
              Forgot your password?
            </button>
            <p className="gaming-secondary-text text-xs">
              Admin access required for project management
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="gaming-secondary-text hover:text-accent transition-colors text-sm"
          >
            ← BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
}
