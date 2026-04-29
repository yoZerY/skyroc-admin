import type { Metadata } from 'next';
import { generateComponentMetadata } from '../components-meta';
import ToggleGroupCustom from './modules/ToggleGroupCustom';
import ToggleGroupDisabled from './modules/ToggleGroupDisabled';
import ToggleGroupMulti from './modules/ToggleGroupMulti';
import ToggleGroupSingle from './modules/ToggleGroupSingle';
import ToggleGroupSize from './modules/ToggleGroupSize';
import ToggleGroupVariant from './modules/ToggleGroupVariant';

export async function generateMetadata(): Promise<Metadata> {
  return generateComponentMetadata('toggle-group');
}

const ToggleGroupPage = () => {
  return (
    <div className="flex-c gap-4">
      <ToggleGroupSingle />
      <ToggleGroupMulti />
      <ToggleGroupVariant />
      <ToggleGroupSize />
      <ToggleGroupDisabled />
      <ToggleGroupCustom />
    </div>
  );
};

export default ToggleGroupPage;
