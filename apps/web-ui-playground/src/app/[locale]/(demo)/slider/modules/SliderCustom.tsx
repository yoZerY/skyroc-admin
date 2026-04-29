'use client';

import { Card, Slider } from '@skyroc/web-ui';

const SliderCustom = () => {
  return (
    <Card
      split
      title="Custom"
    >
      <div className="w-[480px] max-sm:w-auto">
        <Slider
          classNames={{
            range: 'bg-carbon',
            thumb: 'border-carbon ring-carbon/20',
            track: 'bg-carbon/15'
          }}
          defaultValue={[55]}
          max={100}
          step={1}
        />
      </div>
    </Card>
  );
};

export default SliderCustom;
