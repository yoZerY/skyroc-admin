import { Pressable, View } from 'react-native';
import { cn, isString } from '@skyroc/utils';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from '../text/Typography';
import { navBarVariants } from './navbar-variants';
import type { NavBarProps } from './types';

/** 导航栏组件 */
const NavBar = (props: NavBarProps) => {
  const {
    border = true,
    className,
    classNames,
    left,
    leftArrow = false,
    leftDisabled = false,
    leftText,
    onLeftPress,
    onRightPress,
    onTitlePress,
    right,
    rightDisabled = false,
    rightText,
    safeAreaInsetTop = false,
    title
  } = props;

  const slots = navBarVariants({ border, leftDisabled, rightDisabled });

  const hasLeft = left || leftArrow || leftText;
  const hasRight = right || rightText;

  function renderLeft() {
    if (left) return left;

    if (!leftArrow && !leftText) return null;

    return (
      <>
        {leftArrow && (
          <AntDesign
            color="#09090b"
            name="left"
            size={18}
          />
        )}
        {leftText ? <Text className="text-sm">{leftText}</Text> : null}
      </>
    );
  }

  function renderRight() {
    if (right) return right;

    if (!rightText) return null;

    return <Text className="text-sm text-primary">{rightText}</Text>;
  }

  const leftContent = renderLeft();
  const rightContent = renderRight();

  return (
    <View className={cn(slots.root(), safeAreaInsetTop && 'pt-safe', className)}>
      {/* Title - 绝对定位居中，不受两侧内容宽度影响 */}
      {title && (
        <Pressable
          className={cn(slots.title(), classNames?.title)}
          disabled={!onTitlePress}
          onPress={onTitlePress}
        >
          {isString(title) ? <Text className="text-base font-semibold text-foreground">{title}</Text> : title}
        </Pressable>
      )}

      {/* Left */}
      {hasLeft ? (
        <Pressable
          className={cn(slots.left(), classNames?.left)}
          disabled={leftDisabled || !onLeftPress}
          onPress={onLeftPress}
        >
          {leftContent}
        </Pressable>
      ) : (
        <View />
      )}

      {/* Right */}
      {hasRight ? (
        <Pressable
          className={cn(slots.right(), classNames?.right)}
          disabled={rightDisabled || !onRightPress}
          onPress={onRightPress}
        >
          {rightContent}
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

export { NavBar };
