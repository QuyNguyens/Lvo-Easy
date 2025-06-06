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
    <aside className="flex flex-col gap-4 w-64 p-4 mt-10">
        <NavLink
            to="/"
            className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded   ${
                isActive ? ' text-white bg-black' : 'text-black'
                }`
            }
            >
            <PencilSquareIcon className="h-7 w-7" />
            {t("writeVocab")}
        </NavLink>
        <NavLink
            to="/my-vocab"
            className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded ${
                isActive ? ' text-white bg-black' : 'text-black'
                }`
            }
            >
            <AcademicCapIcon className="h-7 w-7" />
            {t("myVocab")}
        </NavLink>
        <NavLink
            to="/system-vocab"
            className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded ${
                isActive ? ' text-white bg-black' : 'text-black'
                }`
            }
            >
            <BookOpenIcon className="h-7 w-7" />
            {t("systemVocab")}
        </NavLink>
        <NavLink
            to="/profile"
            className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded ${
                isActive ? ' text-white bg-black' : 'text-black'
                }`
            }
            >
            <UserCircleIcon className="h-7 w-7" />
            {t("profile")}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
              `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded ${
              isActive ? ' text-white bg-black' : 'text-black'
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
