import React from 'react';
import Profile from '../User/Profile';

export default function SideBar({ isProfileScreen }) {
  return (
    <div
      className={`${
        isProfileScreen
          ? 'w-full'
          : 'w-[312px] max-[1000px]:hidden max-[1000px]:rounded-none rounded-xl'
      } h-full max-[520px]:h-[calc(100%-56px)] max-[520px]:bg-lightMode-bg max-[520px]:dark:bg-darkMode-bg  bg-lightMode-sbg dark:bg-darkMode-sbg`}
    >
      <Profile />
    </div>
  );
}
