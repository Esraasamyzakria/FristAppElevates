import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Iquestionexam } from '../../shared/interface/iquestionexam';
import { Statmentexam } from '../../shared/interface/statmentexam';
import { ResulatComponent } from "../resulat/resulat.component";

@Component({
  selector: 'app-scoreresulat',
  imports: [ResulatComponent],
  templateUrl: './scoreresulat.component.html',
  styleUrl: './scoreresulat.component.scss'
})
export class ScoreresulatComponent implements OnInit {

  _store=inject(Store);
    questions: Iquestionexam[] = [];
  userAnswers: Statmentexam[] = [];
  totalQuestions = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  scorePercentage = 0;
  showresulat=false;

    get correctPercentage(): number {
    return this.totalQuestions > 0
      ? (this.correctAnswers / this.totalQuestions) * 100
      : 0;
  }

  // حساب نسبة الإجابات الخاطئة
  get wrongPercentage(): number {
    return this.totalQuestions > 0
      ? (this.wrongAnswers / this.totalQuestions) * 100
      : 0;
  }
   get hasWrongAnswers(): boolean {
    return this.wrongAnswers > 0;
  }

   ngOnInit(): void {
    this.getResultsFromStore();
  }

  private getResultsFromStore(): void {
    this._store.select("questionexam").subscribe({
      next: (res) => {
        this.questions = res.questions || [];
        this.userAnswers = res.userAnswers || [];
        this.totalQuestions = this.questions.length;

        this.calculateResults();
      },
      error: (err) => {
        console.error('Error loading results from store:', err);
      }
    });
  }

  private calculateResults(): void {
    this.correctAnswers = 0;
    this.wrongAnswers = 0;

    for (const question of this.questions) {
      const userAnswer = this.userAnswers.find(a => a.questionId === question._id);

      if (userAnswer) {
        if (userAnswer.key === question.correct) {
          this.correctAnswers++;
        } else {
          this.wrongAnswers++;
        }
      } else {
        // إذا لم يتم الإجابة على السؤال
        this.wrongAnswers++;
      }
    }

    // حساب النسبة المئوية
    this.scorePercentage = this.totalQuestions > 0
      ? Math.round((this.correctAnswers / this.totalQuestions) * 100)
      : 0;
  }

  backToInstructions(): void {
    // إعادة تحميل الصفحة كحل مؤقت
    window.location.reload();
  }
getpageresulat():void

{
  this.showresulat=true
}
}
