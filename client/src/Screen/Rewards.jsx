import { useState } from 'react';
import Profile, { ProfilePopUp } from '../Components/User/Profile';
import TopNav from '../Components/User/TopNav';
import { SiStarbucks, SiAmazon } from 'react-icons/si';
import { TbLetterC } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
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
const amountOptions = [
  { amount: 25, point: 500 },
  { amount: 50, point: 1000 },
  { amount: 100, point: 2000 },
  { amount: 200, point: 4000 },
];

export default function Rewards() {
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isList, setIsList] = useState(true);
  const [point, setPoint] = useState(3253);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [reward, setReward] = useState();

  async function setIsProfilePopUpHandler() {
    setIsProfilePopUp(true);
  }

  return (
    <>
      {isPurchasing && (
        <PurchaseModal
          point={point}
          setPoint={setPoint}
          setIsPurchasing={setIsPurchasing}
          reward={reward}
        />
      )}
      <div
        className={`w-screen h-screen overflow-hidden  bg-lightMode-bg dark:bg-darkMode-bg ${
          isPurchasing && 'blur-sm brightness-50 pointer-events-none'
        }`}
      >
        <div className=' absolute w-screen h-screen z-20'>
          <div className=' flex w-full h-full justify-center'>
            <div className='   w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 p-3 max-[520px]:p-0 overflow-hidden'>
              <div className='w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1230px]:hidden'>
                <Profile />
              </div>
              <div className='flex-1 flex flex-col overflow-auto'>
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
                <RewardsList
                  point={point}
                  setIsPurchasing={setIsPurchasing}
                  setReward={setReward}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProfilePopUp && <ProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />}
    </>
  );
}

function RewardsList({ point, setIsPurchasing, setReward }) {
  const handleClick = (reward, item) => {
    setIsPurchasing(true);

    const { title, icon } = reward;
    const { amount, point: requiredPoint } = item;

    setReward({ title, icon, amount, requiredPoint });
  };

  return (
    <div className='flex flex-wrap w-full justify-center gap-x-20 mt-24 '>
      {rewardsList.map((reward) => (
        <div key={reward.title} className='flex flex-col items-center mb-16'>
          <div className={`w-fit  p-3 mb-4 rounded-full sbg text-2xl `}>
            {reward.icon}
          </div>
          <span className='text-white mb-7'>{reward.title}</span>
          {amountOptions.map((item) => (
            <button
              onClick={() => handleClick(reward, item)}
              key={`amount-${item.amount}`}
              className='flex justify-between w-40 mb-2 px-4 py-2 rounded-lg border-t-[1px] border-lightMode-fbg tbg-gradient'
              disabled={item.point > point}
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
  );
}

function PurchaseModal({ point, setPoint, setIsPurchasing, reward }) {
  const [showCode, setShowCode] = useState(false);

  const { title, icon, amount, requiredPoint } = reward;

  const hardCodedCoupon = '4XC2-23BE-3TO7-2Y6P';
  const balance = point - requiredPoint;

  const handleClick = () => {
    setIsPurchasing(false);
    setShowCode(false);
  };
  const getCoupon = () => {
    setPoint(balance);
    setShowCode(true);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-96 ${
        showCode ? 'max-h-60' : 'max-h-96'
      } h-5/6 border-t-[1px] border-lightMode-fbg bg-lightMode-sbg dark:bg-darkMode-sbg rounded-xl p-4 z-10 overflow-auto`}
    >
      <div className='flex justify-end w-full text-darkMode-border min-w-36'>
        <button onClick={handleClick}>
          <MdClose />
        </button>
      </div>
      <div className='flex flex-col items-center w-full mt-6 mb-6 min-w-36'>
        <div className='text-4xl mb-2 min'>{icon}</div>
        <h2 className='text-xl text-white font-medium mb-1'>{title}</h2>
        <span className=' text-sm text-darkMode-valid'>$ {amount}</span>
      </div>
      {showCode ? (
        <div className='flex flex-col w-full gap-5 items-center min-w-36'>
          <div className='w-full border-[0.5px] border-solid border-darkMode-border rounded py-2 pl-2 text-darkMode-header text-xs '>
            {hardCodedCoupon}
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full gap-5 items-center min-w-36'>
          <div className='w-full border-[0.5px] border-solid border-darkMode-border rounded text-right py-2 pr-2 text-darkMode-valid text-xs '>
            {point} Points
          </div>
          <div className='flex justify-between w-full border-[0.5px] border-solid border-darkMode-border rounded text-right py-2 px-2 text-darkMode-error text-xs '>
            <span className='font-black tracking-[-0.2rem]'>--</span>
            <span>{requiredPoint} Points</span>
          </div>
          <div className='w-full border-[0.5px] border-solid border-darkMode-border rounded text-right py-2 pr-2 text-darkMode-valid text-xs '>
            {balance} Points
          </div>
          <button
            onClick={getCoupon}
            className='w-fit py-1.5 px-4 font-medium rounded-lg bg-darkMode-valid text-sm'
          >
            Get
          </button>
        </div>
      )}
    </div>
  );
}
