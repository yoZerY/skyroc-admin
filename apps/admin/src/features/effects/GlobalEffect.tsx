import { ThemeEffect } from '@skyroc/web-admin-theme';

import { localStg } from '@/utils/storage';

import LangEffect from '../lang/LangEffect';

const GlobalEffect = () => {
  return (
    <>
      <ThemeEffect setStorage={localStg.set} />
      <LangEffect />
    </>
  );
};

export default GlobalEffect;
