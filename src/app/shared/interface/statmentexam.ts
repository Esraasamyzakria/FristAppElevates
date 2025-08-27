export interface Statmentexam {
  answer: string;
  key:    string;
  questionId: string;
}

export interface Exam {
  _id:               string;
  title:             string;
  duration:          number;
  subject:           string;
  numberOfQuestions: number;
  active:            boolean;
  createdAt:         Date;
}
