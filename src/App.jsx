import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayouts from './layouts/MainLayouts';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/movies',
        element:<Movies/>
      },
      {
        path:'/movies/:id',
        element:<MovieDetails/>
      }
    ],
  },
]);
function Router() {
  
  return <>
  <RouterProvider router={router}/>
  </>;
}

export default Router;
