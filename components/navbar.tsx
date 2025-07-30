'use client';

import { authClient } from '@/lib/auth-client';
import { BriefcaseBusiness, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navbar() {
  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          redirect('/auth/login');
        },
      },
    });
  }

  return (
    <nav className="flex items-center justify-between p-4 border border-b">
      <Link href="/">
        <BriefcaseBusiness />
      </Link>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <UserRoundCog />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleSignOut} variant="destructive">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
