import type { CommonMapToken } from 'antd/es/theme/interface';
import type { SeedToken } from 'antd/es/theme/internal';

import genRadiusMapToken from './genRadiusMapToken';

export default function genCommonMapToken(token: SeedToken): CommonMapToken {
  const { borderRadius, lineWidth, motionBase, motionUnit } = token;

  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    ...genRadiusMapToken(borderRadius)
  };
}
