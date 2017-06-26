import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContestComponent } from './index';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'contest',
        canActivate: [AuthGuardService],
        component: ContestComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class ContestRoutingModule { }


// export const ContestRoutes: Routes = [
//   {
//     path: 'contest',
//     canActivate: [AuthGuardService],
//     component: ContestComponent
//   }
// ]

