import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddContentComponent } from './add-content.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'add_content',
        component: AddContentComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AddContentRoutingModule { }
