import { BookOpen } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center items-center gap-2 mt-10">
          <Link href="/" className="flex items-center gap-2 font-bold text-4xl md:text-5xl">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <BookOpen className="size-4" />
            </div>
            Productivity App
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="p-6 space-y-6 bg-white rounded-lg dark:bg-gray-800">
              <LoginForm />
              <div className="text-center">
                <p>
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign up
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
  )
}
