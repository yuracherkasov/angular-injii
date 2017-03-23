import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { ActivityItemComponent } from './item/item.component';
import { ActivityRoutingModule } from './activity-routing.module';


@NgModule({
    imports: [CommonModule, ActivityRoutingModule],
    declarations: [ActivityComponent, ActivityItemComponent],
    exports: [ActivityComponent],
})

export class ActivityModule { }
