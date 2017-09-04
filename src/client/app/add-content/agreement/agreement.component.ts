import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleBarService } from '../select-video/schedule/schedule-bar.service';
import { AgreementService } from './agreement.service';


@Component({
  moduleId: module.id,
  selector: 'agreement',
  templateUrl: 'agreement.component.html',
  styleUrls: ['agreement.component.css']
})

export class AgreementComponent {

  agree: boolean = false;

  constructor
    (
      public scheduleBarService: ScheduleBarService,
      private route: ActivatedRoute,
      private router: Router,
      private agreementService: AgreementService
    ) { }

  Submit() {
    this.agreementService.confirmAccepted(this.agree);
    this.goBack();
  }

  goBack(event?: Event): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

 }
