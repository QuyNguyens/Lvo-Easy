import { useState, useRef, useEffect } from "react";
import Avatar from '../assets/avatar.webp';

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);
  const toggleTheme = () => setThemeOpen(!themeOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeSelect = (theme: string) => {
    setThemeOpen(false);
    alert(`Selected theme: ${theme}`);
  };

  const handleSelect = (option: string) => {
    setOpen(false);
    setThemeOpen(false);
    alert(`You clicked: ${option}`);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center"
      >
        <img
          src={Avatar}
          alt="avatar"
          className="w-full h-full rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-50">
          <div className="relative">
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center"
              onClick={toggleTheme}
            >
              <span>Themes</span>
              <svg
                className={`w-4 h-4 transition-transform ${themeOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {themeOpen && (
              <div className="absolute top-0 left-full ml-1 w-28 bg-white border rounded-md shadow-lg z-50">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleThemeSelect("Light")}
                >
                  🌕 Light
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleThemeSelect("Dark")}
                >
                  🌑 Dark
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleThemeSelect("System")}
                >
                  💻 System
                </button>
              </div>
            )}
          </div>

          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => handleSelect("Profile")}
          >
            Profile
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
            onClick={() => handleSelect("Logout")}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
