import { Observable } from "rxjs";
import { information } from "../interface/information";

export abstract class AuthApi{
  abstract login(data:any):Observable<any>;
  abstract register(data:any):Observable<any>;
  abstract vrefyemail(data:any):Observable<any>;
  abstract vrefycode(data:any):Observable<any>;
  abstract vrefypasswored(data:any):Observable<any>;
}
