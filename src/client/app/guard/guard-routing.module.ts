import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuardComponent } from './guard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'guard', component: GuardComponent }
    ])
  ],
  exports: [RouterModule]
})
export class GuardRoutingModule { }

