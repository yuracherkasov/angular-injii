import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'content', component: ContentComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
