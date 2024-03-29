import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public homeText: string;
  constructor(private jwtHelper: JwtHelperService){}

  ngOnInit(): void {
    this.homeText = "WELCOME TO ACCOUNT-OWNER APPLICATION";
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
  }

}
