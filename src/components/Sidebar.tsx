// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/outline';
const Sidebar = () => {
    
    const { t } = useTranslation();
  return (
    <aside className="flex flex-col border border-r border-gray-200 gap-4 w-64 p-4 pt-10 dark:bg-black-400">
        <NavLink
            to="/"
            className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded dark:hover:bg-white dark:hover:text-black ${
                isActive ? ' text-white bg-black dark:text-black dark:bg-white' : 'text-black dark:text-white'
                }`
            }
            >
            <PencilSquareIcon className="h-7 w-7" />
            {t("writeVocab")}
        </NavLink>
        <NavLink
            to="/my-vocab"
             className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded dark:hover:bg-white dark:hover:text-black ${
                isActive ? ' text-white bg-black dark:text-black dark:bg-white' : 'text-black dark:text-white'
                }`
            }
            >
            <AcademicCapIcon className="h-7 w-7" />
            {t("myVocab")}
        </NavLink>
        <NavLink
            to="/system-vocab"
             className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded dark:hover:bg-white dark:hover:text-black ${
                isActive ? ' text-white bg-black dark:text-black dark:bg-white' : 'text-black dark:text-white'
                }`
            }
            >
            <BookOpenIcon className="h-7 w-7" />
            {t("systemVocab")}
        </NavLink>
        <NavLink
            to="/profile"
             className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded dark:hover:bg-white dark:hover:text-black ${
                isActive ? ' text-white bg-black dark:text-black dark:bg-white' : 'text-black dark:text-white'
                }`
            }
            >
            <UserCircleIcon className="h-7 w-7" />
            {t("profile")}
        </NavLink>
        <NavLink
          to="/settings"
           className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded dark:hover:bg-white dark:hover:text-black ${
                isActive ? ' text-white bg-black dark:text-black dark:bg-white' : 'text-black dark:text-white'
                }`
            }
          >
          <Cog6ToothIcon className="h-7 w-7" />
          {t("settings")}
      </NavLink>
    </aside>
  );
};

export default Sidebar;
