import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {  Observable } from 'rxjs';
import{isPlatformBrowser}from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

_HttpClient=inject(HttpClient);
_pLATFORM_ID=inject(PLATFORM_ID);

subject():Observable<any>{
  return this._HttpClient.get("https://exam.elevateegy.com/api/v1/subjects"
  )
}
subsubjectexam(id:string):Observable<any>{
  return this._HttpClient.get( `https://exam.elevateegy.com/api/v1/exams?subject=${id}`,
    // {
    //   headers:{
    //     token:localStorage.getItem("token")!
    //   }
    // }
  )
}
}
