export interface Iquestionexam {
  _id:       string;
  question:  string;
  answers:   Answer[];
  correct:   string;
  exam:      Exam;
}

export interface Answer {
  answer: string;
  key:    string;
}

export interface Exam {
  _id:               string;
  title:             string;
  duration:          number;
  numberOfQuestions: number;
  active:            boolean;
}
