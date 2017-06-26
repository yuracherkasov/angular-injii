import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppriseComponent } from './apprise.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'apprise',
        canActivate: [AuthGuardService],
        component: AppriseComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppriseRoutingModule { }

// export const AppriseRoutes: Routes = [
//   {
//     path: 'apprise',
//     canActivate: [AuthGuardService],
//     component: AppriseComponent
//   }
// ]

