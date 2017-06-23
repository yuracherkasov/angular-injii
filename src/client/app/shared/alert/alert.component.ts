import { Component, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  moduleId: module.id,
  selector: 'sd-alert',
  templateUrl: 'alert.component.html',
  animations: [
    trigger('alertAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-30%)'
      })),
      state('void', style({
        opacity: 1,
       transform: 'translateY(0%)'
      })),
      transition('void => active', animate('300ms ease-out'))
    ]
    )
  ],
  styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
  close() {
    this.alertService.clear();
  }
}
