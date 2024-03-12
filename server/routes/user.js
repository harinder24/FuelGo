import express from "express";
import {
  sendUserData,
  getGasStations,
  getGasStationData,
  addComment,
  editComment,
  deleteComment,
} from "../controller/user.js";
import validateToken from "../middleware/verifyToken.js";
const userRouter = express.Router();

userRouter.get("/getuserdata", validateToken, sendUserData);
userRouter.post("/getgasstations", getGasStations);
userRouter.get("/getgasstationdata/:id", validateToken, getGasStationData);
userRouter.post("/addcomment", validateToken, addComment);
userRouter.post("/editcomment", validateToken, editComment);
userRouter.post("/addcomment", validateToken, deleteComment);

export { userRouter };
