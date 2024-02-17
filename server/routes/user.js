
import express from 'express'
import { sendUserData} from '../controller/user.js';
import validateToken from '../middleware/verifyToken.js';
const userRouter = express.Router();


userRouter.get("/getuserdata",validateToken, sendUserData);


export {userRouter}