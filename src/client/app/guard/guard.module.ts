import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuardComponent } from './guard.component';
import { GuardRoutingModule } from './guard-routing.module';

@NgModule({
  imports: [CommonModule, GuardRoutingModule, FormsModule],
  declarations: [GuardComponent],
  exports: [GuardComponent],
  providers: []
})
export class GuardModule { }
