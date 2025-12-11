import AntdContextHolder from './features/antd/AntdContextHolder';
import AntdProvider from './features/antd/AntdProvider';
import GlobalEffect from './features/effects/GlobalEffect';
import JotaiProvider from './features/jotai/JotaiProvider';
import RouterProvider from './features/router/RouterProvider';

const App = () => (
  <JotaiProvider>
    <AntdProvider>
      <AntdContextHolder>
        <RouterProvider />
        <GlobalEffect />
      </AntdContextHolder>
    </AntdProvider>
  </JotaiProvider>
);

export default App;
