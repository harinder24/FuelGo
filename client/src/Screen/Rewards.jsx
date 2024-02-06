import { useState } from 'react';
import Profile, { ProfilePopUp } from '../Components/User/Profile';
import TopNav from '../Components/User/TopNav';

export default function Rewards() {
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isList, setIsList] = useState(true);

  async function setIsProfilePopUpHandler() {
    setIsProfilePopUp(true);
  }

  return (
    <>
      <div className='w-screen h-screen  bg-lightMode-bg dark:bg-darkMode-bg '>
        <div className=' absolute w-screen h-screen z-20'>
          <div className=' flex w-full h-full justify-center'>
            <div className='   w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 p-3 max-[520px]:p-0 overflow-hidden'>
              <div className='w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1000px]:hidden'>
                <Profile />
              </div>
              <div className='flex-1 flex flex-col '>
                <TopNav
                  setIsProfilePopUpHandler={setIsProfilePopUpHandler}
                  isList={isList}
                  setIsList={setIsList}
                />
                <div className='w-full flex flex-col items-center mt-24'>
                  <h2 className='w-fit text-lightMode-header dark:text-darkMode-header text-3xl font-medium'>
                    Your Points
                  </h2>
                  <h4 className='w-fit text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#B6F09C] via-[#87DDEE] to-[#4D62E5] mt-4'>
                    3,253 P
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProfilePopUp && <ProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />}
    </>
  );
}
