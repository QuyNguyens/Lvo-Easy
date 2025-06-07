import { useTranslation } from "react-i18next";

interface ThemeSelectorProps {
  onSelect: (theme: string) => void;
}

export default function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="absolute top-0 left-full ml-1 w-28 bg-white border rounded-md shadow-lg z-50">
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelect("light")}
      >
        🌕 {t("light")}
      </button>
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelect("dark")}
      >
        🌑 {t("dark")}
      </button>
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelect("system")}
      >
        💻 {t("system")}
      </button>
    </div>
  );
}
