import React, { useState, useRef, useEffect } from "react";
import { TextField, Grid, ThemeProvider } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Button from "../Button";
import theme from "../Theme/Mui";
import googleImg from "../../../public/google.png";
import facebookImg from "../../../public/facebook.png";
import BgBlackOpacity from "../BgBlackOpacity";
import Otp from "./Otp";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
export default function AuthPageUiWrapper({ isLogin = true }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorEmailBorder, setErrorEmailBorder] = useState(false);
  const [errorPasswordBorder, setErrorPasswordBorder] = useState(false);
  const [otpPopUp, setOtpPopUp] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const handleLogin = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setErrorEmailBorder(false);
    setErrorPasswordBorder(false);
    if (isLogin) {
      handleLogin();
    } else {
      setOtpPopUp(true);
    }
  };

  const handlesignup = (e) => {
    setOtpPopUp(true);
  };
  return (
    <>
      <AuthPageUiWrapperComp>
        {isOtpValid ? (
          <UserDataForm />
        ) : (
          <AuthForm
            errorEmailBorder={errorEmailBorder}
            errorPasswordBorder={errorPasswordBorder}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            isLogin={isLogin}
            handleSubmit={handleSubmit}
            error={error}
          />
        )}
      </AuthPageUiWrapperComp>

      {otpPopUp && (
        <>
          <BgBlackOpacity>
            {" "}
            <Otp
              setIsOtpValid={setIsOtpValid}
              isLogin={isLogin}
              setOtpPopUp={setOtpPopUp}
            />
          </BgBlackOpacity>
        </>
      )}
    </>
  );
}

function ConfirmationPopUp({ setPopUp }) {
  const ConfirmationPopUpChecker = (e) => {
    if (e && e.target) {
      if (e.target.id === "ConfirmationPopUp") {
        setPopUp(false);
      }
    }
  };
  return (
    <div
      onClick={(e) => ConfirmationPopUpChecker(e)}
      className=" absolute top-0 right-0  "
    >
      <div
        id="ConfirmationPopUp"
        className="w-screen h-screen flex justify-center items-center cursor-pointer"
      >
        {" "}
        <div className="max-[640px]:absolute bottom-0">
          <div className=" relative z-[2] cursor-default">
            <div
              onClick={() => setPopUp(false)}
              className=" absolute top-1 right-1 cursor-pointer"
            >
              <CloseIcon className=" text-lightMode-header dark:text-darkMode-header" />
            </div>

            <div className=" py-4 bg-lightMode-sbg dark:bg-darkMode-sbg rounded-lg flex flex-col w-[400px] gap-y-4  max-[640px]:max-w-full max-[640px]:w-screen max-[640px]:rounded-b-none ">
              <div className="w-full text-center text-lg   text-lightMode-header dark:text-darkMode-header border-b-[1px] border-lightMode-border dark:border-darkMode-border pb-4">
                Profile Image
              </div>
              <div className="w-full px-4 flex flex-col gap-y-4 ">
                <Button data={"Update Image"}></Button>
                <button
                  className="px-2 w-full h-10 bg-lightMode-tbg dark:bg-darkMode-tbg
                   border-lightMode-border dark:border-darkMode-border  text-lightMode-p dark:text-darkMode-p  font-medium rounded-sm hover:bg-lightMode-bg dark:hover:bg-darkMode-bg"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDataForm() {
  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState("");
  const [img, setImg] = useState(
    "https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg"
  );
  const [userName, setUserName] = useState("");
  const [errorNameBorder, setErrorNameBorder] = useState(false);
  return (
    <>
      {popUp && (
        <BgBlackOpacity>
          {" "}
          <ConfirmationPopUp setPopUp={setPopUp} />
        </BgBlackOpacity>
      )}
      <h2 className=" text-white text-2xl font-semibold">Account Info</h2>
      <h4 className=" text-lightMode-p dark:text-darkMode-p py-3 pb-3">
        Profile Image (optional)
      </h4>
      <div className=" relative w-fit mb-4">
        <img className=" size-[100px] rounded-full" src={img} alt="" />
        <div
          onClick={() => setPopUp(true)}
          className=" absolute bottom-0 right-[-4px] rounded-full bg-white p-2 shadow-md cursor-pointer"
        >
          <EditIcon />
        </div>
      </div>
      <form noValidate>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorNameBorder}
                variant="outlined"
                fullWidth
                className=" caret-white bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p"
                size="small"
                color="primary"
                label="Name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          {error && (
            <div className="w-full text-center mt-2 text-sm text-lightMode-error dark:text-darkMode-error ">
              {error}
            </div>
          )}
          <div className="mt-4"></div>

          <Button type="submit" data="Finish" />
        </ThemeProvider>
      </form>
    </>
  );
}

