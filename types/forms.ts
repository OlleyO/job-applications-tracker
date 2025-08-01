import type z from 'zod';

export type FormErrorState<T extends z.ZodTypeAny> = Partial<
  Record<
    keyof z.infer<T>,
    {
      errors: string[];
    }
  >
>;
