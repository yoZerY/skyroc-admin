import LayoutModeCard from '../../components/LayoutModeCard';

const LAYOUTS_COMPONENTS: Record<UnionKey.ThemeLayoutMode, React.ReactNode> = {
  horizontal: (
    <>
      <div className="h-16px rd-4px bg-primary" />
      <div className="flex flex-1 gap-6px">
        <div className="flex-1 rd-4px bg-primary-200" />
      </div>
    </>
  ),
  'top-hybrid-header-first': (
    <>
      <div className="h-16px rd-4px bg-primary" />
      <div className="flex flex-1 gap-6px">
        <div className="w-18px rd-4px bg-primary-300" />
        <div className="flex-1 rd-4px bg-primary-200" />
      </div>
    </>
  ),
  'top-hybrid-sidebar-first': (
    <>
      <div className="h-16px rd-4px bg-primary-300" />
      <div className="flex flex-1 gap-6px">
        <div className="w-18px rd-4px bg-primary" />
        <div className="flex-1 rd-4px bg-primary-200" />
      </div>
    </>
  ),
  vertical: (
    <>
      <div className="h-full w-18px rd-4px bg-primary" />
      <div className="flex-col flex-1 gap-6px">
        <div className="h-16px rd-4px bg-primary-200" />
        <div className="flex-1 rd-4px bg-primary-200" />
      </div>
    </>
  ),
  'vertical-hybrid-header-first': (
    <>
      <div className="h-full w-8px rd-4px bg-primary" />
      <div className="h-full w-16px rd-4px bg-primary-300" />
      <div className="flex-col flex-1 gap-6px">
        <div className="h-16px rd-4px bg-primary" />
        <div className="flex-1 rd-4px bg-primary-200" />
      </div>
    </>
  ),
  'vertical-mix': (
    <>
      <div className="h-full w-8px rd-4px bg-primary" />
      <div className="h-full w-16px rd-4px bg-primary-300" />
      <div className="flex-col flex-1 gap-6px">
        <div className="h-16px rd-4px bg-primary-200" />
        <div className="flex-1 rd-4px bg-primary-200" />
      </div>
    </>
  )
};

const LayoutMode = () => {
  return <LayoutModeCard {...LAYOUTS_COMPONENTS} />;
};

export default LayoutMode;
