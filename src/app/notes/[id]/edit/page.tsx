'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function EditNotePage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNote() {
      setLoading(true)
      const { data, error } = await supabase
        .from('notes')
        .select('title, content')
        .eq('id', id)
        .single()
      if (error) {
        setError(error.message)
      } else if (data) {
        setTitle(data.title)
        setContent(data.content)
      }
      setLoading(false)
    }
    if (id) fetchNote()
  }, [id])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('notes')
        .update({ title, content })
        .eq('id', id)
      if (error) throw error
      router.push(`/notes/${id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  if (loading) return <div className="text-center py-8">Loading note...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button variant="outline" onClick={() => router.push(`/notes/${id}`)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
