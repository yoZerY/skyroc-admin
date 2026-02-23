import { useMemo } from 'react';
import { View } from 'react-native';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cn } from '@skyroc/utils';
import type { SlotClassNames } from '../../types/shared';
import { Button } from '../button/Button';
import { Text } from '../text/Typography';
import { paginationVariants } from './pagination-variants';
import { getPageCount, getRange, transform } from './shared';
import type { PaginationPageItem, PaginationProps, PaginationSlots } from './types';

interface PageItemRenderContext {
  /** 各插槽自定义 className */
  classNames: SlotClassNames<PaginationSlots> | undefined;

  /** 是否全局禁用 */
  disabled: boolean;

  /** 页码点击回调 */
  onPress: (value: number) => void;

  /** 当前页码 */
  page: number;
}

/** 渲染单个页码项 */
function renderPageItem(item: PaginationPageItem, idx: number, ctx: PageItemRenderContext) {
  const { classNames, disabled, onPress, page } = ctx;

  if (item.type === 'ellipsis') {
    const slots = paginationVariants();
    return (
      <View
        key={`ellipsis-${String(idx)}`}
        className={cn(slots.ellipsis(), classNames?.ellipsis)}
      >
        <Text className={cn(slots.desc(), classNames?.desc)}>...</Text>
      </View>
    );
  }

  const isActive = item.value === page;
  const itemSlots = paginationVariants({ active: isActive });

  return (
    <Button
      key={item.value}
      className={cn(itemSlots.item(), classNames?.item)}
      color={isActive ? 'primary' : 'muted'}
      disabled={disabled}
      textClassName={cn(itemSlots.itemText(), classNames?.itemText)}
      size="sm"
      variant={isActive ? 'solid' : 'ghost'}
      onPress={() => onPress(item.value)}
    >
      {String(item.value)}
    </Button>
  );
}

const Pagination = (props: PaginationProps) => {
  const {
    className,
    classNames,
    defaultPage = 1,
    disabled = false,
    itemsPerPage = 10,
    mode = 'multi',
    nextText = 'Next',
    onPageChange,
    page: pageProp,
    prevText = 'Prev',
    showEdges = false,
    siblingCount = 1,
    totalItems = 0
  } = props;

  const [page, setPage] = useControllableState({
    caller: 'pagination',
    defaultProp: defaultPage,
    onChange: onPageChange,
    prop: pageProp
  });

  const pageCount = useMemo(() => getPageCount(totalItems, itemsPerPage), [totalItems, itemsPerPage]);

  const pages = useMemo(
    () => transform(getRange(page, pageCount, siblingCount, showEdges)),
    [page, pageCount, siblingCount, showEdges]
  );

  const isFirst = page <= 1;
  const isLast = page >= pageCount;

  const slots = paginationVariants();

  function handlePrev() {
    if (isFirst || disabled) return;
    setPage(page - 1);
  }

  function handleNext() {
    if (isLast || disabled) return;
    setPage(page + 1);
  }

  function handlePagePress(value: number) {
    if (disabled) return;
    setPage(value);
  }

  const ctx: PageItemRenderContext = { classNames, disabled, onPress: handlePagePress, page };

  return (
    <View className={cn(slots.root(), className)}>
      <View className={cn(slots.content(), classNames?.content)}>
        <Button
          className={classNames?.navButton}
          color="muted"
          disabled={isFirst || disabled}
          size="sm"
          variant="ghost"
          onPress={handlePrev}
        >
          {prevText}
        </Button>

        {mode === 'simple' ? (
          <View className={cn(slots.ellipsis(), classNames?.desc)}>
            <Text className={cn(slots.desc(), classNames?.desc)}>
              {page}/{pageCount}
            </Text>
          </View>
        ) : (
          pages.map((item, idx) => renderPageItem(item, idx, ctx))
        )}

        <Button
          className={classNames?.navButton}
          color="muted"
          disabled={isLast || disabled}
          size="sm"
          variant="ghost"
          onPress={handleNext}
        >
          {nextText}
        </Button>
      </View>
    </View>
  );
};

export { Pagination };
