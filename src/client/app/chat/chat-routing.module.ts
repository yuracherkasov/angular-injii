import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'chat',
        canActivate: [AuthGuardService],
        component: ChatComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class ChatRoutingModule { }

// export const ChatRoutes: Routes = [
//   {
//     path: 'chat',
//     canActivate: [AuthGuardService],
//     component: ChatComponent
//   }
// ]

