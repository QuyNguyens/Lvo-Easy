export interface VocabCreateRequest{
    word: string;
    meaning: string;
    example: string[];
    topicId?: string;
    isSystemVocab: boolean;
    createdBy: string;
    topicName?: string;
}