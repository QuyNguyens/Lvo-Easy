// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sidebarLinks } from '../static/data/sidebar';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="flex flex-row xl:flex-col md:flex-col h-full justify-around md:justify-start border border-r-0 md:border-r border-gray-200 gap-4 w-full px-3 xl:w-64 p-2 md:p-4 xl:pt-10 lg:pt-10 dark:bg-black-400">
      {sidebarLinks.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded dark:hover:bg-white dark:hover:text-black ${
              isActive
                ? 'text-white bg-black dark:text-black dark:bg-white'
                : 'text-black dark:text-white'
            }`
          }
        >
          <Icon className="h-7 w-7" />
          <span className='hidden lg:block'>{t(label)}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
