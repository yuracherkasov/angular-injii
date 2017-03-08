import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddContentComponent } from './add-content.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'profile',
        component: AddContentComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AddContentRoutingModule { }
