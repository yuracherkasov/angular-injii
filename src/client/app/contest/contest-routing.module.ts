import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContestComponent } from './index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'contest', component: ContestComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ContestRoutingModule { }
