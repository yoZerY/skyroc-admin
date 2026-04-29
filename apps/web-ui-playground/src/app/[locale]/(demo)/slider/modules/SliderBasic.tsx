'use client';

import { Card, Slider } from '@skyroc/web-ui';

const SliderBasic = () => {
  return (
    <Card
      split
      title="Basic"
    >
      <div className="w-[480px] max-sm:w-auto">
        <Slider
          defaultValue={[40]}
          max={100}
          step={1}
        />
      </div>
    </Card>
  );
};

export default SliderBasic;
