/* eslint-disable react-refresh/only-export-components */

const Demo = () => {
  return <ABadge count={25} />;
};

const Demo2 = () => {
  return <ABadge count={26} />;
};

export const extras = {
  Demo,
  Demo2
} as const;

export type Extras = typeof extras;

export type ExtraKey = keyof Extras;
