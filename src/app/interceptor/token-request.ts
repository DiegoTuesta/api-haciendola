import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export  const AuthInterceptor:HttpInterceptorFn = (
    request :HttpRequest<any>,
    next:HttpHandlerFn,
) : Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService)
    const tokenLocal =  authService.getToken();
    
    if (tokenLocal) {
        request = request.clone({
            setHeaders:{
              Authorization: `Bearer ${tokenLocal}` 
            }
        })
    }
    // console.log(request)
    return next(request)
}