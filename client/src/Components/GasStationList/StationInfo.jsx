import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addToFavorite, deleteFromFavorite } from '../../api/user';

export default function StationInfo({
  setShowStationInfo,
  target,
  preferences,
}) {
  const navigate = useNavigate();
  const { user, token, updateUserData } = useAuth();
  const { placeId: id, name, profileImg, distanceFromUser, address } = target;

  const [isFavorite, setIsfavorite] = useState();
  const [rating, setRating] = useState();
  const [totalRating, setTotalRating] = useState();
  const [fuelPrice, setFuelPrice] = useState();
  const [fuelType, setFuelType] = useState();

  useEffect(() => {
    setIsfavorite(user.favourite?.includes(id));
    setRating(0);//target.fuelGoRating.rating
    setTotalRating(0 );//target.fuelGoRating.totalRating
    const sumOfRatings = target.reviews.reduce(
      (total, obj) => total + obj.rating,
      0
    );
    setRating(sumOfRatings / target.reviews.length);
  
    setFuelPrice(Object.values(target.price)[preferences[2]].price || '- -');
    const type = Object.keys(target.price)[preferences[2]];
    type == 'midGrade' ? setFuelType('mid-grade') : setFuelType(type);
  }, [target, preferences]);

  const handleAddFavorite = async () => {
    const { success, message } = await addToFavorite(token, id);

    if (!success) {
      alert(message);
      return;
    }
    setIsfavorite(true);
    await updateUserData(token);
  };
  const handleDeleteFavorite = async () => {
    const { success, message } = await deleteFromFavorite(token, id);

    if (!success) {
      alert(message);
      return;
    }
    setIsfavorite(false);
    await updateUserData(token);
  };
  return (
    <div className=' absolute bottom-4 left-4 w-[300px] bg max-[520px]:rounded-none rounded-lg z-[1] max-[520px]:w-full max-[520px]:bottom-0 max-[520px]:left-0'>
      <div className=' caret-transparent w-full rounded-lg max-[520px]:rounded-none border-[1px] max-[520px]:border-0 cborder flex justify-between p-4 '>
        <div className=' flex  flex-col w-full'>
          <div className='flex flex-row w-full items-center justify-between'>
            <div className='w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]   font-[400] th max-text-xl text-ellipsis whitespace-nowrap overflow-hidden'>
              {name}
            </div>
            <div
              onClick={() => setShowStationInfo(false)}
              className='  th  cursor-pointer'
            >
              <CloseIcon />
            </div>
          </div>
          <div className=' relative pt-2'>
            <img
              className=' w-[320px] h-[200px]   min-[520px]:aspect-video max-[500px]:w-full rounded-lg object-cover'
              src={profileImg}
              alt=''
            />
            <div className=' absolute top-0 right-0  p-2 rounded-full cursor-pointer text-darkMode-error'>
              {isFavorite ? (
                <FavoriteIcon onClick={handleDeleteFavorite} />
              ) : (
                <FavoriteBorderIcon onClick={handleAddFavorite} />
              )}
            </div>
          </div>
          <div className=' flex flex-col justify-center pt-2 '>
            <div className=' flex flex-col gap-y-2'>
              <div className=' flex flex-row justify-between items-center'>
                <div className='tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden'>
                  <div className=''>{distanceFromUser} - </div>
                  <div className=' text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]'>
                    {address}
                  </div>
                </div>
                <div className='p-[6px] rounded-full th sbg text-xs '>
                {Number(rating).toFixed(1)}
                </div>
              </div>
              <div className=' flex flex-row justify-between'>
                <div className='tp flex flex-row text-sm'>
                  <div className=''>$ {fuelPrice}/</div>
                  <div>{fuelType}</div>
                </div>
                <div
                  onClick={() =>
                    navigate(`/gs/${id}`, { state: { station: target } })
                  }
                  className='  tb text-sm hover:underline cursor-pointer'
                >
                  More info
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
