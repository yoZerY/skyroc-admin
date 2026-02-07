import { ButtonIcon } from '@skyroc/ui-antd';
import { useBoolean } from 'ahooks';
import { Suspense } from 'react';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

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
      <ButtonIcon
        className="px-12px"
        hoverAnimation="scale"
        tooltipContent={t('common.search')}
        onClick={toggle}
      >
        <IconUilSearch />
      </ButtonIcon>

      <Suspense>
        <SearchModal
          show={show}
          onClose={setFalse}
        />
      </Suspense>
    </>
  );
});

export default GlobalSearch;
