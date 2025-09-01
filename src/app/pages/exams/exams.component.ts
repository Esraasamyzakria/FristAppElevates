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
import { ResulatComponent } from "../resulat/resulat.component";

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

  get formattedTime(): string {
    return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }
  get allQuestionsAnswered(): boolean {
    return this.userAnswers.length >= this.totalQuestions;
  }
  isCurrentQuestionAnswered(): boolean {
  return !!this.selectedAnswer;
}
  getallquestion() {
    this._store.select("questionexam").subscribe({
      next: (res) => {
        this.questions = res.questions || [];
        this.userAnswers = res.userAnswers || [];
        this.totalQuestions = this.questions.length;
        if (this.questions.length > 0 && this.questions[0].exam) {
          this.duration = this.questions[0].exam.duration;
          if (!this.examStarted) {
            this.startTimer();
            this.examStarted = true;
          }
        }

        if (this.questions.length > 0) {
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          const previousAnswer = this.userAnswers.find((a: any) => a.questionId === this.currentQuestion?._id);
          this.selectedAnswer = previousAnswer ? previousAnswer.key : '';
        }

      },
      error: (err) => {
        console.error('Error loading questions:', err);
      }
    });
  }

  startTimer() {
        this.totalSecondsRemaining = this.duration * 60;

    this.updateDisplayTime();

    this.timer = setInterval(() => {
      if (this.totalSecondsRemaining > 0) {
        this.totalSecondsRemaining--;
        this.updateDisplayTime();
      } else {
        // انتهاء الوقت
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
    this.selectedAnswer = answerKey;
    this.submitAnswer();
  }

  submitAnswer(): void {
    if (this.currentQuestion && this.selectedAnswer) {
      this._store.dispatch(submitanswer({
        questionid: this.currentQuestion._id,
        keyanswer: this.selectedAnswer
      }));
    }
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      const previousAnswer = this.userAnswers.find((a: any) => a.questionId === this.currentQuestion?._id);
      this.selectedAnswer = previousAnswer ? previousAnswer.key : '';
    } else {
      // التحقق إذا تمت الإجابة على جميع الأسئلة قبل إنهاء الامتحان
      if (this.allQuestionsAnswered) {
        this.finishExam();
      } else {
        // عرض تحذير للمستخدم
        alert('All questions must be answered before completing the exam');

        // البحث عن أول سؤال لم تتم الإجابة عليه والانتقال إليه
        const unansweredQuestionIndex = this.findFirstUnansweredQuestion();
        if (unansweredQuestionIndex !== -1) {
          this.currentQuestionIndex = unansweredQuestionIndex;
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          this.selectedAnswer = '';
        }
      }
    }
  }
    findFirstUnansweredQuestion(): number {
    for (let i = 0; i < this.questions.length; i++) {
      const questionId = this.questions[i]._id;
      const isAnswered = this.userAnswers.some(answer => answer.questionId === questionId);

      if (!isAnswered) {
        return i;
      }
    }
    return -1; // جميع الأسئلة تمت الإجابة عليها
  }
  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      const previousAnswer = this.userAnswers.find((a: any) => a.questionId === this.currentQuestion?._id);
      this.selectedAnswer = previousAnswer ? previousAnswer.key : '';
    }
  }

  finishExam(): void {
    // إيقاف المؤقت
    clearInterval(this.timer);

    // حساب النتائج

    // تغيير حالة الامتحان إلى منتهي
    this.examFinished = true;
  }


  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startExam(){
    this.showInstructions = false;
  }

  getQuestionDotClass(index: number): string {
    if (index === this.currentQuestionIndex) {
      return 'bg-[#4461F2] text-white border-2 border-[#4461F2] shadow-md'; // السؤال الحالي
    }

    // التحقق إذا كان السؤال تمت الإجابة عليه
    const questionId = this.questions[index]?._id;
    const isAnswered = this.userAnswers.some(answer => answer.questionId === questionId);

    if (isAnswered) {
      return 'bg-[#4461F2] text-white'; // سؤال تمت الإجابة عليه
    }

    return 'bg-[#D9D9D9] border border-gray-400'; // سؤال لم تتم الإجابة عليه
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.submitAnswer(); // حفظ الإجابة الحالية قبل الانتقال
      this.currentQuestionIndex = index;
      this.currentQuestion = this.questions[this.currentQuestionIndex];

      // استعادة الإجابة إذا كانت موجودة
      const previousAnswer = this.userAnswers.find((a: any) => a.questionId === this.currentQuestion?._id);
      this.selectedAnswer = previousAnswer ? previousAnswer.key : '';
    }
  }

}
