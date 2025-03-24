
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
      <main className='flex'>
        <Sidebar/>
        <section className='flex-1 min-h-screen max-h-screen overflow-auto'>
        <Outlet />
        </section>
      </main>
  );
};

export default DashboardLayout;
