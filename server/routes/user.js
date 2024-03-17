import express from "express";
import {
  sendUserData,
  getGasStations,
  getGasStationData,
  addComment,
  editComment,
  deleteComment,
  addFavourite,
  deleteFavourite,
  editNameAndProfileImg,
  getFavouriteStations,
  purchaseGiftCard,
  purchaseFrame,
  purchaseAvatar,
  changeFrame,
  changeAvatar,
  getFriendInvitationLink,
} from "../controller/user.js";
import validateToken from "../middleware/verifyToken.js";
const userRouter = express.Router();

userRouter.get("/getuserdata", validateToken, sendUserData);
userRouter.post("/getgasstations", getGasStations);
userRouter.get("/getgasstationdata/:id", validateToken, getGasStationData);
userRouter.post("/addcomment", validateToken, addComment);
userRouter.post("/editcomment", validateToken, editComment);
userRouter.post("/addcomment", validateToken, deleteComment);
userRouter.post("/addfavorite", validateToken, addFavourite);
userRouter.post("/deletefavourite", validateToken, deleteFavourite);
userRouter.post("/editnameandprofileimg", validateToken, editNameAndProfileImg);
userRouter.post("/getfavouritestations", validateToken, getFavouriteStations);
userRouter.post("/purchasegiftcard", validateToken, purchaseGiftCard);
userRouter.post("/purchaseframe", validateToken, purchaseFrame);
userRouter.post("/purchaseavatar", validateToken, purchaseAvatar);
userRouter.post("/changeframe", validateToken, changeFrame);
userRouter.post("/changeavatar", validateToken, changeAvatar);
userRouter.post("/getfriendinvitationlink", validateToken, getFriendInvitationLink);

export { userRouter };
