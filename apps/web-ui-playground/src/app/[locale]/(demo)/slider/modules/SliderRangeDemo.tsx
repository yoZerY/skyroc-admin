'use client';

import { Card, Slider } from '@skyroc/web-ui';

const SliderRangeDemo = () => {
  return (
    <Card
      split
      title="Range"
    >
      <div className="w-[480px] max-sm:w-auto">
        <Slider
          defaultValue={[25, 75]}
          max={100}
          step={5}
        />
      </div>
    </Card>
  );
};

export default SliderRangeDemo;
