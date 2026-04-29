'use client';

import type { RadioGroupProps } from '@skyroc/web-ui';
import { RadioGroup } from '@skyroc/web-ui';

const sizes: RadioGroupProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const items: RadioGroupProps['items'] = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' }
];

const RadioSize = () => {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map(size => (
        <RadioGroup
          defaultValue="a"
          items={items}
          key={size}
          size={size}
        />
      ))}
    </div>
  );
};

export default RadioSize;
