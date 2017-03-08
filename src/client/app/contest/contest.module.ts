import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestComponent, UpcomingContestComponent, CurrentContestComponent, UpcomingItemComponent } from './index';
import { ContestRoutingModule } from './contest-routing.module';

import { ContestService } from "./contest.service";

@NgModule({
    imports: [CommonModule, ContestRoutingModule],
    declarations: [ContestComponent, CurrentContestComponent, UpcomingContestComponent, UpcomingItemComponent],
    exports: [ContestComponent, CurrentContestComponent, UpcomingContestComponent],
    providers: [ContestService]
})

export class ContestModule { }
