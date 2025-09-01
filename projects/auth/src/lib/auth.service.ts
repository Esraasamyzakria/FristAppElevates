import { inject, Injectable } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthEndPoint';
import { AuthapiAdaptorService } from './adaptor/authapi.adaptor';
import { information } from './interface/information';
import { Verfycode } from './interface/verfycode';
import { BASE_URL } from './base-url';
import { Logout } from './interface/logout';
import { Verfyemail } from './interface/verfyemail';
import { Verfypassword } from './interface/verfypassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthApi {
  _httpClient=inject(HttpClient);
  _bASEURL=inject(BASE_URL)
  _authapiAdaptorService=inject(AuthapiAdaptorService);

 login(data: information): Observable<information> {
  return this._httpClient.post(this._bASEURL+ AuthEndPoint.LOGIN,data)
  .pipe(map(res => this._authapiAdaptorService.adapt(res)),
catchError(err => of(err)))

  }

 register(data:information): Observable<information> {
  return this._httpClient.post(this._bASEURL+ AuthEndPoint.SIGNUP,data).pipe(
    map(res =>this._authapiAdaptorService.adapt(res),
),catchError(err => of(err))
  )

}
 vrefyemail(data: Verfyemail): Observable<Verfyemail> {
    return this._httpClient.post(this._bASEURL+ AuthEndPoint.FORGOTPASSWORD,data).pipe(
      map(res =>res as Verfyemail
      ),  catchError(err => of(err))
    )
}
 vrefycode(data: Verfycode): Observable<Verfycode> {
    return this._httpClient.post(this._bASEURL+ AuthEndPoint.VERIFY,data).pipe(
      map(res =>res as Verfycode
      ),  catchError(err => of(err))
    )
}
vrefypasswored(data: Verfypassword): Observable<any> {
  return this._httpClient.put(this._bASEURL + AuthEndPoint.RESETPASSWORD, data).pipe(
    map((res: any) => res),
    catchError(err => {
      console.error("Reset password error:", err);
      return throwError(() => err); // ✅ error هيتبعت للـ subscribe.error
    })
  );
}
logout():Observable<Logout>{
  return this._httpClient.get<Logout>(this._bASEURL + AuthEndPoint.LOGOUT).pipe(
    map(res => res as Logout),
    catchError(err =>of(err))
  )
}

}
