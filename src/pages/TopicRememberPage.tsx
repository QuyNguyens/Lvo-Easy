import { useDispatch, useSelector } from "react-redux"
import VocabProgress from "../components/VocabProgress"
import { RootState } from "../app/store"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { audioPlay } from "../helpers/audioHelper";
import { reset, setCurrent } from "../feature/vocabSlice";
import { useLocation, useNavigate } from "react-router-dom";
import vocabApi from "../api/vocabApi";
import { useAuth } from "../context/UserContext";
import { PhoneticInfo } from "../types/vocab";
import WordMean from "../components/WordMean";
import { useSettings } from "../context/SettingsContext";


const TopicRememberPage = () => {

  const {t} = useTranslation();
  const vocabList = useSelector((state: RootState) => state.vocab.vocabList);
  const current = useSelector((state: RootState) => state.vocab.current);
  const [phonetic, setPhonetic] = useState<PhoneticInfo>({
    text: '',
    audio: ''
  });

  const {settings} = useSettings();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const {user} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    fetchVocab();
  },[]);

  const handleNext = async () =>{
    vocabApi.update(user?._id || '', vocabList[current]._id, settings?.remindTime || 3);
    if(current + 1 === vocabList.length){
      dispatch(reset());
      navigate(`/${segments[0]}`);
    }else{
      dispatch(setCurrent(current + 1));
      navigate(`/${segments[0]}/practice`);
    }
  }

  return (
   <div className="w-full flex flex-col gap-5">
        <h1 className="text-4xl font-medium text-center dark:text-white pb-3">{t("practice")}</h1>
        <VocabProgress total={vocabList.length} current={current} title={t("typeIn")}/>
        <div className="flex justify-between">
          <WordMean phonetic={phonetic}/>
          <div>
            <div className="flex flex-col justify-center items-center gap-1 w-24 h-24 py-3 rounded-md bg-primary-1 hover:bg-primary-3 text-white font-semibold"
               onClick={handleNext}
          >
            <ArrowRightCircleIcon className="w-8 h-8"/>
            <span>{t('next')}</span>
          </div>
          </div>
        </div>
    </div>
  )
}

export default TopicRememberPage