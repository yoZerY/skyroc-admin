import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import Header from './modules/Header';

const COLOR_WHITE = '#ffffff';

const LoginLayout = () => {
  const { darkMode, themeColor } = useSettingsTheme();

  const bgThemeColor = darkMode ? getPaletteColorByNumber(themeColor, 600) : themeColor;

  const ratio = darkMode ? 0.5 : 0.2;

  const location = useLocation();

  const bgColor = mixColor(COLOR_WHITE, themeColor, ratio);

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-layout"
      style={{ backgroundColor: bgColor }}
    >
      <WaveBg themeColor={bgThemeColor} />

      <ACard
        className="relative z-4 w-auto rd-12px"
        variant="borderless"
      >
        <div className="w-400px lt-sm:w-300px">
          <Header />
          <AnimatePresence
            initial={false}
            mode="wait"
          >
            <motion.main
              layout
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              className="pt-24px"
              exit={{ opacity: 0, x: 28, filter: 'blur(6px)' }}
              initial={{ opacity: 0, x: -28, filter: 'blur(6px)' }}
              key={location.pathname}
              style={{
                willChange: 'transform, opacity, filter'
              }}
              transition={{
                x: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.18, ease: 'easeOut' },
                filter: { duration: 0.18, ease: 'easeOut' }
              }}
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </div>
      </ACard>
    </div>
  );
};

export const Route = createFileRoute('/(auth)/login')({
  component: LoginLayout
});
