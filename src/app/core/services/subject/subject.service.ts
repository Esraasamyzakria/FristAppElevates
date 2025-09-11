import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {  Observable } from 'rxjs';
import { BASE_URL } from 'auth';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

_HttpClient=inject(HttpClient);
_pLATFORM_ID=inject(PLATFORM_ID);
_bASE_URL=inject(BASE_URL);

subject():Observable<any>{
  return this._HttpClient.get(this._bASE_URL+`/api/v1/subjects`)
}
details(id:string):Observable<any>{

  return this._HttpClient.get(this._bASE_URL+ `/api/v1/exams?subject=${id}`,
  )
}
}
