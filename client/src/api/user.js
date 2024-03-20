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
export const editUserInfo = async (userId, token, name, newProfileImg) => {
  try {
    const profileImg =
      typeof newProfileImg == 'string'
        ? newProfileImg
        : await uploadProfileImg(userId, newProfileImg);
    const response = await axios.post(
      serverLink + '/user/editnameandprofileimg',
      {
        name,
        profileImg,
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
const uploadProfileImg = async (userId, file) => {
  const data = new FormData();

  data.append('folder', userId);
  data.append('file', file);
  data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

  try {
    const response = await axios.post(
      import.meta.env.VITE_CLOUDINARY_URL,
      data
    );
    return response.data.url;
  } catch (error) {
    throw new Error(error);
  }
};
export const getFriendInvitationLink = async (token) => {
  try {
    const response = await axios.post(
      serverLink + '/user/getfriendinvitationlink',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    const { success, reason, message, data } = response.data;
    if (!success) {
      throw new Error(message || reason);
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
