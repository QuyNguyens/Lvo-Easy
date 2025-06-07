import { VocabCreateRequest } from "../types/vocab";
import axiosClient from "./axiosClient";

const vocabApi = {
    create: async (data: VocabCreateRequest) => {
        await axiosClient.post('/vocab/create', data);
    }
}

export default vocabApi;