import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import VocabProgress from "../components/VocabProgress";
import Question from "../components/Question";
import { getShuffledChoices } from "../helpers/questionRandom";

const TopicLearnQuestionPage = () => {
  const {t} = useTranslation();
  const current = useSelector((state: RootState) => state.vocab.current);
  const vocabList = useSelector((state: RootState) => state.vocab.vocabList);
  const topicQuestion = useSelector((state: RootState) => state.vocab.vocabRandom);

  return (
    <div className="w-full flex flex-col gap-5">
        <h1 className="text-4xl font-medium text-center dark:text-white pb-3">{t("learn")}</h1>
        <VocabProgress total={vocabList.length} current={current} title={t("typeIn")}/>
        <h2 className="mt-5 text-center text-3xl font-medium dark:text-white">{vocabList[current]?.meaning}</h2>
        <Question questions={getShuffledChoices(vocabList[current]?.word, topicQuestion)} vocab={vocabList[current]?.word} isSystem={true}/>

    </div>
  )
}

export default TopicLearnQuestionPage