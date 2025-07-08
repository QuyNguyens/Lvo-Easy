import LoginImg from '../assets/login-img.jpg';
import EmailIcon from '../assets/email-icon.svg';
import PasswordIcon from '../assets/password-icon.svg';
import GoogleIcon from '../assets/google-icon.svg';
import FacebookIcon from '../assets/facebook-icon.svg';
import TwitterIcon from '../assets/twitter-icon.svg';
import AppleIcon from '../assets/apple-icon.svg';
import InputIcon from '../components/InputIcon';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import { useEffect, useState } from 'react';
import { SignInRequest, UserProfile } from '../types/user';
import { useAuth } from '../context/UserContext';

const LoginPage = () => {
  const [signinRequest, setSigninRequest] = useState<SignInRequest>({
    email: '',
    password: ''
  })
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() =>{
    const checkServer = async () =>{
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/wake`);
        if (!res.ok) throw new Error("Server not ready");
      } catch(error) {
        navigate("/wake");
      }
    }
    checkServer();
  },[navigate]);
   
  const {setUser} = useAuth();

  const handleLogin = async () =>{
    try {
      const res = await authApi.login(signinRequest);
      const user: UserProfile = {
        email: res.email,
        _id: res.userId,
        avatar: res.avatar,
        name: res?.name
      }
      setUser(user);
      localStorage.setItem('access_token', res.token);
      navigate('/');
    } catch (err: any) {
      console.error(err?.response?.data?.message || 'Login failed');
      setIsConfirmPassword(true);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setIsConfirmPassword(false);
      setSigninRequest((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  return (
    <div className='flex min-h-screen justify-center items-center gap-5'>
      <div className='hidden xl:block w-[58%]'>
        <img className='w-full' src={LoginImg} alt="" />
      </div>
      <div className='w-[80%] xl:w-[30%] flex flex-col gap-3 bg-green-100 p-10 rounded-2xl'>
        <span className='text-2xl font-medium'>LVO-Easy</span>
        <span className='w-full xl:w-2/3 text-4xl font-medium'>Welcome to LVO-Easy</span>
        <p className='text-gray-200 text-base16'>Learn new words every day, remember them easily, and improve your English anytime!</p>
        <div className='flex flex-col gap-4 py-5'>
          <InputIcon
            icon={EmailIcon}
            type='email' placeHolder='Enter your email'
            name="email"
            value={signinRequest.email}
            onChange={handleChange}
          /> 
          <InputIcon
            icon={PasswordIcon}
            type='password' placeHolder='Enter your password'
            name="password"
            value={signinRequest.password}
            onChange={handleChange}
          />  
          {isConfirmPassword && <p className='text-center text-sm text-red-500 font-medium'>your password incorrect!!!</p>}
          <button onClick={handleLogin} className='py-3 w-full rounded-full bg-primary-1 hover:bg-primary-3 text-2xl text-white'>Login</button>
        </div>
        <div className='flex gap-3 items-center'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <span className='text-gray-200 text-base16 font-normal'>or continue with</span>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>
        <div className='flex gap-9 justify-center items-center'>
          <div className='flex justify-center items-center p-3 rounded-md bg-white hover:bg-gray-50 shadow-sm'
            onClick={() => {
              window.location.href= `${import.meta.env.VITE_LOGIN_GOOGLE_URL}`
            }}
          >
            <img className='w-6 h-6' src={GoogleIcon} alt="" />
          </div>
          <div className='flex justify-center items-center p-3 rounded-md bg-white hover:bg-gray-50 shadow-sm'
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_LOGIN_FACEBOOK_URL}`;
            }}
          > 
            <img className='w-6 h-6' src={FacebookIcon} alt="" />
          </div>
          <div className='flex justify-center items-center p-3 rounded-md bg-white hover:bg-gray-50 shadow-sm'>
            <img className='w-6 h-6' src={TwitterIcon} alt="" />
          </div>
          <div className='flex justify-center items-center p-3 rounded-md bg-white hover:bg-gray-50 shadow-sm'>
            <img className='w-6 h-6' src={AppleIcon} alt="" />
          </div>
        </div>
        <p className='text-center text-base18'>Don’t have any account? <span onClick={() => navigate('/signup')} className='text-blue-600 hover:underline'>Sign up</span></p>
      </div>
    </div>
  )
}

export default LoginPage