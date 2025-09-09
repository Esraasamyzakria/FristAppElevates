import { Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Statmentexam } from '../../shared/interface/statmentexam';
import { Iquestionexam } from '../../shared/interface/iquestionexam';
import { DialogService } from '../../core/services/dialog/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resulat',
  imports: [],
  templateUrl: './resulat.component.html',
  styleUrl: './resulat.component.scss'
})
export class ResulatComponent implements OnDestroy {
  private store = inject(Store);
  private dialogService = inject(DialogService);

  private storeSub!: Subscription; // نخزن الاشتراك هنا

  questions: Iquestionexam[] = [];
  userAnswers: Statmentexam[] = [];
  wrongAnswers: any[] = [];

  constructor() {
    this.loadResults();
  }

  private loadResults(): void {
    this.storeSub = this.store.select("questionexam").subscribe({
      next: (res: any) => {
        this.questions = res.questions || [];
        this.userAnswers = res.userAnswers || [];
        this.filterWrongAnswers();
      },
      error: (err) => {
        console.error('Error loading results:', err);
      }
    });
  }

  private filterWrongAnswers(): void {
    this.wrongAnswers = [];

    for (const question of this.questions) {
      const userAnswer = this.userAnswers.find(a => a.questionId === question._id);

      if (userAnswer && userAnswer.key !== question.correct) {
        this.wrongAnswers.push({
          question: question.question,
          userAnswer: userAnswer.answer,
          correctAnswer: question.answers.find(a => a.key === question.correct)?.answer || '',
          answers: question.answers
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogService.closeDialog();
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
