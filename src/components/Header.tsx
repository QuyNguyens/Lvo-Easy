import Logo from '../assets/logo.png';
import AvatarDropdown from './AvatarDropdown';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  return (
    <div className="h-20 flex items-center shadow-md justify-between px-12 py-2">
      <img className='h-16' src={Logo} alt="" />
      <div className='flex items-center gap-8 mr-20'>
        <LanguageSelector/>
        <AvatarDropdown/>
      </div>
    </div>
  )
}

export default Header