import AdminEffect from '@/layouts/admin-layout/state/AdminEffect';

import LangEffect from '../lang/LangEffect';
import ThemeEffect from '../theme/ThemeEffect';

const GlobalEffect = () => {
  return (
    <>
      <ThemeEffect />
      <LangEffect />
      <AdminEffect />
    </>
  );
};

export default GlobalEffect;
