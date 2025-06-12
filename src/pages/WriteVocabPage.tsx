import { useTranslation } from "react-i18next"
import SentenceInput from "../components/SentenceInput";
import { useEffect, useMemo, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import vocabApi from "../api/vocabApi";
import { useAuth } from "../context/UserContext";
import { VocabCreateRequest } from "../types/vocab";
import { Topic } from "../types/topic";
import topicApi from "../api/topicApi";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setMyTopic } from "../feature/topicSlice";

interface VocabType{
  enWord: string;
  viWord: string;
}

const WriteVocabPage = () => {
  const {t} = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<Topic>();
  const [sentences, setSentences] = useState<string[]>([]);
  const {toast, showToast} = useToast();
  const myTopic = useSelector((state: RootState) => state.topic.myTopic);
  const [vocab, setVocab] = useState<VocabType>({
    enWord: '',
    viWord: ''
  });
  const [isEmptyField, setIsEmptyField] = useState<boolean>(false);
  const {user} = useAuth();
  const dispatch = useDispatch();

  const fetchTopic = async () =>{
    try {
      const topicsData = await topicApi.getAll(user?._id || "", false);
      setSelectedTopic(topicsData[0]);
      dispatch(setMyTopic(topicsData));
    } catch (error) {
      console.error('get topics failed: ', error);
    }
  } 

  useEffect(() =>{
    if(myTopic === null){
      fetchTopic();
    }else{
      setSelectedTopic(myTopic[0]);
    }
  },[myTopic]);

  const options = useMemo(() => {
    return myTopic?.map(topic => ({
      value: topic._id,
      label: topic.name,
    })) || [];
  }, [myTopic]);

  const handleChange = (option: { value: string; label: string } | null) => {
    if (option) {
      const foundTopic = myTopic?.find(topic => topic._id === option.value);
      if (foundTopic) {
        setSelectedTopic(foundTopic);
      } else {
        setSelectedTopic({ _id: '', name: option.label, vocabularyCount: 0 });
      }
    }else {
      setSelectedTopic(undefined);
    }
  };

  const handleSave = async () =>{
    if(!selectedTopic){
      return ;
    }
    try {
      const req: VocabCreateRequest = {
        word: vocab.enWord,
        meaning: vocab.viWord,
        example: sentences,
        topicId: '',
        isSystemVocab: false,
        createBy: user?._id || '',
        topicName: ''
      }
      if(vocab.enWord === "" || vocab.viWord == ""){
        setIsEmptyField(true);
      }else{
        const isExisting = myTopic?.some(topic => topic._id === selectedTopic?._id);
        if (isExisting) {
          req.topicId = selectedTopic?._id;
        }else{
          req.topicName = selectedTopic?.name;
        }
  
        await vocabApi.create(req);
        showToast(t("createSuccess"), 'success');

        if(!isExisting){
          dispatch(setMyTopic(null));
        }
      }

    } catch (error) {
      console.error("create failed: ", error);
      showToast(t("createFailed"), 'error');
    }
  }

  const handleVocabChange = (key: keyof VocabType, value: string) => {
    const trimmedValue = value;

    setVocab((prev) => ({
      ...prev,
      [key]: trimmedValue,
    }));

    setIsEmptyField(false);
  };

  const handleReset = () =>{
    setVocab({
      enWord: '',
      viWord: ''
    })
    setSentences([]);
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center font-bold text-4xl dark:text-white">{t("vocabulary")}</h1>
      <p className="text-xl font-normal dark:text-white">{t("descriptionTitle")}</p>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl dark:text-white">{t("topic")}:</span>
        <div className="min-w-48">
          <CreatableSelect
            isClearable
            options={options}
            onChange={handleChange}
            value={
              selectedTopic
                ? { value: selectedTopic._id, label: selectedTopic.name }
                : null
            }
            placeholder={t("placeHolderSelect")}
            classNamePrefix="react-select"
          />
        </div>
        {!selectedTopic &&<p className="text-base16 text-red-500">{t("emptyTopic")}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold dark:text-white">{t("enWord")}:</h2>
          <input className="outline-none border border-gray-300 focus:border-primary-1 px-3 py-2 rounded-md"
            placeholder={t("palaceHolderEnWord")} type="text"
            value={vocab.enWord}
            onChange={(e) => handleVocabChange("enWord", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold dark:text-white">{t("viWord")}:</h2>
          <input className="outline-none border border-gray-300 focus:border-primary-1 px-3 py-2 rounded-md"
            placeholder={t("palaceHolderViWord")} type="text"
            value={vocab.viWord}
            onChange={(e) => handleVocabChange("viWord", e.target.value)}
          />
        </div>
      </div>
      {isEmptyField && <p className="text-center text-base16 text-red-500 ">{t("emptyWord")}</p>}
      <div className="flex flex-col gap-2">
         <h2 className="text-xl font-bold dark:text-white">{t("example")}:</h2>
          <SentenceInput sentences={sentences} setSentences={setSentences}/>
      </div>
      <div className="flex justify-end items-center gap-5">
        <button onClick={handleReset} className="bg-primary-4 text-white font-medium text-base16 px-4 py-2 rounded-md">{t("reset")}</button>
        <button onClick={handleSave} className="bg-primary-1 text-white font-medium text-base16 px-4 py-2 rounded-md">{t("save")}</button>
      </div>
      {toast.show && <Toast message={toast.message} status={toast.status} />}
    </div>
  )
}

export default WriteVocabPage