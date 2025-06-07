import Logo from '../assets/logo.png';
import LogoDark from '../assets/logo-app.png';
import AvatarDropdown from './AvatarDropdown';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  return (
    <div className="h-20 flex items-center shadow-md dark:border dark:border-b dark:border-gray-200 justify-between px-12 py-2 bg-white dark:bg-black-400">
      <img src={Logo} alt="logo" className="block dark:hidden" />
      <img src={LogoDark} alt="logo-dark" className="hidden dark:block" />
      <div className='flex items-center gap-8 mr-20'>
        <LanguageSelector/>
        <AvatarDropdown/>
      </div>
    </div>
  )
}

export default Header