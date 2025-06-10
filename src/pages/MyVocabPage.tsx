import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Topic } from "../types/topic";
import topicApi from "../api/topicApi";
import { useAuth } from "../context/UserContext";
import TopicItem from "./TopicItem";

const MyVocabPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  const {t} = useTranslation();
  const {user} = useAuth();

  useEffect(() =>{
    const fetchTopic = async () =>{
      try {
        const topicsData = await topicApi.getAll(user?._id || '', false);
        if(topicsData){
          setTopics(topicsData);
        }
      } catch (error) {
        console.error('get topics failed!!!');
      }
    }
    fetchTopic()
  },[]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center font-bold text-4xl dark:text-white">{t("practice")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-10">
        {
          topics && topics.map((topic, index) =>{
            return <TopicItem key={index} topic={topic} isSystem={false}/>
          })
        }
      </div>
    </div>
  )
}

export default MyVocabPage