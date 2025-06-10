import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { reset } from "../feature/vocabSlice";
import VocabProgress from "../components/VocabProgress";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import VocabularyInput from "../components/VocabularyInput";
import Question from "../components/Question";
import { getShuffledChoices } from "../helpers/questionRandom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const TopicPracticePage = () => {
  const {t} = useTranslation();
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  const current = useSelector((state: RootState) => state.vocab.current);
  const selectedAnswer = useSelector((state: RootState) => state.vocab.selectedAnswer);
  const vocabList = useSelector((state: RootState) => state.vocab.vocabList);
  const topicQuestion = useSelector((state: RootState) => state.vocab.vocabRandom);
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (vocabList[current]) {
      const newChoices = getShuffledChoices(vocabList[current].word, topicQuestion);
      setShuffledChoices(newChoices);
    }
  }, [current]);

  if(current === vocabList.length){
    dispatch(reset());
    navigate(`/${segments[0]}}`);
  }

  const handleUnKnow = () =>{
    navigate(`/${segments[0]}/remember`);
  }

  return (
    <div className="w-full flex flex-col gap-1">
        <h1 className="text-4xl font-medium text-center dark:text-white pb-3">{t("practice")}</h1>
        <VocabProgress total={vocabList.length} current={current} title={t("typeIn")}/>
        <div className="w-full flex justify-end">
          <button onClick={selectedAnswer ? undefined : handleUnKnow} className="w-24 rounded-md flex flex-col bg-primary-1 hover:bg-primary-3 py-2 text-white justify-center items-center">
            <QuestionMarkCircleIcon className="h-10 w-10" />
            <span className="w-[70%]">
              {t("unKnown")}
            </span>
          </button>
        </div>
        <h2 className="text-center text-3xl font-medium dark:text-white">{vocabList[current]?.word}</h2>
        <VocabularyInput vocab={vocabList[current]?.word} current={current} isSystem={false}/>
        <Question questions={shuffledChoices} vocab={vocabList[current]?.word} isSystem={false}/>
    </div>
  )
}

export default TopicPracticePage