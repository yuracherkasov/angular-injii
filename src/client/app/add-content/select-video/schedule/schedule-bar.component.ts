import { Component, Input, OnInit } from '@angular/core';

//import { ScheduleBarService } from './schedule-bar.service';

@Component({
  moduleId: module.id,
  selector: 'schedule-bar',
  templateUrl: 'schedule-bar.component.html',
  styleUrls: ['schedule-bar.component.css'],
})

export class ScheduleBarComponent implements OnInit {

  @Input() data: any;

  constructor(
    //private scheduleBarService: ScheduleBarService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }


}
