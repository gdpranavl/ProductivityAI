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
import { FileText, Cpu, Tag, CheckSquare, Users } from 'lucide-react';
import Image from 'next/image';

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
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-8 max-w-6xl w-full">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-primary">Welcome to <i>the</i> Productivity App</h1>
          <p className="text-lg text-gray-700">All-in-one productivity suite: notes, AI summaries, to-dos & collaboration.</p>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/login')}>Log In</Button>
            <Button variant="outline" onClick={() => router.push('/signup')}>Sign Up</Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://plus.unsplash.com/premium_photo-1705010662538-87ed292fdd5e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdGl2ZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Productivity illustration"
            width={384}
            height={288}
            className="rounded-xl shadow-lg w-full max-w-sm"
          />
        </div>
      </section>
      {/* Feature Cards Carousel */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6">Features</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>Create Notes</CardTitle>
              <CardDescription>Quickly jot down ideas</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Markdown support, tags, and more.
            </CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>AI Summaries</CardTitle>
              <CardDescription>Get concise summaries</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Cpu className="h-6 w-6 text-primary" />
              Powered by Gemini 2.0 Flash.
            </CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>Organize</CardTitle>
              <CardDescription>Tags and search</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Tag className="h-6 w-6 text-primary" />
              Easily find your notes.
            </CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>To-Do Lists</CardTitle>
              <CardDescription>Manage your tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <CheckSquare className="h-6 w-6 text-primary" />
              Create and track to-dos.
            </CardContent>
          </Card>
          <Card className="min-w-[18rem] snap-start bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>Share with team</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Real-time note collaboration.
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full bg-gray-50 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">What our users say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardContent className="text-center">&ldquo;This app boosted my productivity!&rdquo;</CardContent>
            <CardFooter className="justify-center">Alice</CardFooter>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardContent className="text-center">&ldquo;Love the AI summaries feature.&rdquo;</CardContent>
            <CardFooter className="justify-center">Bob</CardFooter>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <CardContent className="text-center">&ldquo;Clean UI and easy to use.&rdquo;</CardContent>
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
