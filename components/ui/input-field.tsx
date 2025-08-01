import { cn } from '@/lib/utils';
import { Input } from './input';
import { Label } from './label';

interface InputFieldProps {
  label: string;
  errors?: string[];
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  labelSuffix?: React.ReactNode;
}

export function InputField(props: InputFieldProps) {
  const { label, errors, id, name, type, placeholder, labelSuffix, className, onBlur } = props;

  return (
    <fieldset className={cn('relative grid gap-3 mb-5', className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>

        {labelSuffix}
      </div>

      <Input
        aria-invalid={!!errors?.length}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
      />

      {!!errors?.length ? (
        <p className="absolute bottom-0 translate-y-5 text-xs text-destructive dark:text-destructive/40">
          {errors.join(';')}
        </p>
      ) : null}
    </fieldset>
  );
}
