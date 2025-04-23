'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function NewCollaborationPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    if (profileError || !profile) {
      setError('User not found');
      setLoading(false);
      return;
    }
    const { error: insertError } = await supabase
      .from('collaborations')
      .insert({
        user_id: user.id,
        collaborator_id: profile.id,
        status: 'pending',
      });
    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }
    router.push('/collaboration');
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Invite Collaborator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Collaborator's email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => router.push('/collaboration')}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Inviting...' : 'Invite'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
