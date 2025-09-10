import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubjectService } from '../../core/services/subject/subject.service';
import { ISubject } from '../../shared/interface/isubject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject',
  imports: [RouterLink],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit, OnDestroy {

  private subjectSub!: Subscription;
  _SubjectService = inject(SubjectService);
  subjectdata: ISubject[] = [];

  ngOnInit(): void {
    this.getsubject();
  }

  ngOnDestroy(): void {
    if (this.subjectSub) {
      this.subjectSub.unsubscribe();
    }
  }

  getsubject(): void {
    this.subjectSub = this._SubjectService.subject().subscribe({
      next: (res:any) => {
        this.subjectdata = res.subjects;
      }
    });
  }
}
