'use client';

import { useState } from 'react';
import { Card, Slider } from '@skyroc/web-ui';

const SliderControlled = () => {
  const [value, setValue] = useState([35]);

  return (
    <Card
      split
      title="Controlled"
    >
      <div className="flex w-[480px] flex-col gap-3 max-sm:w-auto">
        <Slider
          max={100}
          onValueChange={setValue}
          step={1}
          value={value}
        />

        <div className="text-muted-foreground text-sm">Value: {value[0]}</div>
      </div>
    </Card>
  );
};

export default SliderControlled;
