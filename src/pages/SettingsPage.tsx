import { useState } from "react";
import NumberSelect from "../components/NumberSelect";
import { SettingsType, useSettings } from "../context/SettingsContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import ThemeToggle from "../components/ThemeToggle";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

const SettingsPage = () => {
  
  const {settings, setSettings} = useSettings();
  const [selectedAmountLearn, setSelectedAmountLearn] = useState<number>(settings?.amountLearn || 5);
  const [selectedAmountPractice, setSelectedAmountPractice] = useState<number>(settings?.amountPractice || 20);
  const [selectedRemindTime, setSelectedRemindTime] = useState<number>(settings?.remindTime || 3);

  const {toast, showToast} = useToast();

  const {t} = useTranslation();

  const handleSave = () =>{
    const data : SettingsType = {
      amountLearn: selectedAmountLearn,
      amountPractice: selectedAmountPractice,
      remindTime: selectedRemindTime
    }

    setSettings(data);
    showToast(t("settingSave"), 'success');
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl text-center font-semibold mb-10 dark:text-white">
        {t("settingsTitle")}
      </h1>
      <div className="w-full md:w-3/4 xl:w-3/5 mx-auto flex flex-col gap-4 p-5 shadow-lg">
        <NumberSelect
          label={t("amountLearn")}
          value={selectedAmountLearn}
          onChange={setSelectedAmountLearn}
          options={[5,7,10,12]}
        />

        <NumberSelect
          label={t("amountPractice")}
          value={selectedAmountPractice}
          onChange={setSelectedAmountPractice}
          options={[10,20,30,40,50]}
        />

        <NumberSelect
          label={t("remindTime")}
          value={selectedRemindTime}
          onChange={setSelectedRemindTime}
          options={[2,3,4,5]}
        />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base18 font-medium dark:text-white">{t("languageMean")}:</h3>
            <LanguageSelector/>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-base18 font-medium dark:text-white">{t("themes")}:</h3>
            <ThemeToggle/>
          </div>
        </div>
        <button onClick={handleSave} className="px-3 py-2 font-medium text-base18 rounded-md bg-primary-1 hover:bg-primary-3 text-white">{t('save')}</button>
      </div>
      {toast.show && <Toast message={toast.message} status={toast.status}/>}
    </div>
  );
};

export default SettingsPage;
