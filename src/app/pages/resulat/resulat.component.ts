import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Statmentexam } from '../../shared/interface/statmentexam';
import { Iquestionexam } from '../../shared/interface/iquestionexam';
import { DialogService } from '../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-resulat',
  imports: [],
  templateUrl: './resulat.component.html',
  styleUrl: './resulat.component.scss'
})
export class ResulatComponent {
   private store = inject(Store);
 private dialogService = inject(DialogService)
  questions: Iquestionexam[] = [];
  userAnswers: Statmentexam[] = [];
  wrongAnswers: any[] = [];

  constructor() {
    this.loadResults();
  }

  private loadResults(): void {
    this.store.select("questionexam").subscribe({
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
}
