import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,MatSidenavModule, RouterLink, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  searchTxt: string = '';
  

  constructor(private loginSrv: AuthService) { }

  onFilter() {
    // this.loginSrv.searchBox.next(this.searchTxt);
  }

  onInput(event: any) {
    if (event.target.value.trim() === '') {
      this.onFilter();
    }
  }
  ngOnDestroy() {
    // Completa la suscripción aquí para evitar fugas de memoria
  }
}
