import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../core/services/subject/subject.service';
import { Isubsubjectexam } from '../../shared/interface/isubsubjectexam';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule  } from "primeng/button";
import { StepperModule } from 'primeng/stepper';
import { QuestionService } from '../../core/services/question/question.service';
import { isPlatformBrowser } from '@angular/common';
import { ExamsComponent } from "../exams/exams.component";
import { Store } from '@ngrx/store';
import { loadquestion } from '../../store/question.action';
import { Subscription } from 'rxjs';
import { DialogService } from '../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-details',
  imports: [DialogModule, ButtonModule, StepperModule,ExamsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
    private readonly _activatedRoute=inject(ActivatedRoute);
  private readonly _SubjectService=inject(SubjectService);
  private readonly _questionService=inject(QuestionService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID);
  private readonly dialogService=inject(DialogService);
  _store=inject(Store);
    private dialogSubscription!: Subscription;
Exams:Isubsubjectexam[]=[];
  subjectid:any;
  loadexam!:number
  qestionid:any;
  // !diaglo
   visible = false;
   ngOnInit(): void {
    this.getdatasubmet()
        this.dialogSubscription = this.dialogService.closeDialog$.subscribe(() => {
      this.visible = false; 
    });
  }
  getdatasubmet(){
    if(isPlatformBrowser(this.pLATFORM_ID)){
         const parems =this._activatedRoute.snapshot.params;
    if(parems['id']){
      this._SubjectService.subsubjectexam(parems['id']).subscribe({
          next:(res)=>{
            this.loadexam=res.exams
            this.Exams=res.exams
            console.log(this.Exams);
            this.qestionid=this.Exams[0]?._id
          },
          error:(err)=>{
            console.log(err);
          }
        })
    }
    }

  }
  openexam(examid:string) {
    console.log(examid);

      this.visible = true;
      this._store.dispatch(loadquestion({examid:examid}));

  };

  ngOnDestroy(): void {

    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}


