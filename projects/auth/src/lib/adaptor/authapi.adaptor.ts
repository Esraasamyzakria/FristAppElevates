import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';

@Injectable({
  providedIn: 'root'
})
export class AuthapiAdaptorService implements Adaptor  {

  constructor() { }

  adapt(data:any){
    return{
      message:data.message,
      token:data.token,
      email:data.user.email
    }
  }
}
