import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FormsModule }   from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ChatRoutingModule],
  declarations: [ChatComponent],
  exports: [ChatComponent],
})

export class ChatModule {}
