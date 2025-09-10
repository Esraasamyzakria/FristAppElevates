import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuestionService } from '../../core/services/question/question.service';
import { Iquestionexam } from '../../shared/interface/iquestionexam';
import { Statmentexam } from '../../shared/interface/statmentexam';
import { submitanswer } from '../../store/question.action';
import { Button } from "primeng/button";
import { ScoreresulatComponent } from '../scoreresulat/scoreresulat.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, ScoreresulatComponent],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit, OnDestroy {
  _questionService = inject(QuestionService);
  _store = inject(Store);

  private subscriptions: Subscription[] = []; // نخزن كل الاشتراكات هنا

  questions: Iquestionexam[] = [];
  userAnswers: Statmentexam[] = [];
  currentQuestion: Iquestionexam | null = null;
  currentQuestionIndex = 0;
  selectedAnswer: string = '';
  totalQuestions = 0;
  duration = 0;
  showInstructions = true;
  examFinished = false;

  minutes = 0;
  seconds = 0;
  timer: any;
  totalSecondsRemaining = 0;
  examStarted = false;

  ngOnInit(): void {
    this.getallquestion();
  }

  ngOnDestroy(): void {
    // الغاء الـ timer
    if (this.timer) {
      clearInterval(this.timer);
    }

    // الغاء كل الـ subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  get formattedTime(): string {
    return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }

  get allQuestionsAnswered(): boolean {
    return this.userAnswers.length >= this.totalQuestions &&
           this.userAnswers.every(a => !!a.key);
  }

  isCurrentQuestionAnswered(): boolean {
    return !!this.selectedAnswer;
  }

  getallquestion() {
    const sub = this._store.select("questionexam").subscribe({
      next: (res: any) => {
        this.questions = res.questions || [];
        this.userAnswers = res.userAnswers ? [...res.userAnswers] : [];
        this.totalQuestions = this.questions.length;

        if (this.questions.length > 0 && this.questions[0].exam) {
          this.duration = this.questions[0].exam.duration;
          if (!this.examStarted) {
            this.startTimer();
            this.examStarted = true;
          }
        }

        if (this.currentQuestionIndex >= this.questions.length) {
          this.currentQuestionIndex = Math.max(0, this.questions.length - 1);
        }

        if (this.questions.length > 0) {
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          const prev = this.userAnswers.find(a => a.questionId === this.currentQuestion?._id);
          this.selectedAnswer = prev ? prev.key : '';
        }
      },
      error: (err:any) => console.error('Error loading questions:', err)
    });

    this.subscriptions.push(sub);
  }

  startTimer() {
    this.totalSecondsRemaining = this.duration * 60;
    this.updateDisplayTime();

    this.timer = setInterval(() => {
      if (this.totalSecondsRemaining > 0) {
        this.totalSecondsRemaining--;
        this.updateDisplayTime();
      } else {
        clearInterval(this.timer);
        this.finishExam();
      }
    }, 1000);
  }

  updateDisplayTime() {
    this.minutes = Math.floor(this.totalSecondsRemaining / 60);
    this.seconds = this.totalSecondsRemaining % 60;
  }

  onAnswerSelect(answerKey: string): void {
    if (!this.currentQuestion) return;

    this.selectedAnswer = answerKey;

    this.upsertLocalAnswer({
      questionId: this.currentQuestion._id,
      key: answerKey
    });

    this._store.dispatch(submitanswer({
      questionid: this.currentQuestion._id,
      keyanswer: answerKey
    }));
  }

  private upsertLocalAnswer(ans: { questionId: string, key: string }) {
    const idx = this.userAnswers.findIndex(a => a.questionId === ans.questionId);
    if (idx === -1) {
      this.userAnswers.push(ans as any);
    } else {
      this.userAnswers[idx] = { ...this.userAnswers[idx], key: ans.key } as any;
    }
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      const previousAnswer = this.userAnswers.find(a => a.questionId === this.currentQuestion?._id);
      this.selectedAnswer = previousAnswer ? previousAnswer.key : '';
    } else {
      if (this.allQuestionsAnswered) {
        this.finishExam();
      } else {
        alert('All questions must be answered before completing the exam');
        const unansweredQuestionIndex = this.findFirstUnansweredQuestion();
        if (unansweredQuestionIndex !== -1) {
          this.currentQuestionIndex = unansweredQuestionIndex;
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          const prev = this.userAnswers.find(a => a.questionId === this.currentQuestion?._id);
          this.selectedAnswer = prev ? prev.key : '';
        }
      }
    }
  }

  findFirstUnansweredQuestion(): number {
    for (let i = 0; i < this.questions.length; i++) {
      const qId = this.questions[i]._id;
      const isAnswered = this.userAnswers.some(answer => answer.questionId === qId && !!answer.key);
      if (!isAnswered) return i;
    }
    return -1;
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      const previousAnswer = this.userAnswers.find(a => a.questionId === this.currentQuestion?._id);
      this.selectedAnswer = previousAnswer ? previousAnswer.key : '';
    }
  }

  finishExam(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.examFinished = true;
  }

  startExam() {
    this.showInstructions = false;
  }

  getQuestionDotClass(index: number): string {
    if (index === this.currentQuestionIndex) {
      return 'bg-[#4461F2] text-white border-2 border-[#4461F2] shadow-md';
    }

    const questionId = this.questions[index]?._id;
    const isAnswered = this.userAnswers.some(answer => answer.questionId === questionId && !!answer.key);

    if (isAnswered) {
      return 'bg-[#4461F2] text-white';
    }

    return 'bg-[#D9D9D9] border border-gray-400';
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      if (this.currentQuestion && this.selectedAnswer) {
        this.upsertLocalAnswer({
          questionId: this.currentQuestion._id,
          key: this.selectedAnswer
        });
        this._store.dispatch(submitanswer({
          questionid: this.currentQuestion._id,
          keyanswer: this.selectedAnswer
        }));
      }

      this.currentQuestionIndex = index;
      this.currentQuestion = this.questions[this.currentQuestionIndex];

      const previousAnswer = this.userAnswers.find(a => a.questionId === this.currentQuestion?._id);
      this.selectedAnswer = previousAnswer ? previousAnswer.key : '';
    }
  }
}
