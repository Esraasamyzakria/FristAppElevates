import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../core/services/subject/subject.service';
import { Isubsubjectexam } from '../../shared/interface/isubsubjectexam';
import { log } from 'node:console';


@Component({
  selector: 'app-subjectexamsub',
  imports: [],
  templateUrl: './subjectexamsub.component.html',
  styleUrl: './subjectexamsub.component.scss'
})
export class SubjectexamsubComponent implements OnInit {
  private readonly _activatedRoute=inject(ActivatedRoute);
  private readonly _SubjectService=inject(SubjectService);
  subsubjectexam:Isubsubjectexam={}as Isubsubjectexam;
  subjectid:any;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.subjectid=res.get("id");
        this._SubjectService.subsubjectexam(this.subjectid).subscribe({
          next:(res)=>{
            this.subsubjectexam=res.exams[0]
            console.log(this.subsubjectexam)
          },
          error:(err)=>{
            console.log(err);

          }
        })
      }
    })

  }

}
