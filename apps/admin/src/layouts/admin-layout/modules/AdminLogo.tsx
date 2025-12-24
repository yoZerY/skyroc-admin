import { Link } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import clsx from 'clsx';

interface Props extends Omit<LinkProps, 'to'> {
  className?: string;
  /** Whether to show the title */
  showTitle?: boolean;

  style?: React.CSSProperties;
}

const AdminLogo: FC<Props> = memo(({ className, showTitle = true, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={clsx('w-full flex-center nowrap-hidden', className)}
      to={import.meta.env.VITE_ROUTE_HOME}
      {...props}
    >
      <SystemLogo className="text-32px text-primary" />
      <h2
        className="pl-8px text-16px text-primary font-bold transition duration-300 ease-in-out"
        style={{ display: showTitle ? 'block' : 'none' }}
      >
        {t('system.title')}
      </h2>
    </Link>
  );
});

export default AdminLogo;
