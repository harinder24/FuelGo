import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useNavigate } from 'react-router-dom';
export default function TopNav({
  setIsProfilePopUpHandler,
  isList,
  setIsList,
}) {
  const navigate = useNavigate();
  return (
    <div className=' w-full rounded-lg sbg flex flex-row items-center p-4 gap-x-4 max-[520px]:rounded-none max-[520px]:p-2'>
      <div
        className='flex items-center gap-x-1 caret-transparent cursor-pointer'
        onClick={() => navigate('/home')}
      >
        <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '28px' }} />

        <div className='flex flex-row items-center  text-lightMode-button'>
          <div className='text-white'>Fuel</div>
          Go
        </div>
      </div>
      <div className=' flex-1 w-full relative max-[520px]:hidden'>
        <input
          // style={errorEmailBorder ? { borderColor: "rgb(211 47 47 )" } : {}}
          // label="Email"
          // type="email"
          // value={email}
          placeholder='Search'
          // onChange={(e) => setEmail(e.target.value)}
          className=' pl-10 customInput'
        />
        <div className=' absolute top-[7.5px] left-2'>
          <SearchOutlinedIcon sx={{ color: '#747c88' }} />
        </div>
      </div>
      <div className='flex-1 min-[521px]:hidden'></div>
      <div className=' h-10 rounded-lg tbg cborder border-[1px] flex flex-row items-center caret-transparent '>
        <div
          onClick={() => setIsList(true)}
          className={`flex flex-row items-center ${
            isList
              ? 'text-lightMode-button dark:text-darkMode-button'
              : 'text-lightMode-p dark:text-darkMode-p'
          }    w-[100px] justify-center gap-x-1 cursor-pointer max-[740px]:w-10`}
        >
          <FormatListBulletedOutlinedIcon />
          <div className='max-[740px]:hidden'>List</div>
        </div>
        <div className='h-full cborder border-l-[1px]'></div>

        <div
          onClick={() => setIsList(false)}
          className={`flex flex-row items-center ${
            !isList
              ? 'text-lightMode-button dark:text-darkMode-button'
              : 'text-lightMode-p dark:text-darkMode-p'
          } w-[100px] justify-center gap-x-1 cursor-pointer max-[740px]:w-10`}
        >
          <MapOutlinedIcon />
          <div className='max-[740px]:hidden'>Map</div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: 'url("../public/frame/level5.jpg")',
          backgroundSize: 'cover', // Adjust as needed
          backgroundPosition: 'center', // Adjust as needed
          // Additional background properties can be added here
        }}
        className=' flex justify-center items-center size-[44px] rounded-full border-0 min-[1001px]:hidden'
      >
        <img
          onClick={() => setIsProfilePopUpHandler()}
          className='size-10 rounded-full  cursor-pointer object-cover relative'
          src='../public/oilrig.jpg'
          alt=''
        />
      </div>
    </div>
  );
}
