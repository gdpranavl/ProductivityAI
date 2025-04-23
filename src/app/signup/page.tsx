'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      alert('Check your email for the confirmation link!');
      router.push('/login');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth signup
  const handleGoogleSignup = async () => {
    setLoading(true);
    const { error: googleError } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (googleError) setError(googleError.message);
    setLoading(false);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 items-center mt-10">
          <Link href="/" className="flex items-center gap-2 font-bold text-4xl md:text-5xl">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <BookOpen className="items-center size-4" />
            </div>
            Productivity App
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="p-6 space-y-6 bg-white rounded-lg dark:bg-gray-800">
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-2xl font-bold">Create a new account</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create a new account
                </p>
              </div>
              {error && <div className="bg-red-100 p-3 rounded text-red-700 dark:bg-red-900 dark:text-red-200">{error}</div>}
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="bharath@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing up...' : 'Sign up'}
                </Button>
              </form>
              <div className="relative text-center text-sm mb-6 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              {/* Google OAuth signup button */}
              <Button variant="outline" className="w-full flex items-center justify-center mb-6" onClick={handleGoogleSignup} disabled={loading}>
                <FcGoogle className="mr-2 h-5 w-5" />
                Sign up with Google
              </Button>
              <div className="mt-4 text-center">
                <p>
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1520885708668-9ef025710520?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="High-quality stock notes image"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
