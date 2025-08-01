'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { signUpSchema } from '@/models/auth';
import type { FormErrorState, TNullable } from '@/types';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import { InputField } from './ui/input-field';
import { Loading } from './ui/loading';

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<TNullable<FormErrorState<typeof signUpSchema>>>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    const result = signUpSchema.safeParse({ name, email, password });

    if (!result.success) {
      const _errors = z.treeifyError(result.error).properties;
      setErrors(_errors);

      return;
    }

    await authClient.signUp.email(result.data, {
      onRequest: () => {
        setIsPending(true);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        toast.success('Account created successfully! Please login to continue');
        redirect(routes.login());
      },
      onResponse: () => {
        setIsPending(false);
      },
    });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email below to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <InputField
                label="Name"
                errors={errors?.name?.errors}
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
              />

              <InputField
                label="Email"
                errors={errors?.email?.errors}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />

              <InputField
                label="Password"
                errors={errors?.password?.errors}
                id="password"
                name="password"
                type="password"
                placeholder="********"
              />

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loading /> : 'Create account'}
                </Button>
                {/* TODO: Implement Google login */}
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href={routes.login()} className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
