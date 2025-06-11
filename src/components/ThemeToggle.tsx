import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "system";
  });
  const {t} = useTranslation();

  useEffect(() => {
    handleThemeSelect(theme);
  }, [theme]);

  const handleThemeSelect = (theme: string) => {
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleTheme}
        className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
        />
      </button>
      <span className="text-base16 dark:text-white font-medium">{theme === "dark" ? `🌙 ${t("dark")}` : `☀️ ${t("light")}`}</span>
    </div>
  );
};

export default ThemeToggle;
