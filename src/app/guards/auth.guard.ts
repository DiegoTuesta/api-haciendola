import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // debugger;
  const router = inject(Router)
  const token = localStorage.getItem("tokenSession")
  if (token !==null) {
    return true;
  }else{
    router.navigateByUrl("/login")
    return false
  }
      
};
