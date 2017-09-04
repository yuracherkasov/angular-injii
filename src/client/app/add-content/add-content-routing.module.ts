import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddContentComponent } from './add-content.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { AddContentGuardService } from './add-content-guard.service';
import { AgreementComponent } from './agreement/agreement.component';
import { ScheduleBarService } from './select-video/schedule/schedule-bar.service';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'add_content',
        canActivate: [AuthGuardService, AddContentGuardService],
        component: AddContentComponent,
        children: [
          {
            path: ':agreement',
            component: AgreementComponent,
            canActivate: [ ScheduleBarService ]
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AddContentRoutingModule { }

