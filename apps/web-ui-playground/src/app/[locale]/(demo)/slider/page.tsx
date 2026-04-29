import type { Metadata } from 'next';
import { generateComponentMetadata } from '../components-meta';
import SliderBasic from './modules/SliderBasic';
import SliderColor from './modules/SliderColor';
import SliderControlled from './modules/SliderControlled';
import SliderCustom from './modules/SliderCustom';
import SliderRangeDemo from './modules/SliderRangeDemo';
import SliderSize from './modules/SliderSize';
import SliderVertical from './modules/SliderVertical';

export async function generateMetadata(): Promise<Metadata> {
  return await generateComponentMetadata('slider');
}

const SliderPage = () => {
  return (
    <div className="flex-c gap-4">
      <SliderBasic />
      <SliderControlled />
      <SliderRangeDemo />
      <SliderColor />
      <SliderVertical />
      <SliderSize />
      <SliderCustom />
    </div>
  );
};

export default SliderPage;
