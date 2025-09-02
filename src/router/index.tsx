import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './PrivateRoute';
import Landing from './landing';
import Login from '../components/ui/auth/Login';
import Register from '../components/ui/auth/Register';
import NotFound from '../components/ui/404/NotFound';
import { useState } from 'react';
import DashboardLayout from './dashbord/index';

import Home from '../pages/dashbord/Home';
import Profile from '../pages/dashbord/Profile';
import Settings from '../pages/dashbord/Settings';

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Routes>
      {/* Bosh sahifa - Landing page */}
      <Route path="/" element={<Landing />} />

      {/* Login sahifasi */}
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<Register />} />
      {/* Dashboard sahifalari */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 page - xatolik yoki sahifa topilmaganda */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
