import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'owner', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
