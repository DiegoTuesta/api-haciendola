import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserLogin, UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatInputModule} from '@angular/material/input'
import { merge } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  

  backgroundImageUrl: string = 'url("assets/img/fondo.jpg")';
  formLogin: FormGroup;

  hide = true;
  

  constructor(
    private router:Router, 
    private authService:AuthService,
    private form:FormBuilder,
    private toast: ToastrService
  ){
    this.formLogin = form.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password :new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(7)])
    })
  }


  onLogin(){
    // console.log("data: ", this.formLogin.value)
    this.authService.login(this.formLogin.value).subscribe({
      next:(data) => {
        if (data.token) {
          localStorage.setItem("tokenSession", data.token)
          localStorage.setItem("nameUserSession", data.username)
          this.router.navigateByUrl("/products")         
        }
      },
      error: (err) => {
        // console.log("error_login ",err)
        if (err.status === 404) {
          this.toast.error("Username y/o password incorrect!")
        }
        
        
      }
    })
  }
  ngOnDestroy() {
    // Completa la suscripción aquí para evitar fugas de memoria
  }

  ngOnInit(): void {

  }

}
