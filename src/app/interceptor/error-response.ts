import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { catchError, throwError } from "rxjs"
import { AuthService } from "../services/auth.service"

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => 
    next(req).pipe(catchError(handleErrorResponse))


function handleErrorResponse(error : HttpErrorResponse){
    // const route = inject(Router)
    // const authService = inject(AuthService)
    // console.log('My error: ', error)
    if (error.status === 401) {
        // authService.cerrarSesion()
        // route.navigateByUrl()
    }
    return throwError(() =>error)
}