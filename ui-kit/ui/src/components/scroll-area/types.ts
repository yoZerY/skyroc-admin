import type {
  ScrollAreaProps as _ScrollAreaProps,
  ScrollAreaScrollbarProps as _ScrollAreaScrollbarProps,
  ScrollAreaThumbProps as _ScrollAreaThumbProps,
  ScrollAreaViewportProps as _ScrollAreaViewportProps
} from '@radix-ui/react-scroll-area';

import type { ClassValue, StyledComponentProps, ThemeOrientation } from '@/types/shared';

import type { ScrollAreaSlots } from './scroll-area-variants';

/**
 * Class names for different slots in the scroll area component.
 * Allows customizing styles for the root, scrollbar, thumb, and viewport elements.
 */
export type ScrollAreaUi = Partial<Record<ScrollAreaSlots, ClassValue>>;

/**
 * Props for the scroll area root component.
 * Provides the container for scrollable content with custom scrollbar styling.
 */
export type ScrollAreaRootProps = StyledComponentProps<_ScrollAreaProps>;

/**
 * Props for the scroll area scrollbar component.
 * Represents the track element that contains the thumb for vertical or horizontal scrolling.
 */
export type ScrollAreaScrollbarProps = StyledComponentProps<_ScrollAreaScrollbarProps>;

/**
 * Props for the scroll area thumb component.
 * The draggable indicator that shows the scroll position and can be dragged to scroll.
 */
export type ScrollAreaThumbProps = StyledComponentProps<_ScrollAreaThumbProps>;

/**
 * Props for the scroll area viewport component.
 * The container that holds the actual scrollable content.
 */
export type ScrollAreaViewportProps = StyledComponentProps<_ScrollAreaViewportProps>;

/**
 * Props for the main ScrollArea component.
 * Combines root, scrollbar, and viewport configurations for a complete scrollable region.
 *
 * @example
 * ```tsx
 * <ScrollArea classNames={{ viewport: "max-h-96" }}>
 *   <div>Scrollable content here</div>
 * </ScrollArea>
 * ```
 */
export type ScrollAreaProps = ScrollAreaRootProps & {
  /**
   * Class names for customizing different parts of the scroll area component.
   */
  classNames?: ScrollAreaUi;
  /**
   * The orientation of the scroll area.
   */
  orientation?: ThemeOrientation;
  /**
   * The ref of the scroll area.
   */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Props for the scroll area scrollbar component.
   */
  scrollbarProps?: ScrollAreaScrollbarProps;
  /**
   * Props for the scroll area thumb component.
   */
  thumbProps?: ScrollAreaThumbProps;
  /**
   * Props for the scroll area viewport component.
   */
  viewportProps?: ScrollAreaViewportProps;
};
