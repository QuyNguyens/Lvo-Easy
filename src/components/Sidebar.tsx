// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
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
            Write-VOCAB
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
            My-VOCAB
        </NavLink>
        <NavLink
            to="/system-vocab"
            className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded ${
                isActive ? ' text-white bg-black' : 'text-black'
                }`
            }
            >
            <AcademicCapIcon className="h-7 w-7" />
            System-VOCAB
        </NavLink>
        <NavLink
            to="/profile"
            className={({ isActive }) =>
                `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded ${
                isActive ? ' text-white bg-black' : 'text-black'
                }`
            }
            >
            <AcademicCapIcon className="h-7 w-7" />
            Profile
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
              `flex items-center gap-2 font-medium hover:text-white hover:bg-black px-3 py-3 rounded ${
              isActive ? ' text-white bg-black' : 'text-black'
              }`
          }
          >
          <AcademicCapIcon className="h-7 w-7" />
          Settings
      </NavLink>
    </aside>
  );
};

export default Sidebar;