function AuthForm({
  errorEmailBorder,
  errorPasswordBorder,
  email,
  password,
  setEmail,
  setPassword,
  isLogin,
  handleSubmit,
  error,
}) {
  const navigate = useNavigate();
  return (
    <>
      <h2 className=" text-white text-2xl font-semibold">
        {isLogin ? "Welcome back!" : "Create an account"}
      </h2>
      <h4 className=" text-lightMode-p dark:text-darkMode-p py-2 pb-3">
        {isLogin
          ? "Sign in to your account"
          : "Create an account to enjoy more features"}
      </h4>

      <form onSubmit={handleSubmit} noValidate>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorEmailBorder}
                variant="outlined"
                fullWidth
                className=" caret-white bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p"
                size="small"
                color="primary"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorPasswordBorder}
                className=" bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p caret-white"
                size="small"
                color="primary"
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <div className="pt-3"></div>
          {error && (
            <div className="w-full text-center pb-1 text-sm text-lightMode-error dark:text-darkMode-error ">
              {error}
            </div>
          )}
          <div className="w-full text-center text-lightMode-p dark:text-darkMode-p pb-3 cursor-pointer">
            {isLogin && (
              <span onClick={() => navigate("/forgetpassword")}>
                Forget your password?
              </span>
            )}
          </div>
          <Button type="submit" data="Submit" />
        </ThemeProvider>
      </form>
      <h4 className=" text-lightMode-p dark:text-darkMode-p py-3 pb-3 flex flex-row w-full items-center justify-center">
        {isLogin ? (
          <h4 className="flex flex-row">
            Don't have an account?{" "}
            <h4
              onClick={() => navigate("/signup")}
              className="pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer"
            >
              {" "}
              Register Now{" "}
            </h4>
          </h4>
        ) : (
          <h4 className="flex flex-row">
            Already have an account?{" "}
            <h4
              onClick={() => navigate("/login")}
              className="pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer"
            >
              Login Now{" "}
            </h4>
          </h4>
        )}
      </h4>

      <div className="w-full relative mt-1">
        <div className="absolute top-0 border-b-[1px] border-lightMode-p dark:border-darkMode-p w-full">
          <div className="absolute top-[-12px] text-lightMode-p dark:text-darkMode-p w-full">
            <div className="w-full flex flex-row justify-center">
              {" "}
              <div className=" bg-lightMode-sbg dark:bg-darkMode-sbg px-1">
                Or
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-x-8 pt-5">
        <img
          className="w-10  cursor-pointer bg-[#eee] rounded-full"
          src={googleImg}
          alt=""
        />
        <img
          className="w-10 cursor-pointer  rounded-full"
          src={facebookImg}
          alt=""
        />
      </div>
    </>
  );
}

