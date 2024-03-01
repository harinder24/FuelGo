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
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../UI/CustomInput';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CustomButton from '../UI/CustomButton';

const CONTENTS = [
  { title: 'Account Info', element: <Settings /> },
  { title: 'Avatar', element: <Avatar /> },
  { title: 'Frame', element: <Frame /> },
  { title: 'Invite Friends', element: <ShareLink /> },
  { title: 'Live Support', element: <ContactUs /> },
];
const SIDEBARACTIONS = [
  {
    title: 'Favourite',
    icon: (
      <FavoriteBorderOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
    ),
  },
  {
    title: 'Rewards',
    icon: <WalletOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
  },
  {
    title: 'Avatar',
    icon: (
      <SentimentSatisfiedOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
    ),
  },
  {
    title: 'Frame',
    icon: <LensOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
  },
  {
    title: 'Invite Friends',
    icon: <CardGiftcardOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
    subtitle: [
      'You earn 100',
      <PixIcon sx={{ color: 'white', fontSize: 14 }} />,
    ],
  },
  {
    title: 'Live Support',
    icon: <SupportAgentIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
  },
];
const AVATARS = [
  { url: 'oilrig.jpg', isActive: true, activeMethod: '' },
  { url: 'oilrig.jpg', isActive: false, activeMethod: 'Unlocks at level 10' },
  { url: 'oilrig.jpg', isActive: false, activeMethod: 400 },
  { url: 'facebook.png', isActive: true, activeMethod: '' },
  { url: 'oilrig.jpg', isActive: true, activeMethod: '' },
  { url: 'oilrig.jpg', isActive: false, activeMethod: 'Unlocks at level 20' },
  { url: 'google.png', isActive: false, activeMethod: 500 },
];
const FRAMES = [
  { url: 'level5.jpg', isActive: true, activeMethod: '' },
  { url: 'level10.jpg', isActive: false, activeMethod: 'Unlocks at level 10' },
  { url: 'level10.jpg', isActive: true, activeMethod: '' },
  { url: 'level5.jpg', isActive: false, activeMethod: 'Unlocks at level 25' },
  { url: 'level10.jpg', isActive: false, activeMethod: 700 },
];
export default function Profile() {
  return (
    <div className='w-full h-full  flex flex-col  overflow-auto'>
      <ProfileComp />
    </div>
  );
}

