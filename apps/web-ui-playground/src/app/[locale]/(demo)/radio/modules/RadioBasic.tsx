'use client';

import type { RadioGroupProps } from '@skyroc/web-ui';
import { RadioGroup } from '@skyroc/web-ui';

const items: RadioGroupProps['items'] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' }
];

const RadioBasic = () => {
  return (
    <RadioGroup
      defaultValue="apple"
      items={items}
    />
  );
};

export default RadioBasic;
