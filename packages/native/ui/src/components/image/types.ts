import type { ImageProps as ExpoImageProps } from 'expo-image';

/** 图片组件属性 */
export interface ImageProps extends Omit<ExpoImageProps, 'source'> {
  /** NativeWind 类名 */
  className?: string;

  /** 图片源，支持字符串 URL 或标准 source 对象 */
  src: ExpoImageProps['source'] | string;
}

/** 带降级状态的图片组件属性 */
export interface ImageFallbackProps extends ImageProps {
  /** 加载失败时的自定义渲染 */
  errorSlot?: React.ReactNode;

  /** 加载中时的自定义渲染 */
  loadingSlot?: React.ReactNode;

  /** 是否显示加载失败占位 */
  showError?: boolean;

  /** 是否显示加载中占位 */
  showLoading?: boolean;
}
