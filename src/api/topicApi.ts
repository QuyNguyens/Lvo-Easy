import { Topic } from "../types/topic";
import axiosClient from "./axiosClient";

const topicApi = {
    getAll: async (userId: string, isSystem: boolean) :Promise<Topic[]> => {
        let url = `/topics/all?isTopic=${isSystem}`;
        if(!isSystem){
            url+= `&userId=${userId}`;
        }
       const res = await axiosClient.get(`${url}`);
        return res.data.data;
    } 
}

export default topicApi;