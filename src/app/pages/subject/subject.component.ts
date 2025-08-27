import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubjectService } from '../../core/services/subject/subject.service';
import { ISubject } from '../../shared/interface/isubject';

@Component({
  selector: 'app-subject',
  imports: [RouterLink],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {

_SubjectService=inject(SubjectService);
subjectdata:ISubject[]=[];

ngOnInit(): void {
    this.getsubject()
}

getsubject():void{
  this._SubjectService.subject().subscribe({
    next:(res)=>{
      console.log(res.subjects);
      this.subjectdata=res.subjects
    },
            error:(err)=>{
          console.log(err)
        }
  })

}

}
