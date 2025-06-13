import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import VocabProgress from "../components/VocabProgress";
import WordMean from "../components/WordMean";
import { PhoneticInfo } from "../types/vocab";
import { useEffect, useState } from "react";
import vocabApi from "../api/vocabApi";
import { audioPlay } from "../helpers/audioHelper";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { reset, setCurrent } from "../feature/vocabSlice";
import { useAuth } from "../context/UserContext";
import { useSettings } from "../context/SettingsContext";

const TopicLearnPage = () => {
  const {t} = useTranslation();
  const [phonetic, setPhonetic] = useState<PhoneticInfo>({
    text: '',
    audio: ''
  });
  const [isRedirecting, setIsRedirecting] = useState(false);
  const current = useSelector((state: RootState) => state.vocab.current);
  const vocabList = useSelector((state: RootState) => state.vocab.vocabList);
  const {user} = useAuth();
  const {settings} = useSettings();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    const fetchVocab = async () =>{
      try {
        const res = await vocabApi.getVocab(vocabList[current]?.word);
        setPhonetic(res);
        if(res.audio !== "" && res.audio != undefined){
          await audioPlay(res.audio);
        }
      } catch (error) {
        console.error('failed to get vocab: ', error);
      }
    };
    if (current === vocabList.length) {
      setIsRedirecting(true);
      dispatch(reset());
      navigate('/system-vocab');
      return;
    }

    if (!isRedirecting) {
      fetchVocab();
    }
  },[current]);

  const handleContinue = () =>{
    navigate('/system-vocab/learn-question');
  }

  const handleAlreadyKnow = () =>{
    vocabApi.update(user?._id || '', vocabList[current]._id, settings?.remindTime || 3);
    dispatch(setCurrent(current+1))
  }
  
  return (
    <div className="w-full flex flex-col gap-5">
        <h1 className="text-4xl font-medium text-center dark:text-white pb-3">{t("learn")}</h1>
        <VocabProgress total={vocabList.length} current={current} title={t("typeIn")}/>
        <div className="flex justify-between">
          <WordMean phonetic={phonetic}/>
          <div className="flex flex-col gap-6">
            <button onClick={handleContinue} className="min-w-64 py-2 font-medium rounded-md text-base18 text-white bg-primary-1 hover:bg-primary-3">{t("continue")}</button>
            <button onClick={handleAlreadyKnow} className="min-w-64 py-2 flex items-center justify-center gap-1 font-medium rounded-md border bg-white border-gray-200 text-base18 hover:border-primary-1 hover:bg-blue-50">
              <CheckCircleIcon className="w-8 h-8"/>
              <span >{t("known")}</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default TopicLearnPage