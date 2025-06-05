import LoginImg from '../assets/login-img.jpg';
import EmailIcon from '../assets/email-icon.svg';
import PasswordIcon from '../assets/password-icon.svg';
import { useNavigate } from 'react-router-dom';
import InputIcon from '../components/InputIcon';
import { useState } from 'react';
import { SignUpRequest } from '../types/user';
import authApi from '../api/authApi';

const SignUpPage = () => {
  const [signUpRequest, setSignUpRequest] = useState<SignUpRequest>({
    email: '',
    name: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setIsConfirmPassword(false);
    } else {
      setSignUpRequest((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSignUp = async () =>{
    if(confirmPassword !== signUpRequest.password){
      setIsConfirmPassword(true);
    }else{
       try {
        await authApi.register(signUpRequest);
        navigate('/login');
      } catch (err: any) {
        console.error(err?.response?.data?.message || 'SignUp failed');
      }
    }
  }

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
            type='text' placeHolder='Enter your name'
            name="name"
            value={signUpRequest.name}
            onChange={handleChange}
          /> 
          <InputIcon
            icon={EmailIcon}
            type='text' placeHolder='Enter your email'
            name="email"
            value={signUpRequest.email}
            onChange={handleChange}
          /> 
          <InputIcon
            icon={PasswordIcon}
            type='password' placeHolder='Enter your password'
            name="password"
            value={signUpRequest.password}
            onChange={handleChange}
          /> 
          <InputIcon
            icon={PasswordIcon}
            type="password"
            placeHolder="Confirm your password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          {isConfirmPassword && <p className='text-center text-sm text-red-500 font-medium'>your password must be the same!!!</p>}
          <button onClick={handleSignUp} className='py-3 w-full rounded-full bg-primary-1 hover:bg-primary-3 text-2xl text-white'>SignUp</button>
        </div>

        <p className='text-center text-base18'>Already have a account? <span onClick={() => navigate('/login')} className='text-blue-600 hover:underline'>Sign in</span></p>
      </div>
    </div>
  )
}

export default SignUpPage