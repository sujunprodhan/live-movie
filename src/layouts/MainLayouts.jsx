import { Outlet } from 'react-router';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

const MainLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
