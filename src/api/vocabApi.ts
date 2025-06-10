import axios from "axios";
import { PhoneticInfo, VocabCreateRequest, VocabResponse } from "../types/vocab";
import axiosClient from "./axiosClient";

const vocabApi = {
    create: async (data: VocabCreateRequest) => {
        await axiosClient.post('/vocab/create', data);
    },
    getByTopic: async(userId: string, isSystem: boolean, topicId: string) : Promise<VocabResponse> =>{
        const res = await axiosClient.get(`vocab/topic?topicId=${topicId}&isSystemVocab=${isSystem}&userId=${userId}`);
        return res.data.data;
    },
    getWordsToLearn: async(userId: string, topicId: string) : Promise<VocabResponse> =>{
        const res = await axiosClient.get(`vocab/vocab-learn?topicId=${topicId}&&userId=${userId}`);
        return res.data.data;
    },
    getVocab: async(vocab: string) : Promise<PhoneticInfo> =>{
        const res = await axios.get(`${import.meta.env.VITE_VOCAB_API}/${vocab}`);
        const fullData = (res.data[0]?.phonetics ?? []).find(
          (p: any) => p.text && p.audio
        );

        const data: PhoneticInfo = {
          text: fullData?.text,
          audio: fullData?.audio
        };
        return data;
    },
    update: async(userId: string, vocabId: string) =>{
        await axiosClient.post('vocabStatus/update',{userId: userId, vocabId: vocabId});
    }
}

export default vocabApi;