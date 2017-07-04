import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddContentComponent } from './add-content.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { AddContentGuardService } from './add-content-guard.service';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'add_content',
        canActivate: [AuthGuardService, AddContentGuardService],
        component: AddContentComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AddContentRoutingModule { }

