import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLvItems, getOwnedItems } from '../../api/reward';

export default function Frame() {
  const { user, token } = useAuth();
  const [frames, setFrames] = useState();
  const displayFrames = async () => {
    try {
      const lvFrames = await getLvItems('frame', token);
      const ownedFrames =
        (await getOwnedItems('frame', user.framesOwned, token)) || [];
      setFrames([...lvFrames, ...ownedFrames]);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    if (!user) return;
    displayFrames();
  }, [user]);
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {frames &&
          frames.map((frame) => {
            const isActive = frame.levelCap <= 3;

            return (
              <div key={frame.link} className={`${isActive ? '' : 'relative'}`}>
                <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
                  <div
                    style={{
                      backgroundImage: `url(${frame.link})`,
                      backgroundSize: 'cover', // Adjust as needed
                      backgroundPosition: 'center', // Adjust as needed
                      // Additional background properties can be added here
                    }}
                    className=' flex justify-center items-center size-[60px] rounded-full border-0 '
                  >
                    <div className='size-14 rounded-full tbg' />
                  </div>
                </div>
                {isActive || (
                  <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
                    <div className=' w0full h-full flex justify-center items-center th text-xs px-4 text-center'>
                      <div>
                        Unlocks at level
                        {frame.levelCap}
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
