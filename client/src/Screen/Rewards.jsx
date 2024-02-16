import { useState } from 'react';
import Profile, { ProfilePopUp } from '../Components/User/Profile';
import {
  SiStarbucks,
  SiAmazon,
  SiUbereats,
  SiApple,
  SiPix,
} from 'react-icons/si';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import BottomNav from '../Components/User/BottomNav';

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
  const [modal, setModal] = useState();

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
          modal={modal}
        />
      )}
      <div className='h-screen flex flex-col'>
        <div
          className={`w-screen flex-1  overflow-hidden  bg-lightMode-bg dark:bg-darkMode-bg ${
            isPurchasing && 'blur-sm brightness-50 pointer-events-none'
          }`}
        >
          <div className=' absolute w-screen h-[calc(100vh-56px)] z-20'>
            <div className=' flex w-full h-full justify-center'>
              <div className='   w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 max-[520px]:p-0 overflow-hidden'>
                <div className='w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1230px]:hidden'>
                  <Profile />
                </div>
                <ul className='flex-1 flex flex-col overflow-auto p-4'>
                  {rewardsList.map((reward) => (
                    <RewardList
                      key={reward.title}
                      reward={reward}
                      point={point}
                      setIsPurchasing={setIsPurchasing}
                      setModal={setModal}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full min-[520px]:hidden relative z-[20]'>
          <BottomNav />
        </div>
      </div>
      {isProfilePopUp && <ProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />}
    </>
  );
}

function RewardCard({ reward, amount, price, point, isSm, setIsPurchasing }) {
  const { title, icon, bg } = reward;
  const isAvailable = point >= price;
  const percent = isAvailable ? 100 : (point / price) * 100;
  const converted = percent.toFixed();
  return (
    <>
      <div
        className={`w-56 p-4 rounded-xl flex flex-col th ${
          isSm && ' w-48 h-32'
        }`}
        style={{ backgroundColor: bg }}
      >
        <div
          className={` w-full h-full flex items-center justify-center text-4xl ${
            !isSm && 'mb-6 mt-2'
          }`}
        >
          {icon}
        </div>
        {!isSm && (
          <>
            <div className=' w-full h-[6px] rounded-full bg-neutral-300 mb-4'>
              <div
                className='h-full rounded-full bg-white'
                style={{ width: converted + '%' }}
              ></div>
            </div>

            <div className='flex items-center text-sm justify-between'>
              <div className='text-base '>$ {amount}</div>
              <button
                onClick={() => setIsPurchasing(true)}
                className={
                  'flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 rounded-full ' +
                  `${!isAvailable && ' brightness-50'}`
                }
              >
                <SiPix className='text-xs mr-1.5' />
                <span className='text-sm '>
                  {price.toLocaleString('en-US')}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      {isSm && (
        <div className='w-full min-w-36 text-center pt-3'>
          <span className='th text-xs'>{title} Gift Card</span>
          <div className='w-full flex items-center text-sm justify-between mt-4'>
            <div className='text-base '>$ {amount}</div>
            <div
              className={
                'flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 rounded-full ' +
                `${!isAvailable && ' brightness-50'}`
              }
            >
              <SiPix className='text-xs mr-1.5' />
              <span className='text-sm '>{price.toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RewardList({ reward, point, setIsPurchasing, setModal }) {
  const { title } = reward;
  const setModalInfo = (amount, price) => {
    setModal({
      card: (
        <RewardCard
          reward={reward}
          point={point}
          amount={amount}
          price={price}
          isSm
        />
      ),
      price: price,
      isAvailable: point >= price,
    });
  };
  return (
    <li>
      <span className='th text-sm '>{title} Gift Card</span>
      <ul className='flex w-full overflow-auto my-4'>
        {amountOptions.map((option) => (
          <li
            onClick={() => setModalInfo(option.amount, option.price)}
            key={title + option.amount}
            className=' mr-3'
          >
            <RewardCard
              reward={reward}
              point={point}
              amount={option.amount}
              price={option.price}
              setIsPurchasing={setIsPurchasing}
              setModal={setModal}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}

function PurchaseModal({ point, setPoint, setIsPurchasing, modal }) {
  const [showCode, setShowCode] = useState(false);
  const { card, price, isAvailable } = modal;
  const hardCodedCoupon = '4XC2-23BE-3TO7-2Y6P';

  const handleClick = () => {
    setIsPurchasing(false);
    setShowCode(false);
  };
  const getCoupon = () => {
    const balance = point - price;
    setPoint(balance);
    setShowCode(true);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-96 text-center overflow-x-hidden max-h-96 h-5/6 border-[1.5px] border-lightMode-fbg bg-lightMode-sbg dark:bg-darkMode-sbg rounded-xl p-5 z-10`}
    >
      <div className='flex justify-between w-full text-darkMode-border min-w-36 mb-4 mt-2 text-white ml-5'>
        <button onClick={handleClick}>
          <MdClose />
        </button>
        <div className='flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 pr-4 rounded-l-full border-r-0'>
          <SiPix className='text-xs mr-1.5' />
          <span className='text-sm '>{point.toLocaleString('en-US')}</span>
        </div>
      </div>
      <div className='flex flex-col items-center text-white'>{card}</div>
      {showCode ? (
        <div className=' mt-8  text-white'>{hardCodedCoupon}</div>
      ) : (
        <button
          onClick={getCoupon}
          className={`w-48 py-2 rounded-lg bg-[#0BA5E9] mt-8  th ${
            isAvailable && 'hover:brightness-110'
          } `}
          disabled={!isAvailable}
        >
          {isAvailable ? 'GET A CARD' : 'NOT ENOUGH UNIT'}
        </button>
      )}
    </div>
  );
}
