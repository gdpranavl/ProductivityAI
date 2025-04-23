'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';

interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  created_at: string;
}

export default function NotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>(note?.summary || '');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [errorSummary, setErrorSummary] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;

  useEffect(() => {
    async function fetchNote() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setNote(data);
      } catch (error: unknown) {
        console.error('Error fetching note:', error);
        setError('Failed to load note. It may have been deleted or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchNote();
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (searchParams.get('autoSummarize') === 'true' && note) {
      handleGenerateSummary();
    }
  }, [searchParams, note]);

  async function deleteNote() {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      router.push('/notes');
      router.refresh();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  }

  async function handleGenerateSummary() {
    if (!note) return;
    setLoadingSummary(true);
    setErrorSummary(null);
    try {
      const content = note.content;
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Failed to generate summary');
      const data = await res.json();
      setSummary(data.summary);
      // persist summary to Supabase
      const { error: supError } = await supabase
        .from('notes')
        .update({ summary: data.summary })
        .eq('id', id);
      if (supError) throw supError;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorSummary(msg);
    } finally {
      setLoadingSummary(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading note...</div>;
  }

  if (error || !note) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'Note not found'}</p>
        <Button 
          onClick={() => router.push('/notes')}
          className="mt-4"
        >
          Back to Notes
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{note.title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/notes')}
          >
            Back
          </Button>
          <Button
            variant="destructive"
            onClick={deleteNote}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
        <div className="prose max-w-none dark:prose-invert">
          <h2 className="text-lg font-semibold">Content</h2>
          <p>{note.content}</p>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Created: {new Date(note.created_at).toLocaleString()}
        </div>
      </div>

      <div className="bg-white mt-5 p-6 rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">AI Summary</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={handleGenerateSummary}
            disabled={loadingSummary}
          >
            {loadingSummary ? 'Generating...' : 'Summarize'}
          </Button>
        </div>
        {errorSummary && (
          <p className="text-red-500 text-sm mb-2">{errorSummary}</p>
        )}
        {summary ? (
          <p className="prose dark:prose-invert max-w-none">{summary}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No summary generated yet. Click the button.</p>
        )}
      </div>
    </div>
  );
}
