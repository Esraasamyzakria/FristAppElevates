import { Component, inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../core/services/subject/subject.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule  } from "primeng/button";
import { StepperModule } from 'primeng/stepper';
import { isPlatformBrowser } from '@angular/common';
import { ExamsComponent } from "../exams/exams.component";
import { Store } from '@ngrx/store';
import { loadquestion } from '../../store/question.action';
import { Subscription } from 'rxjs';
import { DialogService } from '../../core/services/dialog/dialog.service';
import { Idetails } from '../../shared/interface/idetails';

@Component({
  selector: 'app-details',
  imports: [DialogModule, ButtonModule, StepperModule, ExamsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _SubjectService = inject(SubjectService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly dialogService = inject(DialogService);
  _store = inject(Store);

  private dialogSubscription!: Subscription;
  private detailsSubscription!: Subscription;

  Exams: Idetails[] = [];
  subjectid: any;
  loadexam!: number;
  visible = false;

  ngOnInit(): void {
    this.getdatasubmet();

    this.dialogSubscription = this.dialogService.closeDialog$.subscribe(() => {
      this.visible = false;
    });
  }

  getdatasubmet() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const parems = this._activatedRoute.snapshot.params;
      if (parems['id']) {
        this.detailsSubscription = this._SubjectService.details(parems['id']).subscribe({
          next: (res:any) => {
            this.loadexam = res.exams;
            this.Exams = res.exams;
          }
        });
      }
    }
  }

  openexam(examid: string) {
    this.visible = true;
    this._store.dispatch(loadquestion({ examid }));
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }

    if (this.detailsSubscription) {
      this.detailsSubscription.unsubscribe();
    }
  }
}
