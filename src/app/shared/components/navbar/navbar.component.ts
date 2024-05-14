import { Component, OnInit, EventEmitter, Output, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  

  @Output() public sideNavToggle = new EventEmitter() 
  constructor(private authService:AuthService){}

  ngOnInit(): void {
      
  }

  onToggleSideMav(){
    this.sideNavToggle.emit();
  }

  cerrarSesion(){
    this.authService.cerrarSesion()
  }

}
