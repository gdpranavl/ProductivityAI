'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/notes');
      }
    };

    checkUser();
  }, [router]);

  return (
    <main className="relative flex flex-col items-center px-6 py-16 space-y-20 bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-8 text-primary">
        Welcome to Productivity App
      </h1>
      <p className="text-xl mb-4 max-w-md">
        A simple app to create, view, and manage your personal notes with AI-powered summaries.
      </p>
      <ul className="text-left list-disc list-inside mb-8 max-w-md space-y-2">
        <li>Create, edit, and delete notes</li>
        <li>Generate AI-powered summaries of your content</li>
        <li>Organize and search notes efficiently</li>
      </ul>
      <div className="flex gap-4">
        <Button onClick={() => router.push('/login')}>
          Log In
        </Button>
        <Button variant="outline" onClick={() => router.push('/signup')}>
          Sign Up
        </Button>
      </div>
      {/* Feature Cards Carousel */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6">Features</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>Create Notes</CardTitle>
              <CardDescription>Quickly jot down ideas</CardDescription>
            </CardHeader>
            <CardContent>Markdown support, tags, and more.</CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>AI Summaries</CardTitle>
              <CardDescription>Get concise summaries</CardDescription>
            </CardHeader>
            <CardContent>Powered by Gemini 2.0 Flash.</CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>Organize</CardTitle>
              <CardDescription>Tags and search</CardDescription>
            </CardHeader>
            <CardContent>Easily find your notes.</CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>To-Do Lists</CardTitle>
              <CardDescription>Manage your tasks</CardDescription>
            </CardHeader>
            <CardContent>Create and track to-dos.</CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>Share with team</CardDescription>
            </CardHeader>
            <CardContent>Real-time note collaboration.</CardContent>
          </Card>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full bg-gray-50 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">What our users say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardContent className="text-center">"This app boosted my productivity!"</CardContent>
            <CardFooter className="justify-center">Alice</CardFooter>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardContent className="text-center">"Love the AI summaries feature."</CardContent>
            <CardFooter className="justify-center">Bob</CardFooter>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardContent className="text-center">"Clean UI and easy to use."</CardContent>
            <CardFooter className="justify-center">Charlie</CardFooter>
          </Card>
        </div>
      </section>
      {/* Call to Action */}
      <section className="w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to boost your productivity?</h2>
        <Button size="lg" onClick={() => router.push('/signup')}>Get Started</Button>
      </section>
    </main>
  );
}
