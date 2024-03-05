import React, { useState } from 'react';

import Preferences from '../Components/User/Preferences';
import { useOutletContext } from 'react-router-dom';
import TopNav from '../Components/TopNav/TopNav';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GasStationList from '../Components/GasStation/GasStationList';

export default function Home() {
  const [isList, setIsList] = useState(true);
  const { setIsProfilePopUp } = useOutletContext();
  return (
    <>
      <TopNav showSearchbar setIsProfilePopUp={setIsProfilePopUp}>
        <div
          onClick={() => setIsList(true)}
          className={`flex flex-row items-center ${
            isList
              ? 'text-lightMode-button dark:text-darkMode-button'
              : 'text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header '
          }    w-[100px] justify-center gap-x-1 ${'cursor-pointer'}  max-[740px]:w-10`}
        >
          <FormatListBulletedOutlinedIcon />
          <div className='max-[740px]:hidden'>List</div>
        </div>
        <div className='h-full cborder border-l-[1px]'></div>
        <div
          onClick={() => setIsList(false)}
          className={`flex flex-row items-center ${
            !isList
              ? 'text-lightMode-button dark:text-darkMode-button'
              : 'text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header '
          } w-[100px] justify-center gap-x-1 ${'cursor-pointer'} max-[740px]:w-10`}
        >
          <MapOutlinedIcon />
          <div className='max-[740px]:hidden'>Map</div>
        </div>
      </TopNav>
      <div className='  max-[520px]:overflow-auto  max-[520px]:flex max-[520px]:flex-row max-[520px]:gap-x-4'>
        <Preferences isList={isList} />
      </div>
      <GasStationList isList={isList} />
    </>
  );
}
// shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[0px_0px_6px__#e2e8f033]
