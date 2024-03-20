import { useEffect, useState } from 'react';
import { getShopItems } from '../../api/reward';
import { useAuth } from '../../context/AuthContext';
import RewardCard from './RewardCard';

export default function Avatars({ point, setModal, setShowModal }) {
  const { user, token } = useAuth();
  const [avatars, setAvatars] = useState();
  const getAvatars = async () => {
    try {
      const shopAvatars = await getShopItems('avatar', token);
      setAvatars(shopAvatars);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getAvatars();
  }, []);
  const handleOpenModal = (icon) => {
    setModal({
      card: <RewardCard reward={{ icon }} sm />,
      price: 25,
      isAvailable: point >= 25,
      type: 'avatar',
    });
    setShowModal(true);
  };
  return (
    <>
      <h4 className='th text-md my-8'>Avatars</h4>
      <ul className='flex w-full overflow-auto snap-x '>
        {avatars &&
          avatars.map((avatar, i) => {
            const icon = (
              <img className=' rounded-full size-10' src={avatar.link} alt='' />
            );
            return (
              <li
                onClick={() => handleOpenModal(icon)}
                key={'avatar' + i}
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
