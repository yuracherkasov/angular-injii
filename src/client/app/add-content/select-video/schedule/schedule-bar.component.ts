import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { AgreementService } from '../../agreement/agreement.service';
//import { SelectVideoService  } from '../select-video.service';

import { ScheduleBarService } from './schedule-bar.service';

@Component({
  moduleId: module.id,
  selector: 'schedule-bar',
  templateUrl: 'schedule-bar.component.html',
  styleUrls: ['schedule-bar.component.css'],
})

export class ScheduleBarComponent implements OnInit {

  @Input() response: any;
  table: any;
  //showShedule: boolean = true;
  // loading: boolean = false;
  // message: string = '';

  constructor(
    private scheduleBarService: ScheduleBarService,
    private router: Router,
    private route: ActivatedRoute,
    //private agreementService: AgreementService,
    //private selectVideoService: SelectVideoService
  ) {

    //  this.agreementService.acceptedAgreementObservable
    //   .subscribe((val) => {
    //     if(val) {
    //       this.onConfirmAccepts()
    //     }
    //   }) 

   }

  ngOnInit(): void {
    this.table = [[]];
    let shedule = this.response.shedule;
    for(let i = 0, n=0; i < 60; i+=1){
      if(i % 6 === 0 && i != 0) {
        n++;
        this.table[n] = [];
      }
      this.table[n].push(shedule[i] || null);
    }
    console.log(this.response);
    this.scheduleBarService.setDate(this.response.date);
    this.scheduleBarService.setTimezone(this.response.timezone);
  }

  onSelectedTime(time: any): void {
    this.scheduleBarService.setTime(time.startTime);
    this.router.navigate(['agreement'], { relativeTo: this.route });
  }

  

}
