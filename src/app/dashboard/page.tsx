import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineCalendar,
} from 'react-icons/hi';

export default function DashboardPage() {
  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link href="/notes">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <HiOutlineDocumentText className="h-6 w-6 text-primary" />
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Quick preview of your recent notes.</CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/todos">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <HiOutlineClipboardList className="h-6 w-6 text-primary" />
            <CardTitle>To-Dos</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Upcoming tasks at a glance.</CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/collaboration">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <HiOutlineUsers className="h-6 w-6 text-primary" />
            <CardTitle>Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Team activities and chat preview.</CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/daily-summary">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <HiOutlineCalendar className="h-6 w-6 text-primary" />
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Overview of today's highlights.</CardDescription>
          </CardContent>
        </Card>
      </Link>
    </main>
  );
}
