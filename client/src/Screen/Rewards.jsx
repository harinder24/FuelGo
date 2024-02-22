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
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeIcon from '@mui/icons-material/Home';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const AVATARS = {
  title: 'Avatar',
  items: [
    {
      title: 'Tappy',
      icon: <img className=' rounded-full size-10' src='/oilrig.jpg' alt='' />,
      price: 300,
    },
    {
      title: 'Tappy',
      icon: <img className=' rounded-full size-10' src='/oilrig.jpg' alt='' />,
      price: 300,
    },
  ],
};

const FRAMES = {
  title: 'Frame',
  items: [
    {
      title: 'Frame-4',
      icon: (
        <div
          style={{
            backgroundImage: 'url("/frame/level5.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className=' flex justify-center items-center size-10 rounded-full border-0 '
        >
          <div className='w-[93%] h-[93%] rounded-full bg-[#182335]' />
        </div>
      ),
      price: 300,
    },
    {
      title: 'Frame-5',
      icon: (
        <div
          style={{
            backgroundImage: 'url("/frame/level10.jpg")',
            backgroundSize: 'cover', // Adjust as needed
            backgroundPosition: 'center', // Adjust as needed
            // Additional background properties can be added here
          }}
          className=' flex justify-center items-center size-10 rounded-full border-0 '
        >
          <div className='w-[93%] h-[93%] rounded-full bg-[#182335] ' />
        </div>
      ),
      price: 300,
    },
  ],
};

const REWARDS = [
  {
    title: 'Starbucks Gift Card',
    icon: <SiStarbucks className='text-[#187653] bg-white rounded-full' />,
    bg: '#187653',
  },
  {
    title: 'Amazon Gift Card',
    icon: <SiAmazon />,
    bg: '#F59516',
  },
  {
    title: 'Apple Gift Card',
    icon: <SiApple />,
    bg: '#8A8A8F',
  },
  {
    title: 'Best Buy Gift Card',
    icon: <BiSolidPurchaseTagAlt className='text-[#F9DB03] ' />,
    bg: '#194DAB',
  },
  {
    title: 'Google Play Gift Card',
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
    title: 'Uber Eats Gift Card',
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
            isPurchasing ? 'blur-sm brightness-50 pointer-events-none' : ''
          }`}
        >
          <div className=' absolute w-screen h-[calc(100vh-56px)] z-20'>
            <div className=' flex w-full h-full justify-center'>
              <div className='   w-[1400px] min-w-auto h-screen flex flex-row gap-x-3 p-3 max-[520px]:p-0 overflow-hidden'>
                <div className='w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1230px]:hidden'>
                  <Profile />
                </div>
                <div className='flex-1 flex flex-col overflow-x-auto overflow-y-hidden'>
                  <RewardNav
                    setIsProfilePopUpHandler={setIsProfilePopUpHandler}
                  />
                  <ul className='overflow-y-auto max-[520px]:px-2'>
                    <RewardList
                      reward={AVATARS}
                      point={point}
                      setIsPurchasing={setIsPurchasing}
                      setModal={setModal}
                    />
                    <RewardList
                      reward={FRAMES}
                      point={point}
                      setIsPurchasing={setIsPurchasing}
                      setModal={setModal}
                    />
                    {REWARDS.map((reward) => (
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
        </div>
        <div className='w-full min-[520px]:hidden relative z-[20]'>
          <BottomNav />
        </div>
      </div>
      {isProfilePopUp && <ProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />}
    </>
  );
}

function RewardNav({ point }) {
  return (
    <div className=' w-full rounded-lg sbg flex flex-row items-center p-4 gap-x-4 max-[520px]:rounded-none max-[520px]:p-2'>
      <div className=' flex flex-row items-center tp rounded-lg border-[1px] cborder h-10 px-2 tbg gap-x-1 cursor-pointer max-[520px]:hidden  hover:text-lightMode-header dark:hover:text-darkMode-header '>
        <HomeIcon />
        <div className=' max-[740px]:hidden'>Home</div>
      </div>
      <div className='flex items-center gap-x-1 caret-transparent cursor-pointer min-[520px]:hidden h-10'>
        <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '28px' }} />
        {/* <Icon size={28} /> */}
        <div className='flex flex-row items-center  text-lightMode-button '>
          <div className='text-white'>Fuel</div>
          Go
        </div>
      </div>

      <div className=' flex-1'></div>
      <div className=' flex flex-row items-center tp rounded-lg border-[1px] cborder h-10 px-2 tbg gap-x-1 cursor-pointer hover:text-lightMode-header dark:hover:text-darkMode-header   '>
        <EditOutlinedIcon />
        <div className=' max-[740px]:hidden'>Price</div>
      </div>
      <div className=' flex flex-row items-center tp rounded-lg border-[1px] cborder h-10 px-2 tbg gap-x-1 cursor-pointer  hover:text-lightMode-header dark:hover:text-darkMode-header  '>
        <PollOutlinedIcon />
        <div className=' max-[740px]:hidden'>Survey</div>
      </div>
      <div
        style={{
          backgroundImage: 'url("/frame/level5.jpg")',
          backgroundSize: 'cover', // Adjust as needed

          backgroundPosition: 'center', // Adjust as needed
          // Additional background properties can be added here
        }}
        className=' flex justify-center items-center size-[40px] rounded-full border-0 min-[1001px]:hidden max-[520px]:hidden'
      >
        <img
          onClick={() => setIsProfilePopUpHandler()}
          className='size-9 rounded-full  cursor-pointer object-cover relative'
          src='/oilrig.jpg'
          alt=''
        />
      </div>
    </div>
  );
}

function RewardCard({
  reward,
  amount,
  price,
  point,
  sm,
  md,
  lg,
  setIsPurchasing,
}) {
  const { icon, bg } = reward;
  const isAvailable = point >= price;
  const percent = isAvailable ? 100 : (point / price) * 100;
  const converted = percent.toFixed();

  const cardSizeClass = sm
    ? `w-48 h-36 ${amount ? '' : 'bg-[#182335] '}`
    : 'h-[152px] ease-in-out duration-100 cursor-pointer hover:h-40 ' +
      (md ? 'w-32 hover:w-36 bg-[#182335] ' : '') +
      (lg ? 'w-56 hover:w-60 ' : '');

  const handleClick = () => {
    if (sm) return;
    setIsPurchasing(true);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={'p-4 rounded-xl flex flex-col th ' + cardSizeClass}
        style={{ backgroundColor: bg }}
      >
        <div
          className={` w-full h-full flex items-center justify-center ${
            sm ? `text-5xl ${amount ? '' : 'scale-150'}` : 'mb-6 mt-2 text-4xl'
          }`}
        >
          {icon}
        </div>
        {(lg || md) && (
          <>
            <div className=' w-full h-[6px] rounded-full bg-neutral-400 mb-4'>
              <div
                className='h-full rounded-full bg-white'
                style={{ width: converted + '%' }}
              ></div>
            </div>

            <RewardCardDetails
              amount={amount}
              price={price}
              isAvailable={isAvailable}
            />
          </>
        )}
      </div>
    </>
  );
}

function RewardCardDetails({ amount, price, isAvailable }) {
  return (
    <div
      className={`flex items-center text-sm ${
        amount ? 'justify-between' : 'justify-end'
      }`}
    >
      {amount && <div className='text-base '>$ {amount}</div>}

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
  );
}

function RewardList({ reward, point, setIsPurchasing, setModal }) {
  const { title } = reward;
  const setGiftCardInfo = (amount, price) => {
    setModal({
      card: <RewardCard reward={reward} amount={amount} sm />,
      title,
      amount,
      price,
      isAvailable: point >= price,
      type: 'Card',
    });
  };
  const setItemInfo = ({ title, icon, price }, type) => {
    setModal({
      title,
      card: <RewardCard reward={{ icon }} sm />,
      price,
      isAvailable: point >= price,
      type,
    });
  };
  return (
    <li>
      <h4 className='th text-md my-8'>{title}</h4>
      <ul className='flex w-full overflow-auto snap-x '>
        {reward.items
          ? reward.items.map((item, i) => (
              <li
                key={item.title + i}
                className=' mr-3 snap-start h-40'
                onClick={() => {
                  console.log(reward);
                  setItemInfo(item, reward.title);
                }}
              >
                <RewardCard
                  reward={item}
                  point={point}
                  price={item.price}
                  setIsPurchasing={setIsPurchasing}
                  md
                />
              </li>
            ))
          : amountOptions.map((option) => (
              <li
                onClick={() => setGiftCardInfo(option.amount, option.price)}
                key={title + option.amount}
                className=' mr-3 snap-center h-40'
              >
                <RewardCard
                  reward={reward}
                  point={point}
                  amount={option.amount}
                  price={option.price}
                  setIsPurchasing={setIsPurchasing}
                  lg
                />
              </li>
            ))}
      </ul>
    </li>
  );
}

function PurchaseModal({ point, setPoint, setIsPurchasing, modal }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const { title, amount, card, price, isAvailable } = modal;
  const hardCodedCoupon = '4XC2-23BE-3TO7-2Y6P';

  const handleClick = () => {
    setIsPurchasing(false);
    setIsPurchased(false);
  };
  const getCoupon = () => {
    const balance = point - price;
    setPoint(balance);
    setIsPurchased(true);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-96 text-center overflow-x-hidden max-h-96 h-5/6 border-[1.5px] border-lightMode-sbg bg-[#0E1726] dark:bg-[#0E1726] rounded-xl p-5 z-10`}
    >
      <div className='flex justify-between w-full text-darkMode-border min-w-36 mb-4 mt-2 text-white '>
        <div className='flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 rounded-full '>
          <SiPix className='text-xs mr-1.5' />
          <span className='text-sm '>{point.toLocaleString('en-US')}</span>
        </div>
        <button onClick={handleClick}>
          <MdClose className='text-xl' />
        </button>
      </div>
      <div className='flex flex-col items-center text-white'>{card}</div>
      <div className='w-full min-w-36 text-center pt-3 th'>
        <span className='th text-xs'>{title}</span>
        <RewardCardDetails
          amount={amount}
          price={price}
          isAvailable={isAvailable}
        />
      </div>
      {isPurchased ? (
        <div className=' mt-8 text-white leading-relaxed'>
          Order placed. Check email !
        </div>
      ) : (
        <button
          onClick={getCoupon}
          className={`w-48 py-2 rounded-lg bg-[#0BA5E9] mt-8  th ${
            isAvailable && 'hover:brightness-110'
          } `}
          disabled={!isAvailable}
        >
          {isAvailable ? `Get ${modal.type}` : 'NOT ENOUGH UNIT'}
        </button>
      )}
    </div>
  );
}
