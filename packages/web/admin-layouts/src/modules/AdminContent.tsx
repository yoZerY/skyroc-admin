import { useSettingsTheme } from '@skyroc/web-admin-theme';
import { Outlet } from '@tanstack/react-router';
import type { Transition, Variants } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';

import { useAdminLayoutContext } from '../context';
import { useRoute } from '../features/use-route';
import { useAdminState } from '../state/use-admin-state';

const pageAnimationVariants: Record<Theme.ThemePageAnimateMode, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  'fade-slide': {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  'fade-bottom': {
    initial: { opacity: 0, y: '-10%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '10%' }
  },
  'fade-scale': {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  'zoom-fade': {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.06 }
  },
  'zoom-out': {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 }
  },
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
};

const pageAnimationTransitions: Record<Theme.ThemePageAnimateMode, Transition> = {
  fade: { duration: 0.3, ease: 'easeInOut' },
  'fade-slide': { duration: 0.3, ease: 'easeInOut' },
  'fade-bottom': { duration: 0.3, ease: 'easeInOut' },
  'fade-scale': { duration: 0.28, ease: 'easeInOut' },
  'zoom-fade': { duration: 0.3, ease: 'easeOut' },
  'zoom-out': { duration: 0.15, ease: 'easeOut' },
  none: { duration: 0 }
};

function getPageAnimationMode(page?: Theme.ThemeSetting['page']) {
  if (!page?.animate) {
    return 'none';
  }

  return page.animateMode;
}

const GlobalContent = () => {
  const { content } = useAdminLayoutContext();
  const route = useRoute();
  const { reloadFlag } = useAdminState();
  const { page } = useSettingsTheme();

  const animationMode = getPageAnimationMode(page);
  const contentKey = route.fullPath || route.pathname;
  const shouldRenderContent = reloadFlag !== false;

  return (
    <div className="h-full grow bg-layout p-16px">
      <AnimatePresence initial={false} mode="wait">
        {shouldRenderContent && (
          <motion.div
            animate="animate"
            className="h-full"
            data-page-animation={animationMode}
            exit="exit"
            initial="initial"
            key={contentKey}
            transition={pageAnimationTransitions[animationMode]}
            variants={pageAnimationVariants[animationMode]}
          >
            {content ?? <Outlet />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalContent;
