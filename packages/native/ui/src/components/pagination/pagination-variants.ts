import { tv } from 'tailwind-variants';

export const paginationVariants = tv({
  slots: {
    content: 'flex-row items-center gap-1.5',
    desc: 'text-sm text-muted-foreground',
    ellipsis: 'size-8 items-center justify-center',
    item: 'size-10',
    itemText: 'text-sm',
    root: 'flex-row items-center justify-center'
  },
  variants: {
    active: {
      true: {
        itemText: 'font-semibold text-primary-foreground'
      }
    }
  }
});
