import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuardService],
        component: HomeComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

// export const HomeRoutes: Routes = [
//   {
//     path: '',
//     canActivate: [AuthGuardService],
//     component: HomeComponent
//   }
// ]
