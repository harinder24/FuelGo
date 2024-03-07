import React, {  useEffect, useRef, useState } from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import SortIcon from '@mui/icons-material/Sort';
import {
  Close,
  FavoriteBorder,
  MapOutlined,
  ThumbUp,
} from '@mui/icons-material';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import stationMarke from '/station.png';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { MdClose } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa6';
import Button from '../Components/Button';
import { format } from 'timeago.js';
import CustomInput from '../Components/UI/CustomInput';
import SideBar from '../Components/SideBar/SideBar';
import BgBlackOpacity from '../Components/BgBlackOpacity';
import TopNav from '../Components/TopNav/TopNav';

const SURVEY = [
  'Is there a car wash facility available at this gas station?',
  'Does this gas station offer an air pump service for tires?',
  'Is there a convenience store located at this gas station?',
  'Does this gas station provide electric vehicle (EV) charging stations?',
  'Are there facilities available for truck drivers, such as parking and amenities, at this gas station?',
  'Is there an ATM Machine available at this gas station?',
  'Would you consider using this gas station again?',
];
export default function GasStation() {

  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [modal, setModal] = useState({});
  const [gasInfo, setGasInfo] = useState([
    {
      type: 'Regular',
      price: 1.62,
      updatedBy: 'Harinder',
      updatedAt: new Date().setDate(new Date().getDate() - 3),
    },
    {
      type: 'Mid-grade',
      price: 1.72,
      updatedBy: 'Jinsoo',
      updatedAt: new Date().setHours(new Date().getHours() - 5),
    },
    {
      type: 'Premium',
      price: 1.76,
      updatedBy: 'Prab',
      updatedAt: new Date().setMinutes(new Date().getMinutes() - 7),
    },
    {
      type: 'Diesel',
      price: 1.78,
      updatedBy: 'Laghav',
      updatedAt: Date.now(),
    },
  ]);
  

  const handleModal = (title) => {
    setModal({ show: true, title });
  };
  // ToDo get gasInfo from real database
  // add useEffect for all the info
  return (
    <>
      {modal.show && (
        <BgBlackOpacity>
          <Modal title={modal.title} setModal={setModal} gasInfo={gasInfo} />
        </BgBlackOpacity>
      )}
      <TopNav setIsProfilePopUp={setIsProfilePopUp}>
        <div
          onClick={() => handleModal('price')}
          name='price'
          className=' flex flex-row items-center tp w-[100px] justify-center gap-x-1 cursor-pointer hover:text-white max-[740px]:w-10 '
        >
          <EditOutlinedIcon />
          <div className=' max-[740px]:hidden'>Price</div>
        </div>
        <div className='h-full cborder border-l-[1px]'></div>
        <div
          name='survey'
          onClick={() => handleModal('survey')}
          className=' flex flex-row items-center tp w-[100px] justify-center gap-x-1 cursor-pointer hover:text-white max-[740px]:w-10   '
        >
          <PollOutlinedIcon />
          <div className=' max-[740px]:hidden'>Survey</div>
        </div>
      </TopNav>
      <div className=' flex-1 flex-col overflow-auto mt-3'>
        <StationInfo />
        <GasPrice gasInfo={gasInfo} setModal={setModal} />
        <Amenities />
        <Contributor />

        <CommentSection />
      </div>

      {isProfilePopUp && (
        <SideBar isProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />
      )}
    </>
  );
}
function Modal({ title, setModal, gasInfo }) {
  const [newPrice, setNewPrice] = useState([...gasInfo]);
  const [crrIndex, setCrrIndex] = useState(0);
  const [survey, setSurvey] = useState([]);
  const handleClose = () => {
    setModal({});
  };
  const handleChangePrice = (e) => {
    //ToDo Validate user input

    setNewPrice(
      newPrice.map((gas) =>
        gas.type == e.target.id ? { ...gas, price: e.target.value } : gas
      )
    );
  };
  const handleNext = (e) => {
    e.preventDefault();
    setSurvey([...survey, e.target.innerText.toLowerCase()]);
    console.log(survey);
    if (!SURVEY[crrIndex + 1]) {
      //ToDo post the result to database
      setCrrIndex(0);
      setModal({ show: false });
      return;
    }
    setCrrIndex(crrIndex + 1);
  };
  const handleSubmit = (e) => {
    //ToDo post the request to database
    e.preventDefault();
    if (newPrice.some((gas) => isNaN(gas.price))) return;
    setModal({ show: false });
  };
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-96 text-center overflow-x-hidden max-h-96 h-5/6 border-[1.5px] border-lightMode-sbg bg-[#0E1726] dark:bg-[#0E1726] rounded-xl p-5 z-10`}
    >
      <div className='flex justify-end w-full text-darkMode-border min-w-36 mb-4 mt-2 th '>
        <button onClick={handleClose}>
          <MdClose className='text-xl' />
        </button>
      </div>
      {title === 'price' ? (
        <form className='grid grid-cols-2 justify-center items-center mt-4 gap-y-12 gap-x-8'>
          {gasInfo.map((gas, index) => {
            const { type, price } = gas;
            return (
              <CustomInput
                key={type + price}
                label={type}
                paddingLeft='24px'
                placeHolder={price}
                handleChange={handleChangePrice}
                icon={
                  <FaDollarSign className='absolute left-2 tp text-sm bottom-[13.5px]' />
                }
                isInvalid={isNaN(newPrice[index].price)}
                errorMessage='Invalid Input'
              />
            );
          })}

          <div className='w-[341px]'>
            <Button handleButtonClick={handleSubmit} data='Submit' />
          </div>
        </form>
      ) : (
        <form className='flex flex-col items-center gap-y-8'>
          <img className='rounded-lg w-56 h-32' src='/oilrig.jpg' alt='' />
          <div className='th text-sm'>
            <span className='mr-4'>Q{crrIndex + 1}.</span>
            <span className=''>{SURVEY[crrIndex]}</span>
          </div>
          <div className='th flex w-full justify-center gap-x-4'>
            <button
              onClick={handleNext}
              className='capitalize bg-darkMode-button w-12 py-2 rounded-lg hover:brightness-125'
            >
              yes
            </button>
            <button
              onClick={handleNext}
              className='capitalize bg-darkMode-error w-12 py-2 rounded-lg hover:brightness-125'
            >
              no
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function CommentSection() {
  const [isSortPopUp, setIsSortPopUp] = useState(false);
  return (
    <div className='flex-1 p-4 max-[630px]:px-2  mt-4 flex-col'>
      <div className=' flex flex-row justify-between items-center'>
        <div className='th text-2xl'>Reviews</div>
        <div className=' max-[640px]:hidden'>
          {' '}
          <div onClick={() => setIsSortPopUp((prev) => !prev)}>
            <Sort isSortPopUp={isSortPopUp} />
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-4 p-4 mt-4 max-[640px]:flex-col '>
        <div className=' flex-1  flex  flex-col gap-y-4 h-fit min-[640px]:sticky min-[640px]:top-[-280px] '>
          <ReviewOverview />
          <AddReview />
        </div>
        <div className=' flex-1 flex flex-col gap-y-4'>
          <div className=' flex flex-row justify-end min-[640px]:hidden'>
            <div onClick={() => setIsSortPopUp((prev) => !prev)}>
              <Sort isSortPopUp={isSortPopUp} />
            </div>
          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}

function Sort({ isSortPopUp }) {
  return (
    <div className=' relative'>
      <div className=' h-10 rounded-lg border-[1px] cborder flex items-center justify-center tp px-2 sbg cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header gap-x-1'>
        <SortIcon />
        <div>Sort</div>
      </div>
      {isSortPopUp && (
        <div className=' absolute bottom-[-132px] left-[-42px] rounded-lg border-[1px] cborder flex flex-col tp text-sm px-4 sbg'>
          <div className='  py-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            Most liked
          </div>
          <div className=' pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            Recent
          </div>
          <div className=' pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            Highest rated
          </div>
          <div className=' pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            lowest rated
          </div>
        </div>
      )}
    </div>
  );
}

function Comment() {
  return (
    <div className='w-full rounded-lg border-[1px] cborder p-4 flex-col flex'>
      <div className='flex flex-row gap-x-2'>
        <div
          style={{
            backgroundImage: 'url("/frame/level5.jpg")',
            backgroundSize: 'cover', // Adjust as needed

            backgroundPosition: 'center', // Adjust as needed
            // Additional background properties can be added here
          }}
          className=' flex justify-center items-center size-[40px] rounded-full border-0'
        >
          <img
            onClick={() => setIsProfilePopUpHandler()}
            className='size-9 rounded-full  cursor-pointer object-cover relative'
            src='/oilrig.jpg'
            alt=''
          />
        </div>
        <div className=' flex flex-col justify-evenly'>
          <div className=' text-sm th'>Harinder</div>
          <div className=' text-xs tp'>Level 2</div>
        </div>
        <div className='flex-1'></div>
        <div className=' tp flex justify-between items-center flex-col'>
          <div className=' cursor-pointer'>
            <ThumbUp sx={{ fontSize: 20 }} />
          </div>

          <div className=' text-xs  tp'>23</div>
        </div>
      </div>

      <div className=' text-sm th my-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        molestiae natus aspernatur quidem accusamus inventore voluptate
        laboriosam deserunt ipsa? Maxime voluptatibus veritatis enim ipsa amet
        esse dolor vel fugit repudiandae?
      </div>
      <div class='grid grid-cols-3 gap-2 md:grid-cols-2  max-h-[200px] overflow-y-auto'>
        <img src='/oilrig.jpg' alt='' />
        <img src='/oilrig.jpg' alt='' />
        <img src='/oilrig.jpg' alt='' />
        <img src='/oilrig.jpg' alt='' />
      </div>
    </div>
  );
}

function AddReview() {
  const size = 36;
  return (
    <div className=' flex-1 rounded-lg border-[1px] cborder p-4 flex-col'>
      <div className=' th text-xl flex flex-row items-center gap-x-2'>
        <RateReviewOutlinedIcon sx={{ fontSize: 24 }} />{' '}
        <div>Write a review</div>
      </div>
      <div className=' mt-4 flex flex-row justify-center'>
        {' '}
        <div className=' bg-transparent tp flex flex-row gap-x-1'>
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
        </div>
      </div>
      <div className=' mt-4 w-full flex'>
        <textarea
          placeholder='Share details of your experience'
          className='flex-1 rounded-lg border-[1px] cborder  text-sm tbg p-2 h-[120px] th resize-none caret-lightMode-p dark:caret-darkMode-p outline-0'
        ></textarea>
      </div>
      <div className='w-full flex flex-row justify-between mt-4 gap-x-2 overflow-auto'>
        <img className='h-20' src='/oilrig.jpg' alt='' />
        <img className='h-20' src='/oilrig.jpg' alt='' />
        <img className='h-20' src='/oilrig.jpg' alt='' />
        <img className='h-20' src='/oilrig.jpg' alt='' />{' '}
        <img className='h-20' src='/oilrig.jpg' alt='' />
      </div>
      <div className='w-full flex flex-row justify-between mt-4 '>
        <div className='tp rounded-lg h-10 flex flex-row items-center px-2 tbg hover:text-lightMode-header dark:hover:text-darkMode-header border-[1px] cborder gap-x-2 cursor-pointer'>
          <AddAPhotoOutlinedIcon />
          <div className=' flex max-[360px]:hidden max-[640px]:flex max-[710px]:hidden min-[1000px]:hidden  min-[1040px]:flex'>
            Add photos & videos
          </div>
        </div>
        <div className=' rounded-lg h-10 flex flex-row items-center px-4 bgbtn hover:bg-lightMode-buttonHover dark:hover:bg-darkMode-buttonHover th cursor-pointer'>
          <div className=''>Post</div>
        </div>
      </div>
    </div>
  );
}

function ReviewOverview() {
  const rating = 3.1;
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const size = 20;
  const stars = [];
  const isFavourite = false;
  // Filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<StarIcon key={i} sx={{ color: 'gold', fontSize: size }} />);
  }

  // Half star
  if (!Number.isInteger(rating)) {
    const halfStar = rating - filledStars;
    if (halfStar < 0.3) {
      stars.push(<StarIcon sx={{ fontSize: size }} />);
    } else if (halfStar > 0.7) {
      stars.push(<StarIcon sx={{ color: 'gold', fontSize: size }} />);
    } else {
      stars.push(
        <StarHalfIcon
          key={filledStars}
          sx={{ color: 'gold', fontSize: size }}
        />
      );
    }
  }

  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<StarIcon key={i} sx={{ fontSize: size }} />);
  }
  const array = [5, 4, 3, 2, 1];
  return (
    <div className=' flex-1 rounded-lg border-[1px] cborder p-4 flex-col'>
      <div className=' flex flex-col w-full items-center tp gap-y-2'>
        <div className=' text-4xl th'>{rating}</div>

        <div className=' flex flex-row gap-x-[2px]'>{stars}</div>

        <div className=' text-sm tp'>246 reviews</div>
      </div>
      {array.map((item, i) => {
        return (
          <div key={i} className='flex flex-row gap-x-2 items-center mt-2'>
            <div className=' text-sm th'>{item}</div>
            <div className='flex-1 h-2 rounded-lg sbg'>
              <div className='  w-[33%] h-2 rounded-lg bg-[#fbbc04]'></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Contributor() {
  return (
    <div className='flex-1 p-4 max-[630px]:px-2  mt-4 flex-col'>
      <div className=' flex flex-row justify-between items-center'>
        <div className='th text-2xl'>Contributors</div>
      </div>
      <div className=' flex flex-row justify-end mt-4 min-[520px]:hidden '>
        <div className=' flex flex-row th border-[1px] cborder rounded-lg w-[150px] cursor-pointer'>
          <div className='flex-1 border-r-[1px] cborder text-center p-2 tb'>
            Month
          </div>
          <div className='flex-1 text-center p-2'>Year</div>
        </div>
      </div>
      <div className=' mt-4 p-4 flex-1 min-[520px]:hidden'>
        <ContributorList isMonth={true} />
      </div>
      <div className=' mt-4 p-4 flex-row flex gap-x-4 max-[520px]:hidden'>
        <ContributorList isMonth={true} />
        <ContributorList isMonth={false} />
      </div>
    </div>
  );
}

function ContributorList({ isMonth }) {
  const array = [1, 2, 3, 4, 5];
  return (
    <div className=' flex-1 rounded-lg border-[1px] cborder th'>
      <div className=' p-4 text-end text-lg'>
        {isMonth ? 'February' : '2024'}
      </div>

      {array.map((item) => {
        return (
          <div
            key={'contributer' + item}
            className=' flex-1 flex flex-row justify-between items-center p-2 border-t-[1px] cborder'
          >
            {item <= 3 ? (
              <div className=' flex flex-row gap-x-1 items-center'>
                <div> {item} </div>{' '}
                <div
                  className={`${item === 1 && 'text-[#ffd700]'} ${
                    item === 2 && 'text-[#c0c0c0]'
                  } ${item === 3 && 'text-[#CD7F32]'}`}
                >
                  <EmojiEventsIcon sx={{ fontSize: 18 }} />
                </div>
              </div>
            ) : (
              <div> {item}</div>
            )}
            <div>Harinder</div>
          </div>
        );
      })}
    </div>
  );
}

function Amenities() {
  const array = [
    { name: 'Car wash', src: '/carWash.png' },
    { name: 'Air pump', src: '/airPump.png' },
    { name: 'Convenience store', src: '/conv.webp' },
    { name: 'Ev charging station', src: '/ev.webp' },
    { name: 'Truck stop', src: '/truck.webp' },
    { name: 'ATM', src: '/atm.png' },
  ];
  return (
    <div className='flex-1 p-4 max-[630px]:px-2 w-full  mt-4 flex-col h-[256px] max-[640px]:h-[415px]'>
      <div className='th text-2xl'>Amenities</div>
      <div className=' relative w-full '>
        <div className=' absolute top-0 w-full'>
          <div className=' mt-4 p-4 rounded-lg  border-[0px] mx-auto w-full   cborder flex flex-row overflow-x-auto gap-x-4 sb max-[640px]:grid max-[640px]:grid-cols-3 max-[640px]:place-content-center'>
            {array.map((item) => {
              return (
                <li
                  key={item.name}
                  className=' flex flex-col items-center justify-around py-2 sbg th rounded-lg w-[100%] h-36 my-2'
                >
                  <img
                    className='w-[50px] h-[50px] invert'
                    src={item.src}
                    alt=''
                  />
                  <div className=' text-sm th w-full text-center pb-2 flex flex-row justify-center'>
                    {item.name}
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function GasPrice({ gasInfo, setModal }) {
  return (
    <div className='w-full p-4 max-[630px]:px-2  mt-4'>
      <div className=' flex flex-row justify-between items-center th'>
        {' '}
        <div className='th text-2xl'>Gas prices</div>
        <div
          onClick={() => setModal({ show: true, title: 'price' })}
          className=' cursor-pointer'
        >
          <EditOutlinedIcon />
        </div>
      </div>
      <ul className='grid w-full grid-cols-4 rounded-lg mt-4 cborder border-[1px] max-[640px]:grid-cols-2'>
        {gasInfo.map((gas) => {
          const { type, price, updatedBy, updatedAt } = gas;

          const borderBtw =
            'cborder ' +
            (type == 'Diesel'
              ? ' max-[640px]:border-t-[1px] '
              : type == 'Mid-grade'
              ? ' min-[641px]:border-r-[1px] '
              : 'border-r-[1px] ' +
                (type == 'Premium' ? 'max-[640px]:border-t-[1px] ' : ''));
          return (
            <li
              key={type}
              className={
                'flex flex-col text-center gap-y-2 px-2 py-4 ' + borderBtw
              }
            >
              <div className='th'>{type}</div>
              <div className=' text-xl th'>${price}</div>
              <div className=' w-full justify-center  tp text-sm flex flex-row gap-x-1 items-center'>
                <PersonIcon sx={{ fontSize: 16 }} /> <div> {updatedBy}</div>
              </div>
              <div className=' text-xs tp'>{format(updatedAt)}</div>
            </li>
          );
        })}
      </ul>
      {/* <div className=' flex w-full flex-row justify-center  mt-4 max-[640px]:flex-col rounded-lg cborder  border-[1px]'>
        <div className=' flex flex-1 flex-row'>
          <div className='flex flex-col text-center gap-y-2 px-2 border-r-[1px] max-[640px]:border-b-[1px] cborder flex-1 py-4'>
            <div className='th'>Regular</div>
            <div className=' text-xl th'>$1.72</div>
            <div className=' w-full justify-center  tp text-sm flex flex-row gap-x-1 items-center'>
              <PersonIcon sx={{ fontSize: 16 }} /> <div> harinder</div>
            </div>
            <div className=' text-xs tp'>2 hours ago</div>
          </div>
          <div className='flex flex-col text-center gap-y-2 px-2 border-r-[1px] max-[640px]:border-b-[1px] max-[640px]:border-r-[0px] cborder flex-1 py-4'>
            <div className='th'>Mid-grade</div>
            <div className=' text-xl th'>$1.72</div>
            <div className=' w-full justify-center  tp text-sm flex flex-row gap-x-1 items-center'>
              <PersonIcon sx={{ fontSize: 16 }} /> <div> harinder</div>
            </div>
            <div className=' text-xs tp'>2 hours ago</div>
          </div>
        </div>
        <div className=' flex flex-1 flex-row'>
          <div className='flex flex-col text-center gap-y-2 px-2 border-r-[1px] cborder flex-1 py-4'>
            <div className='th'>Premium</div>
            <div className=' text-xl th'>$1.72</div>
            <div className=' w-full justify-center  tp text-sm flex flex-row gap-x-1 items-center'>
              <PersonIcon sx={{ fontSize: 16 }} /> <div> harinder</div>
            </div>
            <div className=' text-xs tp'>2 hours ago</div>
          </div>
          <div className='flex flex-col text-center gap-y-2 px-2 flex-1 py-4'>
            <div className='th'>Diesel</div>
            <div className=' text-xl th'>$1.72</div>
            <div className=' w-full justify-center  tp text-sm flex flex-row gap-x-1 items-center'>
              <PersonIcon sx={{ fontSize: 16 }} /> <div> harinder</div>
            </div>
            <div className=' text-xs tp'>2 hours ago</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

function StationInfo() {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isDirectionMap, setIsDirectionMap] = useState(false);
  const rating = 3.1;
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const size = 16;
  const stars = [];
  const isFavourite = false;
  // Filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<StarIcon key={i} sx={{ color: 'gold', fontSize: size }} />);
  }

  // Half star
  if (!Number.isInteger(rating)) {
    const halfStar = rating - filledStars;
    if (halfStar < 0.3) {
      stars.push(<StarIcon sx={{ fontSize: size }} />);
    } else if (halfStar > 0.7) {
      stars.push(<StarIcon sx={{ color: 'gold', fontSize: size }} />);
    } else {
      stars.push(
        <StarHalfIcon
          key={filledStars}
          sx={{ color: 'gold', fontSize: size }}
        />
      );
    }
  }

  // Empty stars
  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<StarIcon key={i} sx={{ fontSize: size }} />);
  }
  function directionMapHandler(bool) {
    if (bool) {
      setIsDirectionMap(true);
    } else {
      setIsDirectionMap(false);
    }
  }

  return (
    <div className=' w-full rounded-lg  cborder flex flex-row p-4 max-[640px]:items-center max-[640px]:flex-col max-[380px]:px-2 '>
      <div className=' relative w-[320px] h-[180px] max-[350px]:w-full '>
        {!isDirectionMap ? (
          <div className=' relative w-full h-full top-0 left-0 overflow-hidden'>
            <img
              className=' w-full h-full rounded-lg object-cover'
              src='/oilrig.jpg'
              alt=''
            />
            <div className=' absolute top-2 right-2 th cursor-pointer '>
              <FavoriteBorder />
            </div>
            <div className=' w-14 h-14 absolute bottom-[-16px] right-[-16px] th  rounded-full bg'>
              <div
                onClick={() => directionMapHandler(true)}
                className=' cursor-pointer w-full h-full relative right-[-12px] bottom-[-12px]'
              >
                {' '}
                <MapOutlined />
              </div>
            </div>
          </div>
        ) : (
          <div className=' absolute top-0 right-0 w-full h-full  z-[2] rounded-lg'>
            <div className=' relative w-full h-full top-0 right-0'>
              <div className=' w-14 h-14 absolute top-[-16px] right-[-16px] th  rounded-full bg z-[2]'>
                <div
                  onClick={() => directionMapHandler(false)}
                  className=' cursor-pointer w-full h-full relative right-[-12px] top-[16px]'
                >
                  {' '}
                  <Close />
                </div>
              </div>
              <div className=' absolute top-0 right-0 w-full h-full rounded-t-lg'>
                <StationMapDistance
                  setDuration={setDuration}
                  setDistance={setDistance}
                />
              </div>
              <div
                className={` transition-div absolute top-[180px] right-0  w-full sbg z-[1]   rounded-b-lg overflow-hidden`}
              >
                <div className=' w-full h-full flex flex-col p-4'>
                  <div className=' flex flex-row items-center justify-between th'>
                    <div className=' flex flex-row items-center gap-x-1 tp'>
                      {' '}
                      <DirectionsCarFilledOutlinedIcon />
                      <div className=' text-sm'>Distance</div>
                    </div>

                    <div className=' text-sm'>{distance}</div>
                  </div>
                  <div className=' flex flex-row items-center justify-between th mt-4'>
                    <div className=' flex flex-row items-center gap-x-1 tp'>
                      {' '}
                      <AccessTimeOutlinedIcon />
                      <div className=' text-sm'>Duration</div>
                    </div>

                    <div className=' text-sm'>{duration}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className=' flex flex-col ml-12 my-4 justify-between max-[640px]:ml-0 max-[640px]:w-[320px]
      max-[350px]:w-full '
      >
        <div className='flex flex-row w-full items-center justify-between'>
          <div className='w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]  text-2xl font-[400] th max-[640px]:text-xl text-ellipsis whitespace-nowrap overflow-hidden'>
            Chevron gas stations
          </div>
          <div className='p-[6px] rounded-full th fbg text-xs min-[640px]:hidden'>
            {rating}
          </div>
        </div>
        <div className=' flex flex-row tp items-center gap-x-2 text-sm max-[640px]:hidden'>
          <div>{rating}</div>
          <div className='  relative '>
            <div className=' flex flex-row gap-x-[2px]'>{stars}</div>
          </div>
          <div className=' text-[9px] relative top-[-4px] right-[4px]'>
            (246)
          </div>
        </div>
        <div className='tp flex  w-full  max-[640px]:mt-2 flex-col max-[640px]:flex-row max-[640px]:justify-between'>
          <div className=' w-[230px] max-[640px]:w-[calc(100%-95px)] max-[350px]:w-[220px] max-[330px]:w-[200px] max-[310px]:w-[180px] max-[290px]:w-[160px] text-ellipsis whitespace-nowrap overflow-hidden '>
            {' '}
            12343 st king highway
          </div>
          <div className=' tb text-sm hover:underline cursor-pointer min-[640px]:hidden ml-2 whitespace-nowrap'>
            Get directions
          </div>
        </div>
        <div className=' tb text-sm hover:underline cursor-pointer max-[640px]:hidden '>
          Get directions
        </div>
      </div>
      <div className='flex-1'></div>
      <div className='h-[180px] w-[170px] max-[1150px]:hidden max-[1000px]:flex max-[850px]:hidden'>
        <MakeImpact />
      </div>
    </div>
  );
}

function MakeImpact() {
  return (
    <div className=' flex-1 h-full relative '>
      <div className=' absolute  bg  top-[50%] w-full  z-[5]'>
        <div className=' w-full h-[2px] my-1 sbg'></div>
      </div>
      <div className=' absolute  top-0 right-0 w-full h-[90px] overflow-hidden'>
        <div className=' relative  th flex flex-col items-end text-end translateGoUp'>
          <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '28px' }} />
          <div className=' th flex flex-row items-center justify-end text-xl'>
            Contribute &
          </div>
        </div>
      </div>
      <div className=' absolute  bottom-0 right-0 w-full h-[90px] overflow-hidden '>
        <div className=' relative  th flex flex-col text-end translateGoDown'>
          <div className=' th flex flex-row items-center justify-end text-xl'>
            Make an impact
          </div>
        </div>
      </div>
      <div className=' absolute  bottom-0 right-0 w-full h-[90px] overflow-hidden '>
        <div className=' relative  th flex flex-col text-end translateGoUpSurvey '>
          <div className=' flex flex-row items-center justify-end text-sm tb hover:underline cursor-pointer'>
            Take a survey
          </div>
        </div>
      </div>
    </div>
  );
}

function StationMapDistance({ setDistance, setDuration }) {
  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [count, setCount] = useState(0);
  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    //  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#242f3e' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    // {
    //   featureType: "road.highway",
    //   elementType: "geometry",
    //   stylers: [{ color: "#746855" }],
    // },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    // {
    //   featureType: "road.highway",
    //   elementType: "labels.text.fill",
    //   stylers: [{ color: "#f3d19c" }],
    // },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];
  const mapOptions = {
    disableDefaultUI: true,
    styles: mapStyle,
  };
  const mapContainerStyle = {
    height: '100%',
    width: '100%',
    border: '0px',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    outline: 'none',
  };
  const initialPosition = {
    lat: 49.258347,
    lng: -123.076953,
  };
  const markerposition = {
    lat: 49.278774,
    lng: -123.109445,
  };
  useEffect(() => {
    getThirdGmStyleChild();
  }, []);
  const getThirdGmStyleChild = async () => {
    const gmStyleElements = document.querySelectorAll('.gm-style');

    if (gmStyleElements.length === 0) {
      if (count < 5) {
        setCount((prev) => prev + 1);
        await sleep(1000);
        getThirdGmStyleChild();
      }
    }

    const thirdGmStyleElement = gmStyleElements[0].children[2];

    thirdGmStyleElement.style.border = '0px';
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    calculateDirections();
  }, []);

  const calculateDirections = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          markerposition.lat,
          markerposition.lng
        ),
        destination: new window.google.maps.LatLng(
          initialPosition.lat,
          initialPosition.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          // setDistance(result.routes[0].legs[0].distance.text);
          const distance = result.routes[0].legs[0].distance.text;
          const duration = result.routes[0].legs[0].duration.text;

          console.log(result.routes[0].legs[0]);
          setDistance(distance);
          setDuration(duration);
        } else {
          console.error('Error fetching directions:', status);
        }
      }
    );
  };

  return (
    <div style={{}} className='w-full h-full relative'>
      <GoogleMap
        ref={mapRef}
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        center={initialPosition}
        zoom={15}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#3498db',
                strokeWeight: 5,
              },
              suppressMarkers: true,
            }}
          />
        )}
        <Marker
          position={markerposition}
          title='Your Marker'
          icon={{
            url: stationMarke,
            scaledSize: { width: 36, height: 40 },
          }}
        />
      </GoogleMap>
    </div>
  );
}

export function NavGasStation({ setIsProfilePopUpHandler, setModal }) {
  const handleModal = (title) => {
    setModal({ show: true, title });
  };
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
          <div className='th'>Fuel</div>
          Go
        </div>
      </div>

      <div className=' flex-1'></div>
      <div
        onClick={() => handleModal('price')}
        name='price'
        className=' flex flex-row items-center tp rounded-lg border-[1px] cborder h-10 px-2 tbg gap-x-1 cursor-pointer hover:text-lightMode-header dark:hover:text-darkMode-header   '
      >
        <EditOutlinedIcon />
        <div className=' max-[740px]:hidden'>Price</div>
      </div>
      <div
        name='survey'
        onClick={() => handleModal('survey')}
        className=' flex flex-row items-center tp rounded-lg border-[1px] cborder h-10 px-2 tbg gap-x-1 cursor-pointer  hover:text-lightMode-header dark:hover:text-darkMode-header  '
      >
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
