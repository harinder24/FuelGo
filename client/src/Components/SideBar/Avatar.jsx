import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLvItems } from '../../api/reward';

export default function Avatar() {
  const { user, token } = useAuth();
  const [avatars, setAvatars] = useState();
  const getAvatars = async () => {
    try {
      const lvAvatars = await getLvItems('avatar', token);
      setAvatars(lvAvatars);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getAvatars();
  }, []);
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {/* {avatars&&avatars.map((avatar) => (
          <div
            key={item.url + index}
            className={`${item.isActive ? '' : 'relative'}`}
          >
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
        ))} */}
        {avatars &&
          avatars.map((avatar) => {
            const isActive = avatar.levelCap <= 3;

            return (
              <div
                key={avatar.link}
                className={`${isActive ? '' : 'relative'}`}
              >
                <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
                  <img
                    className='size-[60px] rounded-full  cursor-pointer object-cover relative'
                    src={avatar.link}
                    alt=''
                  />
                </div>
                {isActive || (
                  <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
                    <div className=' w0full h-full flex justify-center items-center th text-xs px-4 text-center'>
                      <div>
                        Unlocks at level
                        {avatar.levelCap}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
