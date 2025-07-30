import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ReturnButtonProps {
  href: string;
  children: React.ReactNode;
}

export function ReturnButton({ href, children }: ReturnButtonProps) {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={href}>
        <ArrowLeft />
        {children}
      </Link>
    </Button>
  );
}
