import { NgModule } from '@angular/core';
import { GuardComponent } from './guard.component';
import { GuardRoutingModule } from './guard-routing.module';

@NgModule({
  imports: [GuardRoutingModule],
  declarations: [GuardComponent],
  exports: [GuardComponent],
  providers: []
})
export class GuardModule { }
