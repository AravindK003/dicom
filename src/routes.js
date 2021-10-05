import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import User from './pages/User';
import NotFound from './pages/Page404';
import ForgotPassword from './pages/ForgotPassword';
import Password from './pages/Password';
import Menu from './pages/Blog';
import RoleMapping from './pages/RoleMapping';
import Profile from './pages/Profile';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'role', element: <User /> },
        { path: 'company_creation', element: <Products /> },
        { path: 'menu', element: <Menu /> },
        { path: 'mapping', element: <RoleMapping /> },
        { path: 'profile', element: <Profile /> }
      ]
    },
    {
      path: '/dashboard1',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'role', element: <User /> },
        { path: 'company_creation', element: <Products /> },
        { path: 'menu', element: <Menu /> },
        { path: 'mapping', element: <RoleMapping /> },
        { path: 'profile', element: <Profile /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'confirm-password', element: <Password /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
