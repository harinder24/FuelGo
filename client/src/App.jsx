import React from 'react';
import LandingPage from './Screen/LandingPage';
import Login from './Screen/Login';
import Signup from './Screen/Signup';
import ForgetPassword from './Screen/ForgetPassword';
import ChangePassWord from './Screen/ChangePassWord';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './Screen/Error';
import Home from './Screen/Home';

import Rewards from './Screen/Rewards';
import GasStation from './Screen/GasStation';
import ProfileScreen from './Screen/ProfileScreen';
import SearchScreen from './Screen/SearchScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgetpassword',
    element: <ForgetPassword />,
  },
  {
    path: '/changepassword/:id',
    element: <ChangePassWord />,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/favourite',
    element: <Home />,
  },
  {
    path: '/rewards',
    element: <Rewards />,
  },
  {
    path: '/gs',
    element: <GasStation />,
  },
  {
    path: '/profile',
    element: <ProfileScreen />,
  },
  {
    path: '/search',
    element: <SearchScreen />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
