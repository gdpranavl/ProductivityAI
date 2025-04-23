'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CollaborationPage() {
  const [stats, setStats] = useState({ total: 0, pending: 0, score: 0 });
  const [daily, setDaily] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;
      const { count: total } = await supabase
        .from('collaborations')
        .select('id', { count: 'exact' })
        .or(`user_id.eq.${user.id},collaborator_id.eq.${user.id}`);
      const { count: pending } = await supabase
        .from('collaborations')
        .select('id', { count: 'exact' })
        .eq('collaborator_id', user.id)
        .eq('status', 'pending');
      const score = (total || 0) * 10;
      const { data } = await supabase
        .from('collaborations')
        .select('created_at')
        .or(`user_id.eq.${user.id},collaborator_id.eq.${user.id}`);
      const groups = (data || []).reduce<Record<string, number>>((acc, { created_at }) => {
        const date = created_at.split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      const dailyData = Object.entries(groups).map(([date, count]) => ({ date, count }));
      dailyData.sort((a, b) => a.date.localeCompare(b.date));
      setStats({ total: total || 0, pending: pending || 0, score });
      setDaily(dailyData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Collaborations</CardTitle></CardHeader>
          <CardContent><p className="text-2xl">{stats.total}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Requests</CardTitle></CardHeader>
          <CardContent><p className="text-2xl">{stats.pending}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Your Score</CardTitle></CardHeader>
          <CardContent><p className="text-2xl">{stats.score}</p></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Collaborations Over Time</CardTitle></CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div>
        <h2 className="text-xl font-semibold">Start a Collaboration</h2>
        <Link href="/collaboration/new"><Button>Create New</Button></Link>
      </div>
    </main>
  );
}
