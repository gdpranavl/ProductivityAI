import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link href="/notes">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/todos">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader>
            <CardTitle>To-Dos</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/collaboration">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader>
            <CardTitle>Collaboration</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/daily-summary">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </main>
  );
}
