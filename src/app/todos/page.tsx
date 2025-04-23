'use client';

import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setTodos(data || []);
    setLoading(false);
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from('todos')
      .insert({ user_id: user.id, title: newTitle, completed: false });
    if (error) console.error(error);
    else {
      setNewTitle('');
      fetchTodos();
    }
  }

  async function toggleComplete(id: string, completed: boolean) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) console.error(error);
    else fetchTodos();
  }

  async function handleDelete(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) console.error(error);
    else fetchTodos();
  }

  // Group todos by creation date (YYYY-MM-DD)
  const groups = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    const dateKey = todo.created_at.split('T')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {});
  const groupList = Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Dos</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <Input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="New to-do"
        />
        <Button type="submit">Add</Button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupList.map(([date, items]) => (
            <Card key={date} className="shadow">
              <CardHeader>
                <CardTitle>{date}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.map(todo => (
                    <li key={todo.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id, todo.completed)}
                        />
                        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                          {todo.title}
                        </span>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(todo.id)}>
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
