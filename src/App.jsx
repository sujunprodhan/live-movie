import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayouts from './layouts/MainLayouts';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
function Router() {
  
  return <>
  <RouterProvider router={router}/>
  </>;
}

export default Router;
