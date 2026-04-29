'use client';

import type { SkeletonAnimation as SkeletonAnimationType } from '@skyroc/web-ui';
import { SkeletonContainer } from '@skyroc/web-ui';

const animations: SkeletonAnimationType[] = ['pulse', 'wave', 'none'];

const SkeletonAnimation = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {animations.map(animation => (
        <SkeletonContainer
          animation={animation}
          className="rounded-lg border p-4"
          key={animation}
          loading
        >
          <div className="space-y-3">
            <h3 className="font-medium capitalize">{animation}</h3>
            <p className="text-muted-foreground text-sm">Loading card content with a {animation} skeleton.</p>
            <div className="h-20 rounded-md" />
          </div>
        </SkeletonContainer>
      ))}
    </div>
  );
};

export default SkeletonAnimation;
