import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import Loading from "../Loading";
export default function Otp({  setOtpPopUp,setIsOtpValid,email }) {
  const [otp, setOtp] = useState("");
  const [nineToZero, setNineToZero] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const OtpPopUpChecker = (e) => {
   
    if (e && e.target) {
      if (e.target.id === "otpCard") {
        setOtpPopUp(false);
      }
    }
  };
  function sleep(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  useEffect(() => {
    nineToZeroHandler();
  }, []);
  async function resendHandler(){
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/otpresend",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const {success} = response.data
      if(success === true){
        
      setNineToZero(9);
      nineToZeroHandler();
        
      }
    } catch (error) {
      console.error("Network error:", error);
    }
   
  }
  async function nineToZeroHandler() {
    let num = 9;
    while (num !== -1) {
      setNineToZero(num);
      num--;
      await sleep(1000);
    }
  }
  async function submitOtp() {
    setIsLoading(true)
setError("")
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/otpvalidation",
        {
          email: email,
          otp: otp
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const {success, error} = response.data
      setIsLoading(false)
      if (success === false) {
        setError(error)
      } else if(success === true){
     
        setIsOtpValid(true)
        setOtpPopUp(false)
        
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Network error:", error);
    }
  

       
   
  }
  
  return (
    <>
    {isLoading &&     <div className=" absolute top-0 w-screen h-screen z-[50]"> <Loading/></div>}

   
    <div
      onClick={(e) => OtpPopUpChecker(e)}
      className=" absolute top-0 right-0 z-40 "
    >
      <div
        id="otpCard"
        className="w-screen h-screen flex justify-center items-center cursor-pointer"
      >   <div className="">

        <div className=" relative z-[2] cursor-default">
            <div onClick={()=>setOtpPopUp(false)} className=" absolute top-1 right-1 cursor-pointer"><CloseIcon className=" text-lightMode-header dark:text-darkMode-header" /></div>
       
            <div className=" p-4 bg-lightMode-sbg dark:bg-darkMode-sbg rounded-lg flex flex-col max-w-[400px] gap-y-4 max-[640px]:h-screen max-[640px]:max-w-full max-[640px]:w-screen max-[640px]:rounded-none ">
              <div className=" text-2xl text-lightMode-header dark:text-darkMode-header">
                Otp verification
              </div>
              <div className=" mb-4 text-lg text-lightMode-p dark:text-darkMode-p ">
                Enter the 4-digit code sent you at: Email.email@email.com
              </div>
              <div>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  shouldAutoFocus={true}
                  renderSeparator={
                    <span className=" text-lightMode-tbg text:border-darkMode-tbg text-2xl font-bold leading-none ">
                      -
                    </span>
                  }
                  containerStyle={
                    "w-full max-w-[350px] flex flex-row justify-evenly"
                  }
                  inputStyle={
                    "bg-lightMode-tbg dark:bg-darkMode-tbg border-lightMode-border dark:border-darkMode-border h-[52px] flex-1 max-w-[52px] border-[1px] text-lightMode-header dark:text-darkMode-header"
                  }
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="text-[12px]  text-lightMode-p dark:text-darkMode-p ">
                Tip: Make sure to check your inbox or spam folders
              </div>
              {error && (
            <div className="w-full text-center text-sm text-lightMode-error dark:text-darkMode-error ">
              {error}
            </div>
          )}
              <div className="hidden flex-1 max-[640px]:flex"></div>
              <div className=" mt-4  w-full flex flex-row justify-between items-center">
                {nineToZero === 0 ? (
                  <button
                  onClick={()=> resendHandler()}
                    className=" rounded-2xl h-8 px-[10px] bg-lightMode-tbg dark:bg-darkMode-tbg
            hover:bg-lightMode-bg dark:hover:bg-darkMode-bg border-lightMode-border dark:border-darkMode-border leading-none text-sm font-semibold text-lightMode-p dark:text-darkMode-p"
                  >
                    Resend
                  </button>
                ) : (
                  <div className="rounded-2xl h-8 px-[10px] bg-lightMode-tbg dark:bg-darkMode-tbg
                   border-lightMode-border dark:border-darkMode-border leading-none text-sm font-semibold text-lightMode-p dark:text-darkMode-p flex justify-center items-center">
                    <div>Resend (0:0{nineToZero})</div>
                  </div>
                )}

                <button onClick={()=> submitOtp()} className=" rounded-2xl h-8 px-[10px] bg-lightMode-button hover:bg-lightMode-buttonHover border-lightMode-border dark:border-darkMode-border leading-none text-sm font-semibold text-lightMode-header dark:text-darkMode-header">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
}
{
 
}
