import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const inputVariants = tv({
  defaultVariants: {
    size: 'md',
    variant: 'outline'
  },
  slots: {
    clearable: 'items-center justify-center',
    control:
      'flex-1 flex-row items-center bg-transparent text-foreground placeholder:text-muted-foreground m-0 p-0 h-full',
    root: 'flex-row items-center rounded-lg bg-background'
  },
  variants: {
    disabled: {
      true: { root: 'opacity-50' }
    },
    error: {
      true: { root: 'border-destructive' }
    },
    focused: {
      true: {}
    },
    size: {
      lg: { clearable: 'size-5', control: 'text-base', root: 'h-12 gap-2.5 px-4' },
      md: { clearable: 'size-5', control: 'text-sm', root: 'h-10 gap-2 px-3' },
      sm: { clearable: 'size-4', control: 'text-xs', root: 'h-8 gap-1.5 px-2' }
    },
    variant: {
      filled: { root: 'border-transparent bg-muted border' },
      outline: { root: 'border-input border' },
      underline: { root: 'rounded-none border-b border-input' }
    }
  },
  compoundVariants: [
    { class: { root: 'border-primary' }, focused: true, variant: 'outline' },
    { class: { root: 'border border-primary' }, focused: true, variant: 'filled' },
    { class: { root: 'border-primary' }, focused: true, variant: 'underline' },
    { class: { root: 'border-destructive' }, error: true, focused: true }
  ]
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
