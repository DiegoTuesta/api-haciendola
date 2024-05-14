import { Injectable, inject } from '@angular/core';
import { appConfig } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private token = '';
  private apiUrl = appConfig.hostApi+'/auth';
  // private http = inject(HttpClient)
  constructor(private http:HttpClient) {}

  login(data:{email:string, password:string}){
    // console.log("data2: ",data)
      const url = this.apiUrl+"/login" 
      return this.http.post<UserLogin>(url,{
        username: data.email,
        password:data.password
      })
      // return true;
  }
  
  getToken(){
    const token = localStorage.getItem("tokenSession")
    return token;
  }

  cerrarSesion(){
    localStorage.removeItem("tokenSession")
  }
}
