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
  } catch (error) {
    throw new Error(error.message);
  }
};
export const commentLike = async (token, placeId, commentUserEmail) => {
  try {
    const response = await axios.post(
      serverLink + '/user/likecomment',
      {
        placeId: placeId,
        commentUserEmail: commentUserEmail,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const commentUnLike = async (token, placeId, commentUserEmail) => {
  try {
    const response = await axios.post(
      serverLink + '/user/unlikecomment',
      {
        placeId: placeId,
        commentUserEmail: commentUserEmail,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addComment = async (
  token,
  placeId,
  rating,
  photosVideos,
  comment
) => {
  try {
    const response = await axios.post(
      serverLink + '/user/addcomment',
      {
        placeId: placeId,
        rating: rating,
        photosVideos: photosVideos,
        comment: comment,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const editComment = async (
  token,
  placeId,
  rating,
  photosVideos,
  comment
) => {
  try {
    const response = await axios.post(
      serverLink + '/user/editcomment',
      {
        placeId: placeId,
        rating: rating,
        photosVideos: photosVideos,
        comment: comment,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteComment = async (token, placeId) => {
  try {
    const response = await axios.post(
      serverLink + '/user/deletecomment',
      {
        placeId: placeId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};
export const updatePrice = async (
  token,
  stationId,
  lat,
  lng,
  diesel,
  midGrade,
  premium,
  regular
) => {
  try {
    const response = await axios.post(
      serverLink + '/user/updategasprices',
      {
        placeId: stationId,
        lat: lat,
        lng: lng,
        diesel: diesel,
        midGrade: midGrade,
        premium: premium,
        regular: regular,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

export const changeUsingItem = async (type, token, link) => {
  try {
    const response = await axios.post(
      serverLink + `/user/change${type}`,
      {
        link,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const { success, message, data } = response.data;
    if (!success) throw new Error(message);
    return data;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};
