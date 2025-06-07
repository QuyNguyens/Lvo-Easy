export interface Topic {
  _id: string;
  name: string;
  vocabularyCount: number;
}

export interface TopicResponse {
  success: boolean;
  message: string;
  data: Topic[];
}

