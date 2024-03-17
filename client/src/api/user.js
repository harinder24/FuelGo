import serverLink from '../serverLink';
import axios from 'axios';

export const getUserData = async (token) => {
  try {
    const response = await axios.get(serverLink + '/user/getuserdata', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const userData = response.data.data;

    return userData;
  } catch (e) {
    throw new Error(e);
  }
};
export const addToFavorite = async (token, stationId) => {
  try {
    const response = await axios.post(
      serverLink + '/user/addfavorite',
      {
        placeId: stationId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteFromFavorite = async (token, stationId) => {
  try {
    const response = await axios.post(
      serverLink + '/user/deletefavourite',
      {
        placeId: stationId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
