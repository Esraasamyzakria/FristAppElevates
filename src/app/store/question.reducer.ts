import { createReducer, on, State } from "@ngrx/store";
import { initialExamState } from "./question.state";
import { loadquestion,setquestion, submitanswer } from "./question.action";


export const questionreducer =createReducer(
  initialExamState,
  on(loadquestion,(State)=>({
    ...State
  })),
  on(setquestion,(state,{ questions})=>({
    ...state,
    questions,
    currentQuestionId:questions.length>0? questions[0]._id:null

  })),
on(submitanswer, (state, { questionid, keyanswer }) => {
  const question = state.questions.find(q => q._id === questionid);
  const answerText = question?.answers.find(a => a.key === keyanswer)?.answer || '';

  // التحقق إذا كانت الإجابة موجودة مسبقاً
  const existingAnswerIndex = state.userAnswers.findIndex(a => a.questionId === questionid);

  if (existingAnswerIndex >= 0) {
    // تحديث الإجابة الموجودة
    const updatedAnswers = [...state.userAnswers];
    updatedAnswers[existingAnswerIndex] = {
      questionId: questionid,
      key: keyanswer,
      answer: answerText
    };

    return {
      ...state,
      userAnswers: updatedAnswers
    };
  } else {
    // إضافة إجابة جديدة
    return {
      ...state,
      userAnswers: [
        ...state.userAnswers,
        {
          questionId: questionid,
          key: keyanswer,
          answer: answerText
        }
      ]
    };
  }
}),
);

