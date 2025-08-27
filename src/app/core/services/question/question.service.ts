import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from 'auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

 _HttpClient=inject(HttpClient);
 _bASE_URL=inject(BASE_URL);




 getallquestion(id:string):Observable<any>{
  return this._HttpClient.get(this._bASE_URL+`/api/v1/questions?exam=${id}`)
 }
}
