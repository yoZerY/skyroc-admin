import { Image as ExpoImage } from 'expo-image';
import { isString } from '@skyroc/utils';
import type { ImageProps } from './types';

const Image = (props: ImageProps) => {
  const { src, ...rest } = props;

  const source = isString(src) ? { uri: src } : src;

  return (
    <ExpoImage
      source={source}
      {...rest}
    />
  );
};

export { Image };
