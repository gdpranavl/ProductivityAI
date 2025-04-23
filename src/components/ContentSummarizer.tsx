// components/ContentSummarizer.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ContentSummarizerProps {
  contentId: string;
  existingSummary?: string;
  onSummaryGenerated?: (summary: string) => void;
}

export default function ContentSummarizer({ 
  contentId,
  existingSummary,
  onSummaryGenerated 
}: ContentSummarizerProps) {
  const [summary, setSummary] = useState(existingSummary || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.summary);
      
      if (onSummaryGenerated) {
        onSummaryGenerated(data.summary);
      }

    } catch (err) {
      console.error('Summarization error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Summary</h3>
        <Button
          onClick={handleSummarize}
          disabled={loading}
          size="sm"
          variant="outline"
        >
          {loading ? 'Generating...' : 'Generate Summary'}
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      {summary ? (
        <p className="prose dark:prose-invert max-w-none">
          {summary}
        </p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No summary generated yet. Click the button to create one.
        </p>
      )}
    </div>
  );
}
