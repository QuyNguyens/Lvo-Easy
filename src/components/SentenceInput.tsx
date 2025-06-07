import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useTranslation

 } from 'react-i18next';

interface SentenceInputProps {
  sentences: string[];
  setSentences: React.Dispatch<React.SetStateAction<string[]>>;
}

const SentenceInput: React.FC<SentenceInputProps> = ({sentences, setSentences}: SentenceInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const {t} = useTranslation();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      setSentences((prev) => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-md">
      <div className="border border-gray-300 rounded p-2 min-h-[100px] focus-within:border-blue-500 transition">
        <ul className="list-decimal overflow-y-auto max-h-20 list-inside space-y-1 text-sm text-gray-800">
          {sentences.map((sentence, index) => (
            <li key={index}>{sentence}</li>
          ))}
        </ul>
        <input
          type="text"
          className="w-full outline-none mt-1"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t("palaceHolderExample")}
        />
      </div>
    </div>
  );
};

export default SentenceInput;
