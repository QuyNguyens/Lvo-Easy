import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { audioPlay } from '../helpers/audioHelper';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { PhoneticInfo } from '../types/vocab';
import { JSX, useState } from 'react';
import HighlightWordInSentence from './HighlightWordSentence';

interface WordMeanProps{
    phonetic: PhoneticInfo,
}

const WordMean = ({phonetic}: WordMeanProps) => {
    const vocabList = useSelector((state: RootState) => state.vocab.vocabList);
    const current = useSelector((state: RootState) => state.vocab.current);
    const {t} = useTranslation();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayAudio = async () => {
    if (isPlaying || !phonetic?.audio) return;

    try {
      setIsPlaying(true);
      await audioPlay(phonetic.audio);
    } catch (error) {
      console.error("Failed to play audio:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-[70%] flex flex-col gap-5">
        <div className="flex flex-col">
            <h3 className="font-medium text-base18 dark:text-white">{t("language")}</h3>
            <h1 className="text-3xl font-semibold dark:text-white">{vocabList[current]?.word}</h1>
            <span className="text-base18 italic dark:text-white">{phonetic?.text}</span>
        </div>
        <div className="flex flex-col gap-1">
            <h3 className="font-medium text-base18 dark:text-white">{t("languageVi")}</h3>
            <h1 className="text-3xl font-semibold dark:text-white">{vocabList[current]?.meaning}</h1>
        </div>
        {phonetic?.audio && <div className="w-[90%] bg-gray-200 h-px"></div>}
        {phonetic?.audio &&<div className="flex flex-col gap-1">
            <h3 className="font-medium text-base18 dark:text-white">{t("sound")}</h3>
             <div onClick={handlePlayAudio} className="flex gap-2">
            <SpeakerWaveIcon className="w-10 h-10 dark:text-white transition-transform duration-200 hover:scale-110"/>
            <SpeakerWaveIcon className="w-10 h-10 dark:text-white transition-transform duration-200 hover:scale-110"/>
            <SpeakerWaveIcon className="w-10 h-10 dark:text-white transition-transform duration-200 hover:scale-110"/>
            </div>
        </div>}
        {vocabList[current]?.example &&<> <div className="w-[90%] bg-gray-200 h-px"></div>
        <div className="flex flex-col gap-1">
            <h3 className="font-medium text-base18 dark:text-white">{t("example")}:</h3>
            {vocabList[current]?.example.map((ex, index) => (
              <HighlightWordInSentence key={index} sentence={ex} word={vocabList[current]?.word}/>
            ))}
        </div></>}
    </div>
  )
}

export default WordMean