import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = isPasswordVisible ? 'text' : type;
  const passwordVisibilityIcon = isPasswordVisible ? <EyeOff /> : <Eye />;

  return (
    <div className="relative">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          { 'pr-10': type === 'password' },
          className,
        )}
        {...props}
      />

      {type === 'password' && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          rounded="full"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          {passwordVisibilityIcon}
        </Button>
      )}
    </div>
  );
}

export { Input };
