import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import ViIcon from "../assets/vietnam-icon.png";
import UsIcon from "../assets/us-icon.png";

const languages = [
  {
    code: "VIE",
    name: "Tiếng Việt",
    icon: ViIcon,
  },
  {
    code: "ENG",
    name: "English",
    icon: UsIcon,
  },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const selected = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const savedLangCode = localStorage.getItem("language");
    const matchedLang = languages.find((l) => l.code === savedLangCode);
    if (matchedLang && matchedLang.code !== i18n.language) {
      i18n.changeLanguage(matchedLang.code);
    }
  }, []);

  const handleSelect = (lang: (typeof languages)[0]) => {
    i18n.changeLanguage(lang.code);
    localStorage.setItem("language", lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border rounded w-32 px-3 py-2 shadow-sm"
      >
        <p className="flex items-center">
          <img
            src={selected.icon}
            alt={selected.code}
            className="w-5 h-5 rounded-full mr-2"
          />
          <span className="font-medium dark:text-white">{selected.code}</span>
        </p>
        <ChevronDownIcon className="w-4 h-4 ml-2 dark:text-white" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
            >
              <img
                src={lang.icon}
                alt={lang.code}
                className="w-5 h-5 rounded-full mr-2"
              />
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
