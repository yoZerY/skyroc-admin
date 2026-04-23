import { ButtonIcon } from '@skyroc/web-ui-antd';
import { useSettingsTheme } from '@skyroc/web-admin-theme';
import { useBoolean } from 'ahooks';
import { Suspense } from 'react';

const SearchModal = lazy(() => import('./components/SearchModal'));

const GlobalSearch = memo(() => {
  const { t } = useTranslation();

  const [show, { setFalse, toggle }] = useBoolean();

  const {
    header: {
      globalSearch: { visible }
    }
  } = useSettingsTheme();

  if (!visible) return null;

  return (
    <>
      <ButtonIcon className="px-12px" hoverAnimation="scale" tooltipContent={t('common.search')} onClick={toggle}>
        <IconUilSearch />
      </ButtonIcon>

      <Suspense>
        <SearchModal show={show} onClose={setFalse} />
      </Suspense>
    </>
  );
});

export default GlobalSearch;
