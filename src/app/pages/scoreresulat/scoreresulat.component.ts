import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Iquestionexam } from '../../shared/interface/iquestionexam';
import { Statmentexam } from '../../shared/interface/statmentexam';
import { ResulatComponent } from "../resulat/resulat.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scoreresulat',
  imports: [ResulatComponent],
  templateUrl: './scoreresulat.component.html',
  styleUrl: './scoreresulat.component.scss'
})
export class ScoreresulatComponent implements OnInit, OnDestroy {
  private storeSub!: Subscription; // نخزن الاشتراك هنا

  _store = inject(Store);
  questions: Iquestionexam[] = [];
  userAnswers: Statmentexam[] = [];
  totalQuestions = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  scorePercentage = 0;
  showresulat = false;

  get correctPercentage(): number {
    return this.totalQuestions > 0
      ? (this.correctAnswers / this.totalQuestions) * 100
      : 0;
  }

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

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private getResultsFromStore(): void {
    this.storeSub = this._store.select("questionexam").subscribe({
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
        this.wrongAnswers++;
      }
    }

    this.scorePercentage = this.totalQuestions > 0
      ? Math.round((this.correctAnswers / this.totalQuestions) * 100)
      : 0;
  }

  backToInstructions(): void {
    window.location.reload();
  }

  getpageresulat(): void {
    this.showresulat = true;
  }
}
