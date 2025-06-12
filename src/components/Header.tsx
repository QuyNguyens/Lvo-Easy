import Logo from '../assets/logo.png';
import LogoDark from '../assets/logo-app.png';
import AvatarDropdown from './AvatarDropdown';
import LanguageSelector from './LanguageSelector';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 h-20 flex items-center shadow-md dark:border dark:border-b dark:border-gray-200 justify-between px-12 py-2 bg-white dark:bg-black-400">
      <div onClick={() => navigate('/')}>
        <img src={Logo} alt="logo" className="block dark:hidden" />
        <img src={LogoDark} alt="logo-dark" className="hidden dark:block" />
      </div>
      <div className='flex items-center gap-8 mr-5 md:mr-20'>
        <div className='hidden md:block'>
          <LanguageSelector/>
        </div>
        <AvatarDropdown/>
      </div>
    </div>
  )
}

export default Header