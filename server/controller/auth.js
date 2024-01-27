import authModel from "../model/auth.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

async function formatVerification(email, password) {
  if (email === "") {
    return {
      error: "Email address field is empty",
      success: false,
      fault: "email",
    };
  }
  if (!emailFormat.test(email)) {
    return {
      error: "Invalid email address",
      success: false,
      fault: "email",
    };
  }
  if (password === "") {
    return {
      error: "Password field is empty",
      success: false,
      fault: "password",
    };
  }
  if (password.length < 6) {
    return {
      error: "Password must be 6 or more characters long",
      success: false,
      fault: "password",
    };
  }
  // If all verifications pass
  return {
    success: true,
  };
}

const emailSignUp = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const verificationResult = await formatVerification(email, password);

  if (!verificationResult.success) {

    return res.status(200).json(verificationResult);
  }
  const otpCode = generateRandom4DigitNumber();
  const encryptPassword = await bcrypt.hash(password, 10);
  const currentTimestamp = Date.now();

  try {
    let foundUser = await authModel.findOne({ email: email });

    if (foundUser) {
      if(foundUser.authType){
      if(foundUser.authType !== "email"){
        return res.status(201).json({
          error: `Email address is already linked to ${foundUser.authType} account`,
          success: false,
          fault: "none",
        });
      }
    }
      if (foundUser.isInitAuthComplete === true) {
        return res.status(201).json({
          error: "Email address is already linked to an account",
          success: false,
          fault: "none",
        });
      } else {
        foundUser.password = encryptPassword;
        foundUser.otp = otpCode;
        foundUser.isOtpValid = true;
        foundUser.otpTimeStamp = currentTimestamp;
        foundUser.isOtpIncorrect = 0;
        await foundUser.save();
        sendEmail(email, "FuelGo OTP", otpCode);
        return res.status(202).json({ success: true });
      }
    } else {
      const newUser = new authModel({
        email: email,
        password: encryptPassword,
        authType: "email",
        otp: otpCode,
        isOtpValid: true,
        otpTimeStamp: currentTimestamp,
        isOtpIncorrect: 0,
        isInitAuthComplete: false,
      });

      await newUser.save();
      sendEmail(email, "FuelGo OTP", otpCode);
      return res.status(202).json({ success: true });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};



const otpResend = async (req, res) => {
  const { email } = req.body;

  const otpCode = generateRandom4DigitNumber();
 
  const currentTimestamp = Date.now();
  try {
    let foundUser = await authModel.findOne({ email: email });

    if (foundUser) {
        foundUser.otp = otpCode;
        foundUser.isOtpValid = true;
        foundUser.otpTimeStamp = currentTimestamp;
        foundUser.isOtpIncorrect = 0;
        await foundUser.save();
        sendEmail(email, "FuelGo OTP", otpCode);
        return res.status(202).json({ success: true });
      }
    
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const otpValidation = async (req, res) => {
  const { email, otp } = req.body;
  const currentTimestamp = Date.now();
  try {
    let foundUser = await authModel.findOne({ email: email });

    if (foundUser) {
      if (foundUser.isOtpValid === true) {
        if (
          isNextTimestampWithin30Minutes(
            currentTimestamp,
            foundUser.otpTimeStamp
          )
        ) {
          
          if (foundUser.isOtpIncorrect <= 3) {
            let incorrect = foundUser.isOtpIncorrect;
            incorrect = incorrect + 1;
            foundUser.isOtpIncorrect = incorrect;
            if (foundUser.otp === parseInt(otp)) {
              foundUser.isOtpValid = false;
              await foundUser.save();

              // const token = jwt.sign({email:foundUser.email}, process.env.TOKEN_SECRET);

              return res.status(202).json({ success: true });
            } else {
              await foundUser.save();
              return res
                .status(201)
                .json({ success: false, error: "Invalid Code" });
            }
          } else {
            foundUser.isOtpValid = false;
            await foundUser.save();
            return res
              .status(201)
              .json({
                success: false,
                error: "Code expired after multiple failed entries",
              });
          }
        } else {
          foundUser.isOtpValid = false;
          await foundUser.save();
          return res
            .status(201)
            .json({ success: false, error: "Invalid or expired Code" });
        }
      } else {
        return res
          .status(201)
          .json({ success: false, error: "Invalid or expired Code" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

function isNextTimestampWithin30Minutes(currentTimestamp, prevTimestamp) {
  prevTimestamp = prevTimestamp + 30 * 60 * 1000;

  if (currentTimestamp <= prevTimestamp) {
    return true;
  } else {
    return false;
  }
}

function generateRandom4DigitNumber() {
  const randomNumber = Math.floor(Math.random() * 10000);

  const fourDigitNumber = randomNumber.toString().padStart(4, "0");

  return fourDigitNumber;
}
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.gmail,
    pass: process.env.gmailPassword,
  },
});

function sendEmail(toEmail, subject, message) {
  const mailOptions = {
    from: process.env.gmail,
    to: toEmail,
    subject: subject,
    text: message,
    html: ` <html>
        <head>
          <style>
          
            body {
              font-family: Arial, sans-serif;
              background-color: black;
              padding: 20px;
              color: black;
            }
            .container {
            
              border-radius: 5px;
              padding: 20px;
            }
            @media (prefers-color-scheme: dark) {
              .body {
                color: white; 
              }
            }
            .green{
              color: rgb(14,165,233)
            }
            p {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              color: #15803d;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Fuel<span class="green">Go</span></h1>
            <p>Your OTP code is:</p>
            <p class="otp-code">${message}</p>
            <p>This code will expire in 30 minutes</p>
          </div>
        </body>
      </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
export { emailSignUp, otpValidation,otpResend };
