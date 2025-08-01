'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { signInSchema } from '@/models/auth';
import type { FormErrorState, TNullable } from '@/types';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { InputField } from './ui/input-field';
import { Loading } from './ui/loading';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<TNullable<FormErrorState<typeof signInSchema>>>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(z.treeifyError(result.error).properties);
      return;
    }

    authClient.signIn.email({
      ...result.data,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          redirect(routes.home());
        },
        onResponse: () => {
          setIsPending(false);
        },
      },
    });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                labelSuffix={
                  <Link
                    href={routes.forgotPassword()}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                }
              />

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loading /> : 'Login'}
                </Button>
                {/* TODO: Implement Google login */}
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href={routes.register()} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
