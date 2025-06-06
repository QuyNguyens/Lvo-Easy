import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "VIE",
    name: "Tiếng Việt",
    icon: "/src/assets/vietnam-icon.png",
  },
  {
    code: "ENG",
    name: "English",
    icon: "/src/assets/us-icon.png",
  },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() =>{
    const savedLangCode = localStorage.getItem("language");
    const matchedLang = languages.find((l) => l.code === savedLangCode);

    if (matchedLang) {
      setSelected(matchedLang);
      i18n.changeLanguage(matchedLang.code);
    } else {
      i18n.changeLanguage(selected.code);
    }
  },[]);

  const handleSelect = (lang: typeof selected) => {
    setSelected(lang);
    i18n.changeLanguage(lang.code);
    setIsOpen(false);
    localStorage.setItem('language', lang.code);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border rounded px-6 py-3 shadow-sm hover:bg-gray-100"
      >
        <img
          src={selected.icon}
          alt={selected.code}
          className="w-5 h-5 rounded-full mr-2"
        />
        <span className="font-medium">{selected.code}</span>
        <ChevronDownIcon className="w-4 h-4 ml-2" />
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
