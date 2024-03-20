import serverLink from '../serverLink';
import axios from 'axios';

// const getFrames = async (token) => {
//   try {
//     const response = await axios.get(serverLink + '/user/getallframe', {
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
// export const getLvFrames = async (token) => {
//   try {
//     const { success, message, data } = await getFrames(token);
//     if (!success) {
//       throw new Error(message);
//     }

//     const lvFrames = data.filter((frame) => !frame.isPurchaseable);
//     return lvFrames;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
// export const getPurchaseableFrames = async (token) => {
//   try {
//     const { success, message, data } = await getFrames(token);
//     if (!success) {
//       throw new Error(message);
//     }

//     const purchaseableFrames = data.filter((frame) => frame.isPurchaseable);
//     return purchaseableFrames;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
// const getAvatars = async (token) => {
//   try {
//     const response = await axios.get(serverLink + '/user/getallavatar', {
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
// export const getLvAvatars = async (token) => {
//   try {
//     const { success, message, data } = await getAvatars(token);
//     if (!success) {
//       throw new Error(message);
//     }

//     const lvAvatars = data.filter((avatar) => !avatar.isPurchaseable);
//     return lvAvatars;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
// export const getPurchaseableAvatars = async (token) => {
//   try {
//     const { success, message, data } = await getAvatars(token);
//     if (!success) {
//       throw new Error(message);
//     }

//     const purchaseableAvatars = data.filter((avatar) => avatar.isPurchaseable);
//     return purchaseableAvatars;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
const getItems = async (type, token) => {
  try {
    const response = await axios.get(serverLink + `/user/getall${type}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const getLvItems = async (type, token) => {
  try {
    const { success, message, data } = await getItems(type, token);
    if (!success) {
      throw new Error(message);
    }

    const lvItems = data.filter((item) => !item.isPurchaseable);
    return lvItems;
  } catch (error) {
    throw new Error(error);
  }
};
export const getShopItems = async (type, token) => {
  try {
    const { success, message, data } = await getItems(type, token);
    if (!success) {
      throw new Error(message);
    }

    const purchaseableItems = data.filter((item) => item.isPurchaseable);
    return purchaseableItems;
  } catch (error) {
    throw new Error(error);
  }
};
