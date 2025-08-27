import { Observable } from "rxjs";
import { information } from "../interface/information";
import { Verfycode } from "../interface/verfycode";
import { Logout } from "../interface/logout";
import { Verfyemail } from "../interface/verfyemail";
import { Verfypassword } from "../interface/verfypassword";

export abstract class AuthApi{
  abstract login(data:information):Observable<information>;
  abstract register(data:information):Observable<information>;
  abstract vrefyemail(data:Verfyemail):Observable<Verfyemail>;
  abstract vrefycode(data:Verfycode):Observable<Verfycode>;
  abstract vrefypasswored(data:Verfypassword):Observable<Verfypassword>;
  abstract logout():Observable<Logout>
}