export function AuthPageUiWrapperComp({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [name, setName] = useState('FUELGO');
  const [interval, setInterval] = useState(true);

function setNewName(n) {
  setName(n);
}

async function updateNameWithDelay(charArray, charArray2, charArray3) {
  for (let i = 0; i < charArray.length ; i++) {
    
    for (let j = 0; j < charArray2.length; j++) {
     let found = false
     
      if (charArray3[i] === charArray2[j]) {
        charArray[i] = charArray2[j];
        const newName2 = charArray.join('');
        await sleep(30);
        found = true
        setName(newName2);
        break
      }else if(!found){
      
       let newArr = [...charArray]
       newArr[i] = charArray2[j];
        const newName3 = newArr.join('');
        await sleep(30);
        
        setName(newName3);
      }
    }
  }
}

function handleMouseEnter() {
  if (interval) {
    setInterval(false); // Set interval to false to indicate function is running
    let oldname = "FUELGO";
    let charArray2 = letters.split('');
    let charArray3 = oldname.split('');
    let newName = ""
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charArray2.length);
      newName += charArray2[randomIndex];
    }
    
    let charArray = newName.split('');

    setNewName(newName);
    

    updateNameWithDelay(charArray, charArray2, charArray3)
      .then(() => {
        setInterval(true); // Set interval back to true when function is done
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setInterval(true); // Set interval back to true if there's an error
      });
  }
}


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  return (
    <>
      <div className=" absolute top-0 z-10">
        <div className="relative w-screen h-screen overflow-hidden">

          <div
            className="glowing-cursor"
            style={{ left: mousePosition.x, top: mousePosition.y }}
          >
          
          </div>
        </div>
      </div>
      <div className="absolute top-3 w-screen text-center min-[640px]:hidden z-30">
        {" "}
        <WhatshotIcon sx={{ color: "rgb(14,165,233)", fontSize: "50px" }} />
      </div>
      <div className=" w-screen min-h-screen h-auto bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center ">
        <div  className=" absolute  z-30">
          <div className="px-4">
        <div className=" w-[800px] max-[840px]:w-[calc(100vw-32px)] h-[500px] bg-lightMode-sbg dark:bg-darkMode-sbg rounded-lg border-lightMode-border dark:border-darkMode-border border-[3px] flex flex-row overflow-hidden">
        <div onMouseEnter={handleMouseEnter} className=" relative flex-1 w-full h-full max-[640px]:hidden overflow-hidden">
        <div class="screen-image"></div>  
          <div className="screen-overlay"></div>
          <div className=" absolute z-30 top-0 w-full h-full p-4">
            <div className="w-full h-full border-[3px] border-lightMode-border rounded-lg flex flex-col items-center justify-end">
            <WhatshotIcon
                sx={{ color: "rgb(14,165,233)", fontSize: "100px" }}
              />
              <div className="flex flex-row  justify-center gap-x-1">
              <div className=" blur-[2px] bg-lightMode-button  w-10 h-[2px] my-6"></div>
              <div className=" blur-[2px] bg-lightMode-button  w-10 h-[2px] my-6"></div>
              </div>
              <div className="FuelGoLogoAuthWrap">
              <div 
               className="FuelGoLogoAuth pb-6" data-value="FuelGo">{name}</div>
              </div>
            </div>
          </div>
          </div>
         
          <div className="border-lightMode-border dark:border-darkMode-border border-r-[3px] max-[640px]:hidden">

          </div>
          <div className="flex-1 flex flex-col ">
            <div className="p-4"> {children}</div>
           
            </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export function ForgetPasswordComp({ isLogin = true }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorEmailBorder, setErrorEmailBorder] = useState(false);
  const [otpPopUp, setOtpPopUp] = useState(false);

  const [isOtpValid, setIsOtpValid] = useState(false);
  const submitEmail = (e) => {
    e.preventDefault();
    setOtpPopUp(true);
  };
  return (
    <>
      {/* {otpPopUp && (
        <>
          <BgBlackOpacity>
            {" "}
            <Otp
              setIsOtpValid={setIsOtpValid}
              isLogin={isLogin}
              setOtpPopUp={setOtpPopUp}
            />
          </BgBlackOpacity>
        </>
      )} */}
      <AuthPageUiWrapperComp>
        <ForgetPasswordGetEmail
          submit={submitEmail}
          email={email}
          error={error}
          errorEmailBorder={errorEmailBorder}
        />
      </AuthPageUiWrapperComp>
    </>
  );
}

function ForgetPasswordGetEmail({ email, error, errorEmailBorder, submit }) {
  const navigate = useNavigate();

  return (
    <>
      <h2 className=" text-white text-2xl font-semibold">Forget password?</h2>
      <h4 className=" text-lightMode-p dark:text-darkMode-p py-2 pb-3">
        We will send an email, follow the link in email to change password
      </h4>
      <form onSubmit={submit} noValidate>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorEmailBorder}
                variant="outlined"
                fullWidth
                className=" caret-white bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p"
                size="small"
                color="primary"
                label="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          {error && (
            <div className="w-full text-center mt-2 text-sm text-lightMode-error dark:text-darkMode-error ">
              {error}
            </div>
          )}
          <div className="mt-4"></div>

          <Button type="submit" data="Submit" />
        </ThemeProvider>
      </form>
      <h4
        onClick={() => navigate("/login")}
        className=" cursor-pointer w-full text-center text-lightMode-p dark:text-darkMode-p py-2 pb-3"
      >
        Back to log in
      </h4>
    </>
  );
}

export function ChangePassWordComp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorPasswordBorder, setErrorEmailBorder] = useState(false);
  const [errorConfirmPasswordBorder, setErrorConfirmPasswordBorder] =
    useState(false);
  const navigate = useNavigate();
  return (
    <AuthPageUiWrapperComp>
      <h2 className=" text-white text-2xl font-semibold">Change password</h2>
      <h4 className=" text-lightMode-p dark:text-darkMode-p py-2 pb-3">
        Password must contain one uppercase & lowercase letter, a number and
        must be 6 characters long.
      </h4>
      <form noValidate>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorPasswordBorder}
                variant="outlined"
                fullWidth
                className=" caret-white bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p"
                size="small"
                color="primary"
                label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorConfirmPasswordBorder}
                variant="outlined"
                fullWidth
                className=" caret-white bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p"
                size="small"
                color="primary"
                label="confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          {error && (
            <div className="w-full text-center mt-2 text-sm text-lightMode-error dark:text-darkMode-error ">
              {error}
            </div>
          )}
          <div className="mt-4"></div>

          <Button type="submit" data="Submit" />
        </ThemeProvider>
      </form>
      <h4
        onClick={navigate("/login")}
        className=" cursor-pointer w-full text-center text-lightMode-p dark:text-darkMode-p py-2 pb-3"
      >
        Back to log in
      </h4>
    </AuthPageUiWrapperComp>
  );
}
