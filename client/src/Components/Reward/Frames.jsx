import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getShopItems } from '../../api/reward';
import RewardCard from './RewardCard';

export default function Frames({ point, setModal, setShowModal }) {
  const { user, token } = useAuth();
  const [frames, setFrames] = useState();
  const getFrames = async () => {
    try {
      const shopFrames = await getShopItems('frame', token);
      setFrames(shopFrames);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getFrames();
  }, []);
  const handleOpenModal = (icon) => {
    setModal({
      card: <RewardCard reward={{ icon }} sm />,
      price: 25,
      isAvailable: point >= 25,
      type: 'frame',
    });
    setShowModal(true);
  };

  return (
    <>
      <h4 className='th text-md my-8'>Frames</h4>
      <ul className='flex w-full overflow-auto snap-x '>
        {frames &&
          frames.map((frame, i) => {
            const icon = (
              <div
                style={{
                  backgroundImage: `url(${frame.link})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className=' flex justify-center items-center size-10 rounded-full border-0 '
              >
                <div className='w-[93%] h-[93%] rounded-full bg-[#182335]' />
              </div>
            );
            return (
              <li
                onClick={() => handleOpenModal(icon)}
                key={'frame' + i}
                className=' mr-3 snap-start h-40'
              >
                <RewardCard md reward={{ icon }} price='25' point={point} />
              </li>
            );
          })}
      </ul>
    </>
  );
}
