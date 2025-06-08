export interface VocabCreateRequest{
    word: string;
    meaning: string;
    example: string[];
    topicId?: string;
    isSystemVocab: boolean;
    createBy: string;
    topicName?: string;
}