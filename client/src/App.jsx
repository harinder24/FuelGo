import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Context from './context';
import SideBar from './Components/SideBar/SideBar';
import BottomNav from './Components/BottomNav/BottomNav';
import MainLayout from './Components/Layout/MainLayout';

export default function App() {
  const [user, setUser] = useState(null);
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);

  return (
    <Context.Provider value={{ user, setUser }}>
      <MainLayout>
        <SideBar />
        <div className='flex flex-1 flex-col overflow-hidden'>
          <Outlet context={{ setIsProfilePopUp }} />
          <BottomNav />
        </div>
        {isProfilePopUp && (
          <SideBar isProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />
        )}
      </MainLayout>
    </Context.Provider>
  );
}
