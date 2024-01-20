import React,{useState} from 'react'
import { TextField, Grid, ThemeProvider } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Button from "../Button";
import theme from "../Theme/Mui";
import googleImg from "../../../public/google.png"
import facebookImg from "../../../public/facebook.png"
export default function AuthPageUiWrapper({ isLogin = true }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, such as making API calls or validating inputs
    console.log("Email:", email, "Password:", password);
  };
  return (
    <>
    <div className='absolute top-3 w-screen text-center min-[640px]:hidden'> <WhatshotIcon
              sx={{ color: "rgb(14,165,233)", fontSize: "50px" }}
            /></div>
    <div className="w-screen min-h-screen h-auto bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center">
      <div className="mx-4 w-[800px] h-[500px] bg-lightMode-sbg dark:bg-darkMode-sbg rounded-lg border-lightMode-border dark:border-darkMode-border border-[1px] flex flex-row">
        <div className=" relative flex-1 w-full h-full max-[640px]:hidden">
          <div className="flex-1 flex w-full h-full flex-row items-center justify-center border-lightMode-border dark:border-darkMode-border border-r-[1px] ">
            <WhatshotIcon
              sx={{ color: "rgb(14,165,233)", fontSize: "300px" }}
            />
          </div>
          <div className=" absolute top-0 w-full flex items-center justify-center pt-4">
            <div className="font-lg text-2xl text-lightMode-header">Fuel</div>
            <div className="font-medium text-2xl text-[rgb(14,164,233)]">
              Go
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4">
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
                    error={false}
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
                    error={false}
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
              <div className="w-full text-center text-lightMode-p dark:text-darkMode-p pb-3 cursor-pointer">
                {isLogin && "Forget your password?"}
              </div>
              <Button type="submit" data="Submit" />
            </ThemeProvider>
          </form>
          <h4 className=" text-lightMode-p dark:text-darkMode-p py-3 pb-3 flex flex-row w-full items-center justify-center">
            {isLogin ? (
              <h4 className="flex flex-row">
                Don't have an account?{" "}
                <h4 className="pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer">
                  {" "}
                  Register Now{" "}
                </h4>
              </h4>
            ) : (
              <h4 className="flex flex-row">
                Already have an account?{" "}
                <h4 className="pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer">
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
                <img className="w-10  cursor-pointer bg-[#eee] rounded-full" src={googleImg} alt="" />
                <img className="w-10 cursor-pointer  rounded-full" src={facebookImg} alt="" />
            </div>

        </div>
      </div>
    </div>
    </>
  )
}
