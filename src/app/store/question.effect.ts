import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionService } from "../core/services/question/question.service";
import { tap } from "rxjs";
import { Store } from "@ngrx/store";
import { setquestion } from "./question.action";

@Injectable()
export class loadquestionEffects {
   private actions$ = inject(Actions);
   private _store = inject(Store);
   private questionService=inject(QuestionService);
   fetchquestioneffect$= createEffect(
    ()=>this.actions$.pipe(
      ofType('[question] load question'),
      tap((action)=>{
        this.questionService.getallquestion(action.examid).subscribe({

          next:(res)=>{
            // console.log(res)
            this._store.dispatch(setquestion({questions:res.questions}))
            // console.log(res.questions)
          }
        })
      })
    ),{dispatch: false }
   )
}
