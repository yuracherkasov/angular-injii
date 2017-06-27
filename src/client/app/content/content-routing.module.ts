import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './index';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'content',
        canActivate: [AuthGuardService],
        component: ContentComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }


