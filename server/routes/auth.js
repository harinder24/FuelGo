
import express from 'express'
import { emailSignUp, otpValidation,otpResend} from '../controller/auth.js';
const authRouter = express.Router();


authRouter.post("/emailsignup", emailSignUp);
authRouter.post("/otpvalidation", otpValidation);
authRouter.post("/otpresend", otpResend);
// authRouter.post("/oAuth", oAuth);
// authRouter.post("/postAddress", addAdress);

export {authRouter}