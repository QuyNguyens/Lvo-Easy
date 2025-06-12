import { useTranslation } from "react-i18next";
import TopicItem from "./TopicItem";
import { useEffect } from "react";
import { useAuth } from "../context/UserContext";
import topicApi from "../api/topicApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setSystemTopic } from "../feature/topicSlice";

const SystemVocabPage = () => {
    const systemTopic = useSelector((state: RootState) => state.topic.systemTopic);
    const {t} = useTranslation();
    const {user} = useAuth();
    const dispatch = useDispatch();
  
    useEffect(() =>{
      const fetchTopic = async () =>{
        try {
          const topicsData = await topicApi.getAll(user?._id || '', true);
          if(topicsData){
            dispatch(setSystemTopic(topicsData));
          }
        } catch (error) {
          console.error('get topics failed!!!');
        }
      }
      if(systemTopic === null){
        fetchTopic();
      }
    },[]);
  
    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-center font-bold text-4xl dark:text-white">{t("practice")}</h1>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
          {
            systemTopic && systemTopic.map((topic, index) =>{
              return <TopicItem key={index} topic={topic} isSystem={true}/>
            })
          }
        </div>
      </div>
    )
}

export default SystemVocabPage