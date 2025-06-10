import { Topic } from "../types/topic"
import HappyFlower from '../assets/happy-flower.png';
import SadFlower from '../assets/sad-flower.png';
import vocabApi from "../api/vocabApi";
import { useAuth } from "../context/UserContext";
import { useDispatch } from "react-redux";
import { setVocabData } from "../feature/vocabSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useTranslation } from "react-i18next";
import Toast from "../components/Toast";

interface TopicItemProps{
    topic: Topic;
    isSystem: boolean;
}

const TopicItem = ({topic, isSystem}: TopicItemProps) => {

    const {toast, showToast} = useToast();
    const {user} = useAuth();
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleGetVocab = async () =>{
      try {
        const res = await vocabApi.getByTopic(user?._id || '',isSystem, topic._id);

        disPatch(setVocabData({
          vocabList: res.vocab,
          vocabRandom: res.vocabRandom
        }));
        if(isSystem){
          navigate('/system-vocab/practice');
        }else{
          navigate('/my-vocab/practice');
        }

      } catch (error) {
        console.error('get vocab failed: ', error);
      }
    }

    const handleLearn = async () =>{
      const res = await vocabApi.getWordsToLearn(user?._id || '', topic._id);
        if(res.vocab.length === 0){
          showToast(t("emptyWarning"), 'warn');
        }else{
          disPatch(setVocabData({
            vocabList: res.vocab,
            vocabRandom: res.vocabRandom
          }));
          navigate('/my-vocab/practice');
        }
    }

  return (
    <div onClick={isSystem ? undefined : handleGetVocab} className="relative flex flex-col justify-center items-center gap-2 p-2 border border-gray-200 rounded-md group">
        <img className="w-48 h-24" src={topic.status ? SadFlower : HappyFlower} alt="" />
        <span className="text-center font-medium text-base16 dark:text-white">{topic.name} ({topic.vocabularyCount})</span>
        {isSystem && <div className="hidden group-hover:flex absolute w-full flex-col items-center justify-center gap-2 left-0 top-1/2 -translate-y-1/2">
            <button onClick={handleLearn} className="w-4/5 bg-primary-1 hover:bg-primary-3 text-white font-medium text-base16 py-1 rounded-md">learn</button>
            <button onClick={handleGetVocab} className="w-4/5 bg-primary-4 hover:bg-blue-400 text-white font-medium text-base16 py-1 rounded-md">practice</button>
        </div>}
        {toast.show && <Toast message={toast.message} status={toast.status} />}
    </div>
  )
}

export default TopicItem