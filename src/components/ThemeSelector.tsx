import { useTranslation } from "react-i18next";

interface ThemeSelectorProps {
  onSelect: (theme: string) => void;
}

export default function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="absolute top-0 left-full ml-1 w-fit md:w-28 bg-white border rounded-md shadow-lg z-50">
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelect("light")}
      >
        🌕 <span className="hidden md:block">{t("light")}</span>
      </button>
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelect("dark")}
      >
        🌑 <span className="hidden md:block">{t("dark")}</span>
      </button>
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelect("system")}
      >
        💻 <span className="hidden md:block">{t("system")}</span>
      </button>
    </div>
  );
}
