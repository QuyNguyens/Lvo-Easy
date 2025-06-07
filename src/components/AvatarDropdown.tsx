import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "../assets/avatar.webp";
import ThemeSelector from "./ThemeSelector";

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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
    document.documentElement.classList.remove("light", "dark");
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.add(isDark ? "dark" : "light");
      localStorage.setItem("theme", "system");
    } else {
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
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
              <span>{t("themes")}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  themeOpen ? "rotate-90" : ""
                }`}
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

            {themeOpen && <ThemeSelector onSelect={handleThemeSelect} />}
          </div>

          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => handleSelect("Profile")}
          >
            {t("profile")}
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
            onClick={() => handleSelect("Logout")}
          >
            {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
}
