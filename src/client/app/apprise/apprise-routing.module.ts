import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppriseComponent } from './apprise.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'apprise', component: AppriseComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppriseRoutingModule { }
