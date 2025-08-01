import { Navbar } from '@/components/navbar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function GuardedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) {
    redirect('/login');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
