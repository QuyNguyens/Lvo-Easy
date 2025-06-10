export interface Topic {
  _id: string;
  name: string;
  status?: boolean;
  vocabularyCount: number;
}

export interface TopicResponse {
  success: boolean;
  message: string;
  data: Topic[];
}

