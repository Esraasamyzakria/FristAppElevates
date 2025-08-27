import { Iquestionexam } from "../shared/interface/iquestionexam";
import { Statmentexam } from "../shared/interface/statmentexam";

export  interface questionlist{
  questions: Iquestionexam[];
  userAnswers:Statmentexam[];
  currentQuestionId: string | null;
}

export const initialExamState:questionlist = {
  questions: [] as Iquestionexam[],
  userAnswers:[] as Statmentexam[],
   currentQuestionId: null,

}
