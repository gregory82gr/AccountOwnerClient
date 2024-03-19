import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { DatePipe } from '@angular/common';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AccountModule } from './account/account.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guards/auth.guard';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccountModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [DatePipe,BsModalService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
