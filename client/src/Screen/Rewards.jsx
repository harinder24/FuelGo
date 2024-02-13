import { useState } from 'react';
import Profile, { ProfilePopUp } from '../Components/User/Profile';
import {
  SiStarbucks,
  SiAmazon,
  SiUbereats,
  SiApple,
  SiGoogleplay,
} from 'react-icons/si';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const rewardsList = [
  {
    title: 'Starbucks',
    icon: <SiStarbucks className='text-[#187653] bg-white rounded-full' />,
    bg: '#187653',
  },
  {
    title: 'Amazon',
    icon: <SiAmazon />,
    bg: '#F59516',
  },
  {
    title: 'Apple',
    icon: <SiApple />,
    bg: '#8A8A8F',
  },
  {
    title: 'Best Buy',
    icon: <BiSolidPurchaseTagAlt className='text-[#F9DB03] ' />,
    bg: '#194DAB',
  },
  {
    title: 'Google Play',
    icon: (
      <img
        width='40px'
        height='40px'
        src='https://img.icons8.com/fluency/48/google-play-store-new.png'
        alt='google-play-store-new'
      />
    ),
    bg: '#0D0E10',
  },
  {
    title: 'Uber Eats',
    icon: <SiUbereats />,
    bg: '#64B91A',
  },
];
const amountOptions = [
  { amount: 5, price: 600 },
  { amount: 10, price: 1000 },
  { amount: 15, price: 1450 },
  { amount: 25, price: 2300 },
  { amount: 50, price: 4400 },
  { amount: 75, price: 6450 },
  { amount: 100, price: 8500 },
  { amount: 150, price: 12600 },
  { amount: 200, price: 16500 },
];

export default function Rewards() {
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isList, setIsList] = useState(true);
  const [point, setPoint] = useState(2000);
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
              <ul className='flex-1 flex flex-col overflow-auto'>
                {rewardsList.map((reward) => (
                  <RewardList
                    key={reward.title}
                    reward={reward}
                    point={point}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isProfilePopUp && <ProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />}
    </>
  );
}

function RewardCard({ reward, amount, price, point }) {
  const { icon, bg } = reward;
  const isAvailable = point > price;
  const percent = isAvailable ? 100 : (point / price) * 100;
  const converted = percent.toFixed();

  return (
    <li>
      <div
        className='w-56 p-4 rounded-xl flex flex-col th'
        style={{ backgroundColor: bg }}
      >
        <div className=' flex justify-center mb-6 mt-2 text-4xl'>{icon}</div>

        <div className=' w-full h-[6px] rounded-full bg-neutral-300 mb-4'>
          <div
            className='h-full rounded-full bg-white'
            style={{ width: converted + '%' }}
          ></div>
        </div>

        <div className='flex items-center text-sm justify-between'>
          <div className='text-base font-medium'>$ {amount}</div>
          <button
            className={`flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 rounded-full ${
              isAvailable ? 'brightness-100' : 'brightness-70'
            }`}
            disabled={!isAvailable}
          >
            <img
              className='w-5 h-5 mr-1.5'
              src='https://img.icons8.com/3d-fluency/94/gas-station.png'
              alt='token'
            />
            <span className='text-sm font-medium'>
              {price.toLocaleString('en-US')}
            </span>
          </button>
        </div>
      </div>
    </li>
  );
}

function RewardList({ reward, point }) {
  const { title } = reward;
  return (
    <li>
      <span className='text-gray-400 text-sm font-mono font-semibold'>
        {title} Gift Card
      </span>
      <ul className='flex w-full overflow-auto'>
        {amountOptions.map((option) => (
          <RewardCard
            key={title + option.amount}
            reward={reward}
            point={point}
            amount={option.amount}
            price={option.price}
          />
        ))}
      </ul>
    </li>
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
