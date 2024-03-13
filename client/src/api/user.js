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
