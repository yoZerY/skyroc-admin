'use client';

import type { ResizablePanelGroupProps } from '@skyroc/web-ui';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@skyroc/web-ui';

const sizes: ResizablePanelGroupProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const ResizableSize = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {sizes.map(size => (
        <ResizablePanelGroup
          className="h-20 max-w-md rounded-lg border"
          key={size}
          orientation="horizontal"
          size={size}
        >
          <ResizablePanel
            defaultSize={40}
            minSize={25}
          >
            <div className="flex h-full items-center justify-center p-4">
              <span className="font-semibold">{size}</span>
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            size={size}
          />

          <ResizablePanel
            defaultSize={60}
            minSize={25}
          >
            <div className="flex h-full items-center justify-center p-4">
              <span className="font-semibold">Panel</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ))}
    </div>
  );
};

export default ResizableSize;
