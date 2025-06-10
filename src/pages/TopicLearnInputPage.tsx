import { useTranslation } from "react-i18next";
import VocabProgress from "../components/VocabProgress"
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import VocabularyInput from "../components/VocabularyInput";

const TopicLearnInputPage = () => {
  const {t} = useTranslation();
  const current = useSelector((state: RootState) => state.vocab.current);
  const vocabList = useSelector((state: RootState) => state.vocab.vocabList);
  return (
    <div className="w-full flex flex-col gap-5">
        <h1 className="text-4xl font-medium text-center dark:text-white pb-3">{t("learn")}</h1>
        <VocabProgress total={vocabList.length} current={current} title={t("typeIn")}/>
        <h2 className="mt-5 text-center text-3xl font-medium dark:text-white">{vocabList[current]?.meaning}</h2>
        <VocabularyInput vocab={vocabList[current]?.word} current={current} isSystem={true}/>
    </div>
  )
}

export default TopicLearnInputPage