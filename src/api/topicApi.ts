import { Topic } from "../types/topic";
import axiosClient from "./axiosClient";

const topicApi = {
    getAll: async () :Promise<Topic[]> => {
       const res = await axiosClient.get('/topics/all?isTopic=false');
        return res.data.data;
    }
}

export default topicApi;