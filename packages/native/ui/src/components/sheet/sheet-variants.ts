import { tv } from 'tailwind-variants';

/** Sheet 多 slot 样式变体 */
export const sheetVariants = tv({
  slots: {
    root: 'flex-1 rounded-t-2xl bg-background',
    handle: 'items-center py-2',
    handleBar: 'h-1 w-8 rounded-full bg-muted-foreground/30',
    header: 'relative items-center justify-center px-12',
    title: 'text-center text-base font-semibold text-foreground',
    description: 'px-6 pt-2 text-center text-sm text-muted-foreground',
    close: 'absolute right-4 top-[-8px] size-6 items-center justify-center rounded-full bg-muted will-change-pressable active:opacity-70',
    body: 'flex-1'
  }
});
