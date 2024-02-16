import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
export default function BottomNav() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  return (
    <div className='h-[56px] w-full flex flex-row justify-evenly items-center sbg border-t-[1px] cborder'>
      <div
        onClick={() => navigate('/home')}
        className={` ${
          pathName === '/home'
            ? 'tb'
            : 'tp hover:text-lightMode-header dark:hover:text-darkMode-header'
        }  cursor-pointer `}
      >
        <HomeIcon sx={{ fontSize: 30 }} />
      </div>
      <div
        onClick={() => navigate('/search')}
        className={` ${
          pathName === '/search'
            ? 'tb'
            : 'tp hover:text-lightMode-header dark:hover:text-darkMode-header'
        }  cursor-pointer `}
      >
        <SearchIcon sx={{ fontSize: 30 }} />
      </div>
      <div
        onClick={() => navigate('/rewards')}
        className={` ${
          pathName === '/rewards'
            ? 'tb'
            : 'tp hover:text-lightMode-header dark:hover:text-darkMode-header'
        }  cursor-pointer `}
      >
        <WalletOutlinedIcon sx={{ fontSize: 30 }} />
      </div>
      <div
        onClick={() => navigate('/favourite')}
        className={` ${
          pathName === '/favourite'
            ? 'tb'
            : 'tp hover:text-lightMode-header dark:hover:text-darkMode-header'
        }  cursor-pointer `}
      >
        <FavoriteIcon sx={{ fontSize: 30 }} />
      </div>
      <div
        onClick={() => navigate('/profile')}
        className={` ${
          pathName === '/profile'
            ? 'tb'
            : 'tp hover:text-lightMode-header dark:hover:text-darkMode-header'
        }  cursor-pointer `}
      >
        <AccountCircleIcon sx={{ fontSize: 30 }} />
      </div>
    </div>
  );
}
