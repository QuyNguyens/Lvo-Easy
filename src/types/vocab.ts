export interface VocabCreateRequest{
    word: string;
    meaning: string;
    example: string[];
    topicId?: string;
    isSystemVocab: boolean;
    createBy: string;
    topicName?: string;
}

export interface Vocab{
    _id: string;
    word: string;
    meaning: string;
    example: string[];
}

export interface VocabResponse{
    vocab: Vocab[];
    vocabRandom: string[];
}

export interface PhoneticInfo {
  text?: string;
  audio?: string;
}