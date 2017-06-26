import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddContentComponent } from './add-content.component';
import { AuthGuardService } from '../services/auth-guard.service';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'add_content',
        canActivate: [AuthGuardService],
        component: AddContentComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AddContentRoutingModule { }

// export const AddContentRoutes: Routes = [
//   {
//     path: 'add_content',
//     canActivate: [AuthGuardService],
//     component: AddContentComponent   
//   }
// ]
