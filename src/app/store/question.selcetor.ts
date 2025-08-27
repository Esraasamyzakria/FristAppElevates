import { createFeatureSelector, createSelector } from "@ngrx/store";
import { questionreducer } from "./question.reducer";
import { questionlist } from "./question.state";

export const  selectquestionstate=createFeatureSelector<questionlist>('questionexam');
export const selectAllQuestions = createSelector(
  selectquestionstate,
  (state) => state.questions
);


