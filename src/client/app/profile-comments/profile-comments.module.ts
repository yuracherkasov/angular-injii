import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileCommentsComponent } from './comments.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ProfileCommentsComponent],
  exports: [FormsModule, ProfileCommentsComponent],
  providers: []
})

export class ProfileCommentsModule { }