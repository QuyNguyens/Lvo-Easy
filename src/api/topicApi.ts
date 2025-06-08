import { Topic } from "../types/topic";
import axiosClient from "./axiosClient";

const topicApi = {
    getAll: async (userId: string) :Promise<Topic[]> => {
       const res = await axiosClient.get(`/topics/all?isTopic=false&userId=${userId}`);
        return res.data.data;
    }
}

export default topicApi;