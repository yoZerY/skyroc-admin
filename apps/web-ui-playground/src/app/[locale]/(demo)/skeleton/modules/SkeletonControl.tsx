'use client';

import { SkeletonContainer } from '@skyroc/web-ui';

const SkeletonControl = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SkeletonContainer
        className="rounded-lg border p-4"
        depth={1}
        loading
      >
        <div className="space-y-3">
          <h3 className="font-medium">Depth 1</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Nested text keeps its structure shallow.</p>
          </div>
        </div>
      </SkeletonContainer>

      <SkeletonContainer
        animation="wave"
        className="rounded-lg border p-4"
        loading
        skeletonColor="hsl(var(--primary) / 0.18)"
        skeletonRadius="999px"
      >
        <div className="space-y-3">
          <h3 className="font-medium">Custom Style</h3>
          <p className="text-muted-foreground text-sm">The generated skeleton uses custom color and radius.</p>
          <div className="h-16 rounded-lg" />
        </div>
      </SkeletonContainer>
    </div>
  );
};

export default SkeletonControl;
