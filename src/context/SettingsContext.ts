import { createContext, useContext, useState } from 'react';

export interface SettingsType{
    amountLearn: number;
    amountPractice: number;
    remindTime: number;
}

interface SettingsContextType {
  settings: SettingsType | null;
  setSettings: (settings: SettingsType) => void;
  clearSettings: () => void;
}


const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within an SettingsType');
  }
  return context;
};

export const SettingsProvider = SettingsContext.Provider;

export const createSettingsValue = () => {
    const [settings, setSettingsState] = useState<SettingsType | null>(() => {
      const storedSettings = localStorage.getItem('settings');
      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          return {
            amountLearn: Number(parsed.amountLearn),
            amountPractice: Number(parsed.amountPractice),
            remindTime: Number(parsed.remindTime),
          };
        } catch {
          return null;
        }
      }
      return null;
    });


  const setSettings = (settings: SettingsType) => {
    setSettingsState(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  const clearSettings = () => {
    setSettingsState(null);
    localStorage.removeItem('settings');
  };


  return { settings, setSettings, clearSettings };
};

