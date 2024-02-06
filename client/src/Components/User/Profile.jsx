import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import LensOutlinedIcon from '@mui/icons-material/LensOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PixIcon from '@mui/icons-material/Pix';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BgBlackOpacity from '../../Components/BgBlackOpacity';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import Button from '../Button';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Profile() {
  const [isSettings, setIsSettings] = useState(false);
  const [isProfile, setIsProfile] = useState(true);
  const [isFrame, setIsFrame] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);
  return (
    <div className='w-full h-full  bg-lightMode-sbg flex flex-col dark:bg-darkMode-sbg rounded-xl max-[1000px]:rounded-none overflow-auto'>
      {isProfile && (
        <ProfileComp
          setIsSettings={setIsSettings}
          setIsProfile={setIsProfile}
          setIsFrame={setIsFrame}
          setIsAvatar={setIsAvatar}
        />
      )}
      {isSettings && (
        <Settings setIsSettings={setIsSettings} setIsProfile={setIsProfile} />
      )}
      {isFrame && <Frame setIsFrame={setIsFrame} setIsProfile={setIsProfile} />}
      {isAvatar && (
        <Avatar setIsAvatar={setIsAvatar} setIsProfile={setIsProfile} />
      )}
    </div>
  );
}

function Avatar({ setIsAvatar, setIsProfile }) {
  function goBackHandler() {
    setIsAvatar(false);
    setIsProfile(true);
  }

  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' text-center th flex items-center'>
        <div onClick={() => goBackHandler()} className=' cursor-pointer'>
          <ArrowBackIcon />
        </div>
        <h2 className=' text-white text-lg   pl-4'>Avatar</h2>
      </div>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
          <img
            className='size-[60px] rounded-full  cursor-pointer object-cover relative'
            src='../public/oilrig.jpg'
            alt=''
          />
        </div>
        <div className=' relative'>
          <div className=' size-[100px] rounded-lg tbg flex justify-center items-center'>
            <img
              className='size-[60px] rounded-full  cursor-pointer object-cover relative'
              src='../public/oilrig.jpg'
              alt=''
            />
          </div>
          <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
            <div className=' w0full h-full flex justify-center items-center th text-xs px-4 text-center'>
              <div>Unlocks at level 10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileComp({ setIsSettings, setIsProfile, setIsFrame, setIsAvatar }) {
  const navigate = useNavigate();
  const crrPath = useLocation().pathname;
  function settingsHandler() {
    setIsProfile(false);
    setIsSettings(true);
  }
  function frameHandler() {
    setIsProfile(false);
    setIsFrame(true);
  }
  function avatarHandler() {
    setIsProfile(false);
    setIsAvatar(true);
  }
  return (
    <>
      <div className='p-2 pb-0 w-full mb-6 caret-transparent'>
        <div className='w-full border-t-[1px] border-lightMode-fbg h-[88px] rounded-xl tbg-gradient flex flex-row items-center  p-4 '>
          <div className='flex flex-row gap-x-4 items-center w-full justify-between'>
            <div className='flex flex-row gap-x-4 items-center flex-1'>
              <div
                style={{
                  backgroundImage: 'url("../public/frame/level5.jpg")',
                  backgroundSize: 'cover', // Adjust as needed
                  backgroundPosition: 'center', // Adjust as needed
                  // Additional background properties can be added here
                }}
                className=' flex justify-center items-center size-[60px] rounded-full border-0'
              >
                <img
                  className='size-14 rounded-full object-cover'
                  src='../public/oilrig.jpg'
                  alt=''
                />
              </div>
              <div className='flex flex-col flex-1 overflow-hidden'>
                <div className='text-lightMode-header text-base font-[400] width-full overflow-hidden text-ellipsis whitespace-nowrap'>
                  Harinder Sran
                </div>
                <div className='text-lightMode-p dark:text-darkMode-p text-sm width-full overflow-hidden text-ellipsis whitespace-nowrap'>
                  hss0220022gmail.com
                </div>
              </div>
            </div>
            <div onClick={() => settingsHandler()} className=' cursor-pointer'>
              <SettingsOutlinedIcon sx={{ color: 'white', fontSize: '28px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className='px-6 flex-col mb-2 caret-transparent'>
        <div className='text-lightMode-p dark:text-darkMode-p text-sm mb-1'>
          level 1
        </div>
        <div className='flex flex-row h-4 rounded-full bg-lightMode-tbg cborder border-[1px]'>
          {' '}
          <div
            className='bg-lightMode-button rounded-full'
            style={{ width: '20%' }}
          ></div>
          <div className='flex-1'></div>
        </div>
        <div className='text-lightMode-p dark:text-darkMode-p text-sm mt-1 flex flex-row justify-between items center'>
          <div>15</div>
          <div>15 / 75</div>
        </div>
      </div>
      <div className='px-2 w-full caret-transparent'>
        <div
          onClick={() => navigate('/favourite')}
          className={` flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg ${
            crrPath === '/favourite' && 'bg-lightMode-tbg dark:bg-darkMode-tbg'
          }`}
        >
          <FavoriteBorderOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Favourite
          </div>
        </div>
      </div>
      <div className='px-2 w-full caret-transparent'>
        <div
          onClick={() => navigate('/rewards')}
          className={` flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg ${
            crrPath === '/rewards' && 'bg-lightMode-tbg dark:bg-darkMode-tbg'
          }`}
        >
          <WalletOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Rewards
          </div>
        </div>
      </div>
      <div className='px-2 w-full caret-transparent'>
        <div
          onClick={() => avatarHandler()}
          className=' flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg'
        >
          <SentimentSatisfiedOutlinedIcon
            sx={{ color: '#ffffff', fontSize: 25 }}
          />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Avatar
          </div>
        </div>
      </div>
      <div className='px-2 w-full caret-transparent'>
        <div
          onClick={() => frameHandler()}
          className=' flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg'
        >
          <LensOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Frame
          </div>
        </div>
      </div>
      <div className='px-2 w-full mb-4 caret-transparent'>
        <div className=' flex flex-row items-center gap-x-4 p-4 py-[8.5px] rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg'>
          <CardGiftcardOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
          <div className=' flex flex-col'>
            <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
              Invite friends
            </div>
            <div className=' flex flex-row items-center gap-x-1'>
              <div className='text-lightMode-p dark:text-darkMode-p text-sm '>
                You earn 100
              </div>{' '}
              <PixIcon sx={{ color: 'white', fontSize: 14 }} />
            </div>
          </div>
        </div>
      </div>
      <div className=' border-b-[1px] border-lightMode-border dark:border-darkMode-border '></div>
      <div className='px-2 w-full mt-2 caret-transparent'>
        <div className=' flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg'>
          <ContactSupportOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Contact us
          </div>
        </div>
      </div>
      <div className='px-2 w-full caret-transparent'>
        <div className=' flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg'>
          <PowerSettingsNewOutlinedIcon
            sx={{ color: '#ffffff', fontSize: 25 }}
          />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Sign out
          </div>
        </div>
      </div>
    </>
  );
}

function Frame({ setIsFrame, setIsProfile }) {
  function goBackHandler() {
    setIsProfile(true);
    setIsFrame(false);
  }
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' text-center th flex items-center'>
        <div onClick={() => goBackHandler()} className=' cursor-pointer'>
          <ArrowBackIcon />
        </div>
        <h2 className=' text-white text-lg   pl-4'>Frame</h2>
      </div>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
          <div
            style={{
              backgroundImage: 'url("../public/frame/level5.jpg")',
              backgroundSize: 'cover', // Adjust as needed
              backgroundPosition: 'center', // Adjust as needed
              // Additional background properties can be added here
            }}
            className=' flex justify-center items-center size-[60px] rounded-full border-0 '
          >
            <div className='size-14 rounded-full tbg' />
          </div>
        </div>
        <div className=' relative'>
          <div className=' size-[100px] rounded-lg tbg flex justify-center items-center'>
            <div
              style={{
                backgroundImage: 'url("../public/frame/level10.jpg")',
                backgroundSize: 'cover', // Adjust as needed
                backgroundPosition: 'center', // Adjust as needed
                // Additional background properties can be added here
              }}
              className=' flex justify-center items-center size-[60px] rounded-full border-0 '
            >
              <div className='size-14 rounded-full tbg' />
            </div>
          </div>
          <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
            <div className=' w0full h-full flex justify-center items-center th text-xs px-4 text-center'>
              <div>Unlocks at level 10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings({ setIsSettings, setIsProfile }) {
  function goBackHandler() {
    setIsProfile(true);
    setIsSettings(false);
  }
  const [errorEmailBorder, setErrorEmailBorder] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('Harinder');
  const [img, setImg] = useState(
    'https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg'
  );
  const [errorNameBorder, setErrorNameBorder] = useState(false);
  return (
    <div className='w-full p-3'>
      <div className=' text-center th flex items-center'>
        <div onClick={() => goBackHandler()} className=' cursor-pointer'>
          <ArrowBackIcon />
        </div>
        <h2 className=' text-white text-lg   pl-4'>Account Info</h2>
      </div>
      <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-3 pb-3'>
        Profile Image
      </h4>
      <div className=' relative w-fit mb-4'>
        <img
          className=' size-[100px] rounded-full object-contain'
          src={img}
          alt=''
        />
        <div className=' absolute bottom-0 right-[-4px] rounded-full bg-white p-2 shadow-md cursor-pointer'>
          <input
            type='file'
            accept='image/*'
            // onChange={(event) => handleUpload(event)}
            className=' rounded-full w-10 h-10 absolute  bottom-[1px] right-[0px] bg-transparent cursor-pointer opacity-0'
          ></input>
          <EditIcon />
        </div>
      </div>
      <form
        //  onSubmit={(e) => handleUserData(e)}
        noValidate
      >
        <div className=' text-sm text-lightMode-p dark:text-darkMode-p mt-1 pb-1'>
          Name*
        </div>
        <div className='w-full relative'>
          <input
            autoFocus
            style={errorNameBorder ? { borderColor: 'rgb(211 47 47 )' } : {}}
            autoComplete='name'
            label='Name'
            type='name'
            value={userName}
            placeholder='Name'
            onChange={(e) => setUserName(e.target.value)}
            className='mt-1 pl-10 customInput mb-3'
          />
          <div className=' absolute top-[10px] left-2'>
            <BadgeOutlinedIcon sx={{ color: '#747c88' }} />
          </div>
        </div>
        {error && (
          <div className='w-full text-center mt-2 text-xs text-lightMode-error dark:text-darkMode-error '>
            {error}
          </div>
        )}
        <div className='mt-4'></div>

        <Button type='submit' data='Change' />
        {/* </ThemeProvider> */}
      </form>
    </div>
  );
}

export function ProfilePopUp({ setIsProfilePopUp }) {
  return (
    <BgBlackOpacity>
      <div
        onClick={() => setIsProfilePopUp(false)}
        className=' absolute top-0 w-screen h-screen z-40'
      >
        <div className=' absolute top-0  w-[312px] h-full animate-slide-in'>
          <Profile />
        </div>
      </div>
    </BgBlackOpacity>
  );
}
