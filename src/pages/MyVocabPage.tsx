import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import topicApi from "../api/topicApi";
import { useAuth } from "../context/UserContext";
import TopicItem from "./TopicItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setMyTopic } from "../feature/topicSlice";

const MyVocabPage = () => {
  const myTopic = useSelector((state: RootState) => state.topic.myTopic);

  const {t} = useTranslation();
  const {user} = useAuth();
  const dispatch = useDispatch();

  useEffect(() =>{
    const fetchTopic = async () =>{
      try {
        const topicsData = await topicApi.getAll(user?._id || '', false);
        if(topicsData){
          dispatch(setMyTopic(topicsData));
        }
      } catch (error) {
        console.error('get topics failed!!!');
      }
    }
    if(myTopic === null){
      fetchTopic();
    }
  },[]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center font-bold text-4xl dark:text-white">{t("practice")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {
          myTopic && myTopic.map((topic, index) =>{
            return <TopicItem key={index} topic={topic} isSystem={false}/>
          })
        }
      </div>
    </div>
  )
}

export default MyVocabPage