function SignoutBtn() {
  const [confirm, setConfirm] = useState();
  return (
    <div className='px-2 w-full caret-transparent mt-2 '>
      {!confirm ? (
        <div
          onClick={() => setConfirm(true)}
          className=' flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg '
        >
          <PowerSettingsNewOutlinedIcon
            sx={{ color: '#ffffff', fontSize: 25 }}
          />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Sign out
          </div>
        </div>
      ) : (
        <div className=' flex flex-row  gap-x-4 '>
          <div
            onClick={() => setConfirm(false)}
            className='flex-1 rounded-lg tbg hover:bg-lightMode-bg dark:hover:bg-darkMode-bg py-[18.5px] text-center th text-sm cursor-pointer'
          >
            Cancel
          </div>
          <div
            className=' flex-1  bg-lightMode-button dark:bg-lightMode-button text-lightMode-header  text-sm dark:text-lightMode-header hover:bg-lightMode-buttonHover rounded-lg
       py-[18.5px] text-center th cursor-pointer'
          >
            Sign out
          </div>
        </div>
      )}
    </div>
  );
}
function ProfileComp() {
  const navigate = useNavigate();
  const [crrAction, setCrrAction] = useState();

  const handleActionChange = (title) => {
    const selected = CONTENTS.find((item) => item.title == title);
    if (!selected) {
      navigate(title.toLowerCase());
      return;
    }
    setCrrAction(selected);
  };

  if (crrAction) {
    const { title, element } = crrAction;
    return (
      <>
        <div className=' text-center th flex items-center m-4 justify-between'>
          <h2 className=' text-white text-lg '>{title}</h2>
          <div onClick={() => setCrrAction()} className=' cursor-pointer'>
            <ArrowBackIcon />
          </div>
        </div>
        {element}
      </>
    );
  }

  return (
    <>
      <UserInfo handleActionChange={handleActionChange} />

      {SIDEBARACTIONS.map((action, index) => {
        const { title, icon, subtitle = '' } = action;

        return (
          <>
            <div className='px-2 w-full caret-transparent'>
              <div
                onClick={() => handleActionChange(title)}
                className={`flex flex-row items-center gap-x-4 p-4 ${
                  subtitle ? 'py-[8.5px]' : ''
                } rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg`}
              >
                {icon}
                <div className=' flex flex-col'>
                  <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
                    {title}
                  </div>
                  {subtitle && (
                    <div className=' flex flex-row items-center gap-x-1'>
                      <div className='text-lightMode-p dark:text-darkMode-p text-sm '>
                        {subtitle[0]}
                      </div>
                      {subtitle[1]}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {index == 4 && (
              <div className=' border-b-[1px] border-lightMode-border dark:border-darkMode-border mt-4 mb-2'></div>
            )}
          </>
        );
      })}
      <SignoutBtn />
    </>
  );
}
function UserInfo({ handleActionChange }) {
  // getUserInfo from backend
  const [user, setUser] = useState({
    name: 'Harinder Sran',
    email: 'hss0220022gmail.com',
    profileImg: '/oilrig.jpg',
    frame: 'level5.jpg',
    lv: 3,
    crrEXP: 15,
    requiredEXP: 75,
  });
  return (
    <>
      <div className='p-2 pb-0 w-full mb-6 caret-transparent'>
        <div className='w-full border-t-[1px] border-lightMode-fbg h-[88px] rounded-xl tbg-gradient flex flex-row items-center  p-4 '>
          <div className='flex flex-row gap-x-4 items-center w-full justify-between'>
            <div className='flex flex-row gap-x-4 items-center flex-1'>
              <div
                style={{
                  backgroundImage: `url("/frame/${user.frame}")`,
                  backgroundSize: 'cover', // Adjust as needed
                  backgroundPosition: 'center', // Adjust as needed
                  // Additional background properties can be added here
                }}
                className=' flex justify-center items-center size-[60px] rounded-full border-0'
              >
                <img
                  className='size-14 rounded-full object-cover'
                  src={user.profileImg}
                  alt=''
                />
              </div>
              <div className='flex flex-col flex-1 overflow-hidden justify-between h-full'>
                <div className='text-lightMode-header text-base font-[400] width-full overflow-hidden text-ellipsis whitespace-nowrap w-[144px] max-[315px]:w-[110px]'>
                  {user.name}
                </div>
                <div className='text-lightMode-p dark:text-darkMode-p text-xs w-[144px] overflow-hidden text-ellipsis whitespace-nowrap max-[315px]:w-[110px]'>
                  {user.email}
                </div>
              </div>
            </div>

            <div
              onClick={() => handleActionChange('Account Info')}
              className=' cursor-pointer'
            >
              <SettingsOutlinedIcon sx={{ color: 'white', fontSize: '28px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className='px-6 flex-col mb-2 caret-transparent'>
        <div className='text-lightMode-p dark:text-darkMode-p text-sm mb-1'>
          Level {user.lv}
        </div>
        <div className='flex flex-row h-4 rounded-full bg-lightMode-tbg cborder border-[1px]'>
          {console.log(user.crrEXP / user.requiredEXP)}
          <div
            className='bg-lightMode-button rounded-full'
            style={{ width: `${(user.crrEXP / user.requiredEXP) * 100}%` }}
          ></div>
          <div className='flex-1'></div>
        </div>
        <div className='text-lightMode-p dark:text-darkMode-p text-sm mt-1 flex flex-row justify-end items-center'>
          <div>
            {user.crrEXP} / {user.requiredEXP}
          </div>
        </div>
      </div>
    </>
  );
}

function Avatar() {
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {AVATARS.map((item) => (
          <div key={item.url} className={`${item.isActive ? '' : 'relative'}`}>
            <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
              <img
                className='size-[60px] rounded-full  cursor-pointer object-cover relative'
                src={item.url}
                alt=''
              />
            </div>
            {item.isActive || (
              <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
                <div className=' w0full h-full flex justify-center items-center th text-xs px-4 text-center'>
                  <div>
                    {isNaN(item.activeMethod) ? (
                      item.activeMethod
                    ) : (
                      <div className='flex items-center justify-center  gap-1'>
                        <PixIcon sx={{ color: 'white', fontSize: 14 }} />
                        {item.activeMethod}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
function Frame() {
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {FRAMES.map((item) => (
          <div key={item.url} className={`${item.isActive ? '' : 'relative'}`}>
            <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
              <div
                style={{
                  backgroundImage: `url("/frame/${item.url}")`,
                  backgroundSize: 'cover', // Adjust as needed
                  backgroundPosition: 'center', // Adjust as needed
                  // Additional background properties can be added here
                }}
                className=' flex justify-center items-center size-[60px] rounded-full border-0 '
              >
                <div className='size-14 rounded-full tbg' />
              </div>
            </div>
            {item.isActive || (
              <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
                <div className=' w0full h-full flex justify-center items-center th text-xs px-4 text-center'>
                  <div>
                    {isNaN(item.activeMethod) ? (
                      item.activeMethod
                    ) : (
                      <div className='flex items-center justify-center  gap-1'>
                        <PixIcon sx={{ color: 'white', fontSize: 14 }} />
                        {item.activeMethod}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  //user data from backend
  const [user, setUser] = useState({
    name: 'Harinder Sran',
    email: 'hss0220022gmail.com',
    profileImg: '/oilrig.jpg',
    frame: 'level5.jpg',
    lv: 3,
    crrEXP: 15,
    requiredEXP: 75,
  });
  const [errorEmailBorder, setErrorEmailBorder] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('Harinder');
  const [errorNameBorder, setErrorNameBorder] = useState(false);
  const handleUpload = (e) => {
    const file = e.target.files[0]; // 첫 번째로 선택된 파일 가져오기
    console.log(file);
  };
  return (
    <div className='w-full p-3 pt-0'>
      <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-3 pb-3'>
        Profile Image
      </h4>
      <div className=' relative w-fit mb-4'>
        <img
          className=' size-[100px] rounded-full'
          src={user.profileImg}
          alt=''
        />
        <div className=' absolute bottom-0 right-[-4px] rounded-full bg-white p-2 shadow-md cursor-pointer'>
          <input
            type='file'
            accept='image/*'
            onChange={handleUpload}
            className=' rounded-full w-10 h-10 absolute  bottom-[1px] right-[0px] bg-transparent cursor-pointer opacity-0'
          ></input>
          <EditIcon />
        </div>
      </div>
      <form
        //  onSubmit={(e) => handleUserData(e)}
        noValidate
      >
        <CustomInput
          label='Name *'
          paddingLeft='40px'
          placeHolder={user.name}
          icon={
            <BadgeOutlinedIcon
              className='absolute left-2 tp text-sm bottom-[10px]'
              sx={{ color: '#747c88' }}
            />
          }
          isInvalid={error}
          errorMessage={error}
        />

        <div className='mt-4'></div>

        <CustomButton type='submit'>Change</CustomButton>
      </form>
    </div>
  );
}
function ContactUs() {
  const [isHome, setIsHome] = useState(true);
  const [isChat, setIsChat] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [isSendMsg, setIsSendMsg] = useState(false);
  const chatContainerRef = useRef(null);
  const [isAutoFocus, setIsAutoFocus] = useState(false);
  const [helpDataId, setHelpDataId] = useState(null);
  useEffect(() => {
    if (isSendMsg) {
      scrollToBottom();
    }
  }, [isSendMsg]);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };
  return (
    <>
      {helpDataId ? (
        <></>
      ) : (
        <div className='w-[312px]'>
          {isSendMsg ? (
            <div className=' w-full   caret-transparent'>
              <div className=' text-center th flex items-center p-3 pb-4 justify-between'>
                <div className=' flex flex-row items-center'>
                  <img
                    className='size-10 rounded-full  cursor-pointer object-cover'
                    src='/oilrig.jpg'
                    alt=''
                  />
                  <h2 className=' text-white text-lg   pl-4'>Agent name</h2>
                </div>

                <div
                  onClick={() => setIsSendMsg(false)}
                  className=' cursor-pointer'
                >
                  <CloseIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className=' w-full   caret-transparent'></div>
          )}
        </div>
      )}

      <div
        ref={chatContainerRef}
        className={` flex-1  overflow-y-auto flex flex-col     px-3 `}
      >
        {isHome && (
          <ContactUsHome
            setIsSendMsg={setIsSendMsg}
            setIsChat={setIsChat}
            setIsHome={setIsHome}
            setIsHelp={setIsHelp}
            setIsAutoFocus={setIsAutoFocus}
            setHelpDataId={setHelpDataId}
          />
        )}
        {isChat && (
          <ContactUsChat isSendMsg={isSendMsg} setIsSendMsg={setIsSendMsg} />
        )}
        {isHelp && (
          <ContactUsHelp
            isAutoFocus={isAutoFocus}
            setIsAutoFocus={setIsAutoFocus}
            helpDataId={helpDataId}
            setHelpDataId={setHelpDataId}
          />
        )}
      </div>
      <div className='border-t-[1px] cborder'></div>
      <div
        className=' sticky bottom-0 m-3  
             '
      >
        <ContactUsNav
          isHome={isHome}
          setIsHome={setIsHome}
          isChat={isChat}
          setIsChat={setIsChat}
          isHelp={isHelp}
          setIsHelp={setIsHelp}
        />
      </div>
    </>
  );
}

function ContactUsHelp({
  isAutoFocus,
  setIsAutoFocus,
  setHelpDataId,
  helpDataId,
}) {
  const [hData, setHData] = useState(helpData);
  const [text, setText] = useState('');

  useEffect(() => {}, []);
  useEffect(() => {
    if (text === '') {
      setHData(helpData);
    } else {
      let helpData2 = [...helpData];
      setHData([]);

      // const lcText = text.toLowerCase();
      let textSplit = text.split(' ');
      const dataArray = [];
      for (let k = 0; k < textSplit.length; k++) {
        const lcText = textSplit[k].toLowerCase();

        for (let i = 0; i < helpData2.length; i++) {
          const element = helpData2[i];
          let elementData = element.data.split(' ');

          for (let j = 0; j < elementData.length; j++) {
            let element2 = elementData[j].toLowerCase();
            if (element2.includes('.')) {
              element2 = element2.replace(/\./g, '');
            }
            if (element2.includes(',')) {
              element2 = element2.replace(/\,/g, '');
            }
            if (element2.includes("'")) {
              element2 = element2.replace(/\'/g, '');
            }
            if (element2.charAt(element2.length - 1) === 's') {
              const lcTextWithS = lcText + 's';
              if (element2 === lcTextWithS) {
                dataArray.push(element);
                break;
              }
            }
            if (lcText.charAt(lcText.length - 1) === 's') {
              const elementWithS = element2 + 's';
              if (elementWithS === lcText) {
                dataArray.push(element);
                break;
              }
            }

            if (element2 === lcText) {
              helpData2 = helpData2.filter((obj) => obj.id !== element.id);
              dataArray.push(element);
              break;
            }
          }
        }
      }
      setHData(dataArray);
    }
  }, [text]);

  useEffect(() => {
    return () => {
      setIsAutoFocus(false);
      setHelpDataId(null);
    };
  }, []);

  return (
    <>
      {helpDataId ? (
        <>
          {' '}
          <div className='w-[312px] p-3'>
            <div className='th flex  flex-row justify-between items-center'>
              <div className=' th w-[calc(100%-32px)] overflow-hidden text-ellipsis whitespace-nowrap caret-transparent'>
                {' '}
                {helpData[helpDataId - 1].title}
              </div>
              <div
                className=' cursor-pointer'
                onClick={() => setHelpDataId(null)}
              >
                <CloseIcon />
              </div>
            </div>{' '}
            <div className=' mt-2 tp caret-transparent '>
              {' '}
              {helpData[helpDataId - 1].data}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=' sticky top-0 sbg '>
            <div className='mb-6 mt-2 w-full relative'>
              <input
                autoFocus={isAutoFocus}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className=' customInput pl-8 pr-3'
                placeholder='Search for help'
                type='text'
              />
              <div className='h-9 rounded-lg left-1 flex justify-center items-center tp top-[2px] absolute  tbg '>
                <SearchOutlinedIcon />
              </div>
            </div>
          </div>
          <div>
            {hData.map((data) => {
              return (
                <div
                  onClick={() => setHelpDataId(data.id)}
                  key={data.id}
                  className='p-4 tbg rounded-lg flex flex-col text-sm mb-4 cursor-pointer hover:bg-lightMode-bg  dark:hover:bg-darkMode-bg caret-transparent'
                >
                  <div className=' th'>{data.title}</div>
                  <div className=' tp text-xs'>{data.title2}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

function ContactUsHome({
  setIsHome,
  setIsChat,
  setIsHelp,
  setIsSendMsg,
  setIsAutoFocus,
  setHelpDataId,
}) {
  function sendChatHandler() {
    setIsHome(false);
    setIsChat(true);
    setIsSendMsg(true);
  }
  function sendHelpHandler() {
    setIsHome(false);
    setIsHelp(true);
    setIsAutoFocus(true);
  }
  function specifificHelpHandler(num) {
    setIsHome(false);
    setIsHelp(true);
    setHelpDataId(num);
  }
  return (
    <>
      <div className=' flex flex-row pb-4 pt-1'>
        <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '60px' }} />
      </div>

      <div className=' text-3xl tp'>Hey Harinder &#128075;</div>
      <div className=' text-3xl th'>How can we help?</div>

      <div
        onClick={() => sendHelpHandler()}
        className=' h-10 flex flex-row items-center rounded-lg tbg mt-4 border-[1px] cborder tp cursor-text'
      >
        <div className='h-10 rounded-lg flex items-center pl-2'>
          <SearchOutlinedIcon />
        </div>
        <div className=' text-sm  pl-2'>Search for help</div>
      </div>

      {helpData.map((data) => {
        if (data.id > 3) {
          return null;
        }
        return (
          <div
            key={data.title}
            onClick={() => specifificHelpHandler(data.id)}
            className='p-4 tbg rounded-lg flex flex-col text-sm mt-4 cursor-pointer hover:bg-lightMode-bg  dark:hover:bg-darkMode-bg'
          >
            <div className=' th'>{data.title}</div>
            <div className=' tp text-xs'>{data.title2}</div>
          </div>
        );
      })}
      <div
        onClick={() => sendChatHandler()}
        className='p-4 tbg rounded-lg flex flex-row text-sm mt-4 cursor-pointer mb-4 items-center tp hover:text-lightMode-header dark:hover:text-lightMode-header hover:bg-lightMode-bg  dark:hover:bg-darkMode-bg'
      >
        <div className=' flex-1 flex flex-col'>
          <div className=' th'>Send us a message</div>
          <div className=' tp text-xs hover:text-lightMode-p dark:hover:text-lightMode-p'>
            We typically reply in few minutes
          </div>
        </div>
        <div className=' '>
          <SendOutlinedIcon />
        </div>
      </div>
    </>
  );
}

function ContactUsChat({ isSendMsg, setIsSendMsg }) {
  useEffect(() => {
    return () => {
      setIsSendMsg(false);
    };
  }, []);
  const [isChat, setIsChat] = useState(true);
  return (
    <>
      {isSendMsg ? (
        <>
          <div className=' flex-1 w-full  relative caret-transparent '>
            <ChatText
              isUser={false}
              text={
                'Please leave your message, include images or video if needed. An agent will be with you shortly'
              }
            />
          </div>
          <div className=' sticky bottom-0'>
            <div className='mb-2 w-full relative'>
              <input
                className='customInput w-full pl-8 pr-8'
                placeholder='Message'
                type='text'
              />
              <div className='h-9 rounded-lg left-1 flex justify-center items-center tp top-[2px] absolute  tbg '>
                <EmojiEmotionsIcon />
              </div>
              <div className='h-9 rounded-lg right-1 flex justify-center items-center tp top-[2px] absolute  tbg '>
                <AttachmentIcon />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex-1 w-full h-full relative caret-transparent'>
            {isChat ? (
              <>
                <div
                  onClick={() => setIsSendMsg(true)}
                  className=' cursor-pointer'
                >
                  <ChatOverView />
                </div>
              </>
            ) : (
              <div className=' text-sm tp text-center'>No recent chat</div>
            )}
          </div>
          <div className='  bottom-0  sticky w-full'>
            <div className='w-full flex flex-row justify-center my-4'>
              <div
                onClick={() => setIsSendMsg(true)}
                className=' flex flex-row items-center th p-2 rounded-lg tbg text-sm gap-x-2 cursor-pointer hover:bg-lightMode-bg dark:hover:bg-darkMode-bg  shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[0px_0px_36px__#e2e8f033]'
              >
                <div>Send us a message</div>
                <SendOutlinedIcon sx={{ fontSize: 16 }} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function ChatText({ isUser, text }) {
  return (
    <div
      className={`flex ${
        isUser ? 'pl-6 justify-end' : 'pr-6 justify-start'
      } w-full rounded-lg `}
    >
      <div
        className={` ${isUser ? ' bgbtn' : ' tbg'} rounded-lg text-sm p-3 th`}
      >
        {text}
      </div>
    </div>
  );
}

function ChatOverView() {
  return (
    <>
      <div className=' flex flex-row  px-4 cursor-pointer tbg rounded-lg py-2 mb-2 hover:bg-lightMode-bg hover:dark:bg-darkMode-bg'>
        <div className='flex h-full flex-col justify-center'>
          <img
            src='/oilrig.jpg'
            className=' size-10 rounded-full object-cover'
            alt=''
          />
        </div>
        <div className=' flex-1 px-2 flex flex-col justify-around'>
          <div className=' th text-xs w-[170px] max-[310px]:w-[160px] max-[300px]:w-[150px] max-[290px]:w-[140px]  text-ellipsis whitespace-nowrap overflow-hidden'>
            I have issue with my point redeem
          </div>
          <div className=' tp text-xs'>Luka . 20 min</div>
        </div>
        <div className=' flex h-auto flex-row justify-center items-center th'>
          <NavigateNextOutlinedIcon />
        </div>
      </div>
    </>
  );
}

function ContactUsNav({
  isHome,
  setIsHome,
  isChat,
  setIsChat,
  isHelp,
  setIsHelp,
}) {
  const setHomeHandler = () => {
    setIsHome(true);
    setIsChat(false);
    setIsHelp(false);
  };
  const setChatHandler = () => {
    setIsHome(false);
    setIsChat(true);
    setIsHelp(false);
  };
  const setHelpHandler = () => {
    setIsHome(false);
    setIsChat(false);
    setIsHelp(true);
  };
  return (
    <div className='w-full flex  caret-transparent'>
      <div className={`${isHome ? 'tb' : 'th'}  flex-1 flex justify-center `}>
        <div
          onClick={setHomeHandler}
          className=' flex flex-col  items-center cursor-pointer px-2'
        >
          <HomeIcon />
          <div className=' text-sm'>Home</div>
        </div>
      </div>
      <div className={`${isChat ? 'tb' : 'th'}  flex-1 flex justify-center `}>
        <div
          onClick={setChatHandler}
          className=' flex flex-col  items-center cursor-pointer px-2'
        >
          <ChatIcon />
          <div className=' text-sm'>Chat</div>
        </div>
      </div>
      <div className={`${isHelp ? 'tb' : 'th'}  flex-1 flex justify-center `}>
        <div
          onClick={setHelpHandler}
          className=' flex flex-col  items-center cursor-pointer px-2'
        >
          <ContactSupportOutlinedIcon />
          <div className=' text-sm'>Help</div>
        </div>
      </div>
    </div>
  );
}
function ShareLink() {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText('vuinjkubinjkl')
      .then(() => {
        console.log('Link copied to clipboard:', 'vygdbuhnjibuhdj');
        setShowCopiedMessage(true);

        // Set a timeout to hide the message after 2 seconds
        setTimeout(() => {
          setShowCopiedMessage(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error copying link to clipboard:', error);
        // You may handle errors or show an error message here
      });
  };
  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Your App Title',
        text: 'Check out this link!',
        url: 'https://www.yourapp.com',
      });
      console.log('Link shared successfully');
    } catch (error) {
      console.error('Error sharing link:', error);
    }
  };
  return (
    <div className=' w-full  caret-transparent pt-1'>
      <div className='w-full px-3'>
        <div className=' relative w-full'>
          <div className='w-full h-10 border-[1px] cborder rounded-lg px-2 flex items-center overflow-hidden'>
            <div className=' tp'>
              ashjalasjkahajskhajskcjcasjbccajsdddsdsdss
            </div>
          </div>
          <div className='absolute right-[1px] top-[1px] h-9  px-2 sbg rounded-lg'>
            <div
              onClick={copyToClipboard}
              className=' h-full flex items-center tp hover:text-lightMode-header dark:hover:text-darkMode-header cursor-pointer'
            >
              <AddLinkOutlinedIcon />
            </div>
            {showCopiedMessage && (
              <div className=' absolute top-[-32px] right-2 rounded-full p-1 text-xs bgbtn th animate-fadeInOut'>
                Copied
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleShare}
          className=' mt-4 px-2 w-full h-10 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header font-[400] text-sm dark:text-lightMode-header hover:bg-lightMode-buttonHover rounded-lg'
        >
          Share link
        </button>
      </div>
    </div>
  );
}

const helpData = [
  {
    id: 1,
    title: 'Points still not credited?',
    title2: 'Learn more about point credit algorithm',
    data: 'Points are rewarded once two or more people verify the same price in same day. Points are then rewarded the following day to all user that meet the criteria of price verification.',
  },
  {
    id: 2,
    title: 'How to earn points?',
    title2: 'Get to know more ways to earn',
    data: 'FuelGo provide several ways to earn points, you can earn via providing real time gas prices, filling surveys about gas stations and also through inviting friends.',
  },
  {
    id: 3,
    title: 'App features',
    title2: 'Overview of all the features in the app',
    data: 'FuelGo provide real time gas prices of nearby gas station. We have sort features to match your preferences, also a map to see exact location of gas station. You are able to provide information about gas prices and gas station to earn points. Points could be used to redeem gift cards of your choice.',
  },
  {
    id: 4,
    title: 'How to invite friends',
    title2: 'Steps to send invitation link',
    data: "Navigate to profile, click on 'Invite friends' button in middle of profile nav. This will navigate to link area, you can either copy it to clipboard or share it directly.",
  },
  {
    id: 5,
    title: 'How to reedem points',
    title2: 'Steps to send invitation link',
    data: "Navigate to profile, click on 'Rewards' button in middle of profile nav. This will navigate to rewards page, you can redeem gift card, frame or avatar.",
  },
  {
    id: 6,
    title: 'How to change password',
    title2: 'Steps to change password ',
    data: "Navigate to profile, click on 'Sign out' button in bottom of profile nav. This will navigate to landing page, from there press get started and then navigate to login page, look for forget password link. Once you click the link, then enter your email. We will use your email address and send a change password link. Follow the link in email to change password.",
  },
];
