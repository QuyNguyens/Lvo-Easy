import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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

  const handleSelect = (lang: typeof selected) => {
    setSelected(lang);
    setIsOpen(false);
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
