import FlipText from '@/components/FilpText';
import SystemLogo from '@/components/SystemLogo';
import LangSwitch from '@/features/lang/LangSwitch';
import ThemeSchemaSwitch from '@/features/theme/components/ThemeSchemaSwitch';

const Header = memo(() => {
  const { t } = useTranslation();

  return (
    <header className="flex-y-center justify-between">
      <SystemLogo className="size-5xl text-primary lt-sm:size-4xl" />

      <FlipText
        className="text-3xl text-primary font-500 lt-sm:text-2xl"
        word={t('system.title')}
      />

      <div className="i-flex-col">
        <ThemeSchemaSwitch
          className="text-xl lt-sm:text-lg"
          showTooltip={false}
        />
        <LangSwitch showTooltip={false} />
      </div>
    </header>
  );
});

export default Header;
