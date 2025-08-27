import { createAction, props } from "@ngrx/store";
import { Iquestionexam } from "../shared/interface/iquestionexam";

export const loadquestion = createAction(
  '[question] load question',
  props<{examid:string}>()
);
export const setquestion = createAction(
  '[question] set question',
  props<{questions:Iquestionexam[]}>()
);

export const submitanswer=createAction(
  '[Exam] Submit Answer',
  props<{questionid:string,keyanswer:string}>()
);

