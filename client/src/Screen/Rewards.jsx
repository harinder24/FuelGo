import { useState } from 'react';
import Profile, { ProfilePopUp } from '../Components/User/Profile';
import TopNav from '../Components/User/TopNav';
import { SiStarbucks, SiAmazon } from 'react-icons/si';
import { TbLetterC } from 'react-icons/tb';
import { FaTag } from 'react-icons/fa6';

const rewardsList = [
  {
    title: 'Starbucks',
    icon: <SiStarbucks className='text-[#B6F09C]' />,
  },
  {
    title: 'Amazon',
    icon: <SiAmazon className='text-[#82DBF7]' />,
  },
  {
    title: 'Costco',
    icon: <TbLetterC className='text-[#D0302F]' />,
  },
  {
    title: 'Best Buy',
    icon: <FaTag className='text-[#FFD147]' />,
  },
];
const rewardItems = [
  { amount: 25, point: 500 },
  { amount: 50, point: 1000 },
  { amount: 100, point: 2000 },
  { amount: 200, point: 4000 },
];

export default function Rewards() {
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isList, setIsList] = useState(true);
  const [point, setPoint] = useState(3253);

  const handleClick = (price) => {
    setPoint((prev) => prev - price);
  };

  async function setIsProfilePopUpHandler() {
    setIsProfilePopUp(true);
  }

  return (
    <>
      <div className='w-screen h-screen  bg-lightMode-bg dark:bg-darkMode-bg '>
        <div className=' absolute w-screen h-screen z-20'>
          <div className=' flex w-full h-full justify-center'>
            <div className='   w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 p-3 max-[520px]:p-0 overflow-hidden'>
              <div className='w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1230px]:hidden'>
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
                    {point.toLocaleString('en-US')} P
                  </h4>
                </div>
                <div className='flex flex-wrap w-full justify-center gap-x-20 mt-24 overflow-scroll '>
                  {rewardsList.map((reward) => (
                    <div
                      key={reward.title}
                      className='flex flex-col items-center'
                    >
                      <div
                        className={`w-fit  p-3 mb-4 rounded-full sbg text-2xl`}
                      >
                        {reward.icon}
                      </div>
                      <span className='text-white mb-7'>{reward.title}</span>
                      {rewardItems.map((item) => (
                        <button
                          onClick={() => handleClick(item.point)}
                          key={`amount-${item.amount}`}
                          className='flex justify-between w-40 mb-2 px-4 py-2 rounded-lg border-t-[1px] border-lightMode-fbg tbg-gradient'
                        >
                          <span className='text-white'>$ {item.amount}</span>
                          <span
                            className={
                              item.point > point
                                ? 'text-darkMode-error'
                                : 'text-darkMode-valid'
                            }
                          >
                            {item.point} P
                          </span>
                        </button>
                      ))}
                    </div>
                  ))}
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
