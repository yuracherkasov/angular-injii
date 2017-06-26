import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'search',
        canActivate: [AuthGuardService],
        component: SearchComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  exports: [RouterModule]
})
export class SearchRoutingModule { }

// export const SearchRoutes: Routes = [
//   {
//     path: 'search',
//     canActivate: [AuthGuardService],
//     component: SearchComponent
//   }
// ]
