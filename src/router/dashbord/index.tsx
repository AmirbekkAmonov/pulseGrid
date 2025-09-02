import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/dashbord/Header';

const DashboardLayout = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Header />
      {/* Main Content */}
      <main>
        <Outlet /> {/* 🔑 ichki sahifalar shu yerga tushadi */}
      </main>
    </div>
  );
};

export default DashboardLayout;
