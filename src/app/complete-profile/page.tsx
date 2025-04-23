'use client'
import { useState, useEffect } from 'react'
import { useRouter }        from 'next/navigation'
import { supabase }         from '@/lib/supabaseClient'
import { Input }            from '@/components/ui/input'
import { Button }           from '@/components/ui/button'
import { Label }            from '@/components/ui/label'

export default function CompleteProfilePage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge]       = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string|null>(null)

  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data:{user} }) => {
        if (!user) router.push('/login')
      })
  }, [router])

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)

    const { data:{ user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        username,
        age: parseInt(age,10),
        gender,
      })

    if (error) setError(error.message)
    else router.push('/dashboard')

    setLoading(false)
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName}
            onChange={e=>setFullName(e.target.value)}
            required />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username}
            onChange={e=>setUsername(e.target.value)}
            required />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" value={age}
            onChange={e=>setAge(e.target.value)}
            required />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" value={gender}
            onChange={e=>setGender(e.target.value)}
            required />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Save Profile'}
        </Button>
      </form>
    </main>
  )
}