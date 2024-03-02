import { useState } from 'react';
import {
  SiStarbucks,
  SiAmazon,
  SiUbereats,
  SiApple,
  SiPix,
} from 'react-icons/si';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import BgBlackOpacity from '../Components/BgBlackOpacity';
import { useOutletContext } from 'react-router-dom';
import TopNav from '../Components/TopNav/TopNav';

const REWARDS = [
  {
    title: 'Avatar',
    items: [
      {
        title: 'Tappy',
        icon: (
          <img className=' rounded-full size-10' src='/oilrig.jpg' alt='' />
        ),
        price: 300,
      },
      {
        title: 'Toppy',
        icon: (
          <img className=' rounded-full size-10' src='/oilrig.jpg' alt='' />
        ),
        price: 400,
      },
    ],
  },
  {
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
        price: 500,
      },
    ],
  },
  {
    title: 'Card',
    items: [
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
    ],
    amountOptions: [
      { amount: 5, price: 600 },
      { amount: 10, price: 1000 },
      { amount: 15, price: 1450 },
      { amount: 25, price: 2300 },
      { amount: 50, price: 4400 },
      { amount: 75, price: 6450 },
      { amount: 100, price: 8500 },
      { amount: 150, price: 12600 },
      { amount: 200, price: 16500 },
    ],
  },
];

export default function Rewards() {
  const { setIsProfilePopUp } = useOutletContext();
  const [point, setPoint] = useState(2000);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState();

  return (
    <>
      {showModal && (
        <BgBlackOpacity>
          <PurchaseModal
            point={point}
            setPoint={setPoint}
            setShowModal={setShowModal}
            modal={modal}
          />
        </BgBlackOpacity>
      )}
      <TopNav setIsProfilePopUp={setIsProfilePopUp}>
        <div className='flex flex-row items-center th w-[100px] justify-center gap-x-1 cursor-pointer '>
          <SiPix className='text-xs mr-1.5' />
          <span className='text-sm '>{point.toLocaleString('en-US')}</span>
        </div>
      </TopNav>
      <ul className='overflow-y-auto max-[520px]:px-2'>
        {REWARDS.map((reward) => {
          if (reward.title === 'Card')
            return reward.items.map((item) => (
              <RewardList
                key={item.title}
                reward={{ item, amountOptions: reward.amountOptions }}
                point={point}
                setShowModal={setShowModal}
                setModal={setModal}
                isGiftCard
              />
            ));

          return (
            <RewardList
              key={reward.title}
              reward={reward}
              point={point}
              setShowModal={setShowModal}
              setModal={setModal}
            />
          );
        })}
      </ul>
    </>
  );
}

function RewardCard({ reward, amount, price, point, sm, md, lg }) {
  const { icon, bg } = reward;
  const isAvailable = point >= price;
  const percent = isAvailable ? 100 : (point / price) * 100;
  const converted = percent.toFixed();

  const cardSizeClass = sm
    ? `w-48 h-36 ${amount ? '' : 'bg-[#182335] '}`
    : 'h-[152px] ease-in-out duration-100 cursor-pointer hover:h-40 ' +
      (md ? 'w-32 hover:w-36 bg-[#182335] ' : '') +
      (lg ? 'w-56 hover:w-60 ' : '');

  return (
    <>
      <div
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

function RewardList({ reward, point, setShowModal, setModal, isGiftCard }) {
  const title = reward.title || reward.item.title;
  const setGiftCardInfo = (amount, price) => {
    setModal({
      card: <RewardCard reward={reward.item} amount={amount} sm />,
      title,
      amount,
      price,
      isAvailable: point >= price,
      type: 'Card',
    });
    setShowModal(true);
  };
  const setItemInfo = ({ title, icon, price }, type) => {
    setModal({
      title,
      card: <RewardCard reward={{ icon }} sm />,
      price,
      isAvailable: point >= price,
      type,
    });
    setShowModal(true);
  };
  return (
    <li>
      <h4 className='th text-md my-8'>{title}</h4>
      <ul className='flex w-full overflow-auto snap-x '>
        {isGiftCard
          ? reward.amountOptions.map(({ amount, price }) => (
              <li
                onClick={() => setGiftCardInfo(amount, price)}
                key={title + amount}
                className=' mr-3 snap-center h-40'
              >
                <RewardCard
                  reward={reward.item}
                  point={point}
                  amount={amount}
                  price={price}
                  lg
                />
              </li>
            ))
          : reward.items.map((item, i) => (
              <li
                key={item.title + i}
                className=' mr-3 snap-start h-40'
                onClick={() => {
                  setItemInfo(item, title);
                }}
              >
                <RewardCard reward={item} point={point} price={item.price} md />
              </li>
            ))}
      </ul>
    </li>
  );
}

function PurchaseModal({ point, setPoint, setShowModal, modal }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const { title, amount, card, price, isAvailable } = modal;

  const handleClick = () => {
    setShowModal(false);
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
