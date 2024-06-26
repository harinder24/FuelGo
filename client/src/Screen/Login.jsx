import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Components/UI/CustomButton';
import { emailLogin } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import GoogleLogin from '../Components/Login/GoogleLogin';
import LoginForm from '../Components/Login/LoginForm';

export default function Login() {
  const { updateUserData } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const {setIsLoading} = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError();
    setPasswordError();

    if (!email) {
      setEmailError('Email is empty');
      return;
    }
    if (!password) {
      setPasswordError('Password is empty');
      return;
    }
    setIsLoading(true)
    try {
      const { token, error, fault } = await emailLogin(email, password);
      setIsLoading(false)
      if (error) {
        fault == 'password' ? setPasswordError(error) : setEmailError(error);
        return;
      }
      await updateUserData(token);
      navigate('/home'); 
    } catch (err) {
      setIsLoading(false)
      alert(err);
    }
  };
  return (
    <div className='h-full '>
      <h2 className=' text-white text-2xl font-semibold mb-4'>Welcome back!</h2>

      <form onSubmit={handleSubmit} noValidate>
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
        />

        <div className='w-full text-end text-lightMode-button dark:text-darkMode-button text-sm pb-3 cursor-pointer'>
          <span onClick={() => navigate('/accounts/forgetpassword')}>
            Forget password?
          </span>
        </div>
        <CustomButton />
      </form>
      <div className=' text-lightMode-p text-sm dark:text-darkMode-p mt-4 mb-4 flex flex-row w-full items-center justify-center'>
        <h4 className='flex flex-row'>
          Don't have an account?
          <button
            onClick={() => navigate('/accounts/signup')}
            className='pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer'
          >
            Register Now
          </button>
        </h4>
      </div>

      {/* <GoogleLogin /> */}
    </div>
  );
}
