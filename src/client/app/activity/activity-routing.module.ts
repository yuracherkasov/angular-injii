import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'activity',
        canActivate: [AuthGuardService],
        component: ActivityComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }


// export const ActivityRoutes: Routes = [
//   {
//      path: 'activity',
//      canActivate: [AuthGuardService],
//      component: ActivityComponent
//   }
// ]