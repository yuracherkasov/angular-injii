import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppriseComponent } from './apprise.component';
import { AppriseRoutingModule } from './apprise-routing.module';


@NgModule({
    imports: [CommonModule, FormsModule, AppriseRoutingModule],
    declarations: [AppriseComponent],
    exports: [AppriseComponent],
})

export class AppriseModule { }
